(function (window, document, $, Entity_Set, undefined) {
    'use strict';

    function error_handler (error) {
        if (typeof error === 'object') {
            console.log(error);
            alert(error.message);
        } else if (typeof error === 'string') {
            alert(error);
        } else {
            console.log('error: ', error);
        }
    }

    /**********************************
        Help overlay - all data, elements, and methods for help
    **********************************/

    var help = {

        $: {
            container:  $('#help-overlay'),
            titles:     $('#help-overlay .popover-title'),
            toggle_btn: $('.open-help-btn, .close-help-btn'),
        },
        init: function () {
            // attach event handlers
            this.$.toggle_btn.on('click', help.handlers['click toggle_btn']);
            this.$.titles    .on('click', help.handlers['click title']);
        },
        handlers: {
            'click toggle_btn': function (e) {
                // show/hide help section
                help.$.container.fadeToggle();
            },
            'click title': function (e) {
                // adding 'open' class sets z-index: 1000 on help bubble
                $(this).parent().toggleClass('open').end().next().slideToggle();
            }
        }
    };

    /***************************************************************************
        hops away - all data, elements, and methods for hops away
    ***************************************************************************/

    var hops = {

        bidirectional: true,
        show_all: false,
        $: {
            hops_btns: $('.hops-btn'),
            setting_btns: $('.bidirectional-btn, .show-all-btn')
        },
        init: function () {
            // attach event handlers
            this.$.hops_btns   .on('click', hops.handlers["click hops_btn"]);
            this.$.setting_btns.on('click', hops.handlers["click settings_btn"]);
        },
        handlers: {
            // change hops away setting
            "click hops_btn": function (e) {
                hops.$.hops_btns.removeClass('selected');
                $(this).addClass('selected');
                hops.selected = $(this).data('hops');
                localStorage.setItem('hops_away', hops.selected);
                graph.refresh();
            },
            "click settings_btn": function (e) {
                var elem = $(this);
                hops[elem.data('setting')] = elem.toggleClass('btn-warning').hasClass('btn-warning');
                graph.refresh();
            }
        }
    };

    /***************************************************************************
        search - all data, elements, and methods for search
    ***************************************************************************/
    var search = {

        init: function () {
            //attach event handlers
            this.$.input.on('keyup', search.handlers["keyup input"]);
            this.$.reset.on('click', search.handlers["click reset-btn"]);
        },
        $: {
            input: $('#search-field'),
            reset: $('.reset-graph-btn, .clear-search-field-btn')
        },
        handlers: {
            "keyup input": function (e) {
                graph.search(search.$.input.val());
            },
            "click reset-btn": function (e) {
                search.$.input.val('');
                graph.reset();
            }
        }
    };
    
    /**********************************
        graph  - all data, elements, and methods for graph
    **********************************/

    var graph = {

        es: null,         // instance of Entity_Set
        doc_uri_base: '', // uri base for links to api documentation
        selected: [],     // array of names for selected entities
        $: {
            container: null,
            entities: null
        },
        init: function (data, elem) {
            this.es = new Entity_Set(data.paths);
            this.doc_uri_base = data.swaggerUriBase;
            this.$.container = $(elem);

            this.render(); // render graph

            // attach event handlers
            this.$.entities = $('.entity').on('click', graph.handlers['click entity']);
            $('[data-toggle="popover"]').popover();
            $('.domain-title').on('click', this.handlers['click domain']);
            $('.description').on('click', this.handlers['click description']);
        },
        // create the entity's link to API docs
        get_doc_link: function (entity) {
            var linkBase = this.doc_uri_base + entity.domain,
                path     = entity.path.replace(/{|}/g, '').replace(/(?!^)\//g, '_');
            return linkBase + path + '_get';
        },
        // return the HTML for a domain in the DOM
        domain_html: function (name) {
            return [
            '<div class="domain open">',
              '<h2 class="domain-title">' + name + '</h2>',
              '<div class="entities"></div>',
            '</div>'
            ].join('');
        },
        // return the HTML for an entity in the DOM
        entity_html: function (entity) {
            return [
            '<div class="entity" data-name="' + entity.name + '">', 
                '<h3 class="entity-title">' + entity.name + '</h3>',
                '<div class="glyphs">',
                    '<span class="glyphicon glyphicon-info-sign description" ',
                           'data-container="body" data-toggle="popover" data-placement="bottom" ',
                           'data-content="' + entity.description + '" title=" ">',
                    '</span>',
                    '<a class="api-link" href="' + this.get_doc_link(entity) + '">',
                        '<span class="glyphicon glyphicon-retweet" title="',
                               entity.name + ' documentation" aria-hidden="true">',
                        '</span>',
                    '</a>',
                '</div>',
                '<div class="hop-trail"></div>',
            '</div>'
            ].join('');
        },
        // return the HTML for an entity's previous hops
        hop_trail_html: function (data, name) {
            return '<span>' + data[name].trail.join('<br>') + '</span>';
        },
        // create the DOM elements for the graph, categorize entities by domain
        render: function () {
            var self = this;
            this.es.by_domain().filter(function (domain) {
                if (domain.name === 'UnSuported') { return false; }
                return true;
            })
            .forEach(function (domain, i) {
                var ent_wrap = self.$.container.append(self.domain_html(domain.name)).children().eq(i).find('.entities');
                domain.entities.forEach(function (ent) {
                    ent_wrap.append(self.entity_html(ent));
                });
            });
        },
        // add or remove a selected entity
        update_selected: function (name) {
            var index = this.selected.indexOf(name);
            if (index < 0) { this.selected.push(name); }
            else { this.selected.splice(index, 1); }
            localStorage.setItem('selected_entities', JSON.stringify(this.selected));
            this.refresh();
        },
        // set selected entities to entities param
        set_selected: function (entities) {
            this.selected = entities;
            localStorage.setItem('selected_entities', JSON.stringify(this.selected));
            this.refresh();
        },
        // reset graph and re-draw hops data for selected entities
        refresh: function () {
            this.reset();
            if (this.selected.length > 0) {
                this.$.entities.filter(function (i, elem) {
                    return graph.selected.indexOf($(elem).data('name')) >= 0;
                }).addClass('selected');
                this.show_hops();
            }
        },
        // filter visible entities to match subset
        // if in edit mode or no subset selected, show all entities
        filter_subset: function () {
            var show = [[],[]];
            $('.entity').each(function (i, elem) {
                show[sets.show_entity($(elem).data('name')) ? 0 : 1].push(elem);
            });
            this.$.entities = $(show[0]);
            $(show[1]).addClass('noshow');
            this.set_selected([]);
        },
        // remove classes, so no entity is selected, remove hop-trail text
        reset: function () {
            this.$.entities.removeClass('selected hops-1 hops-2 hops-3 noshow').find('.hop-trail').html('');
        },
        // configure graph to reflect "hops away" from selected entity for all entites not selected
        show_hops: function () {
            //hops_data is an object where keys are entity names of related entities
            var hop_data = this.es.hops_data(this.selected, hops.selected, hops.bidirectional),
                found, elem, name;

            // run the function for all non-selected graph.$.entities
            this.$.entities.not('.selected').each(function (i, element) {
                found = false;  // default is false -> entity's name hasn't been found in hop_data
                elem = $(element);
                name = elem.data('name');

                // if hop_data has a key that matches the entity's name
                if (hop_data.hasOwnProperty(name)) {
                    found = true;
                    elem.addClass("hops-" + hop_data[name].hops);
                    elem.children().eq(2).append(graph.hop_trail_html(hop_data, name));
                }
                // hide entity if name not found in hop_data
                if (!hops.show_all && !found) { elem.addClass('noshow'); }
            });
        },
        // reset graph and filter entities to show only those whose name's contain text in the search field
        search: function (search_term) {
            this.reset();
            search_term = search_term.toLowerCase();
            this.$.entities.each(function (i, elem) {
                elem = $(elem);
                if (elem.data('name').toLowerCase().indexOf(search_term) < 0) {
                    elem.addClass('noshow');
                }
            });
        },
        handlers: {
            'click entity': function (e) {
                // if entity is clicked, but not on an icon
                if (e.target.tagName !== 'SPAN') {
                    var ent = $(this);
                    // if editing a subset
                    if (sets.edit_mode) {
                        sets.update(ent.data('name'));
                        ent.toggleClass('selected');
                    // normal functionality, not in edit mode
                    } else {
                        graph.update_selected(ent.data('name'));
                    }
                }
            },
            'click domain': function (e) {
                // hide/show domain
                $(this).parent().toggleClass('open');
            },
            'click description': function (e) {
                // toggle selected class on icons' container, so it doesn't close when description is open
                $(this).parent().toggleClass('open');
            } 
        }
    };

    /***************************************************************************
        sets - all data, elements, and methods for sets
    ***************************************************************************/
    var sets = {

        data: null,       // array of subset objects
        selected: -1,     // index of selected subset in data, -1 -> no subset selected
        edit_mode: false, //if currently selected subset is in edit mode
        $: {
            container: $('#subset-settings'),
            select: $('#subset-settings select'),
            list: $('#subset-list'), //list of subsets in modal
            edit: $('.edit-subset-btn'),
            share: $('.share-subset-btn')
        },
        init: function (data) {
            this.assign(data);

            // attach event listeners
            this.$.select     .on('change', this.handlers["change select"]);
            this.$.list       .on('click',  this.handlers["click list"]);
            this.$.edit       .on('click',  this.handlers["click edit"]);
            $('#add-set-form').on('submit', this.handlers["submit add-set-form"]);

            //init jquery-ui sortable plugin and attach event handler to update
            this.$.list.sortable({update: this.handlers["update sort"]});

        },
        // add a new set
        add: function (set) {
            sets.data.unshift(set);
            sets.render();
            //FIX: make API call to add set
        },
        // remove a set
        remove: function (index) {
            sets.data.splice(index, 1);
            sets.render();
            //FIX: make API call to remove set
        },
        // assign sets.data
        assign: function (data) {
            sets.data = data;
            sets.render();
        },
        // update a set, add or remove an entity name
        update: function (name) {
            var entities = sets.data[sets.selected].entities,
                index = entities.indexOf(name);
            if (index < 0) { entities.push(name); }
            else { entities.splice(index, 1); }
            //FIX: make api call to update set
        },
        // (re-)render DOM to reflect sets.data
        render: (function () {
            // return HTML for select option
            function option (name, i) {
                return '<option value="' + i + '">' + name + '</option';
            }
            // return HTML for list item in sets manager modal
            function li (name, i) {
                return '<li id="set-' + i + '">' + name + '<span title="remove" class="remove-icon glyphicon glyphicon-minus"></span></li>';
            }
            return function () {
                // remove set options and list items
                sets.$.select.children('option').not(':first').remove();
                sets.$.list.empty();

                // create set options and list items
                sets.data.forEach(function (set, i) {
                    sets.$.select.append( option(set.name, i) );
                    sets.$.list  .append( li    (set.name, i) );
                });
            };
        }()),
        /**
         * reorder_sets
         * order param is an array of strings in the format of 'set-n',
         * where n is the previous position of the set and it's index in the array is the new position
         * create a new array of sets by moving each set to it's new position
         */
        reorder: function (order) {
            var result = [];
            order.forEach(function (last) {
                last = parseInt(last.substring(4),10);
                result.push(sets.data[last]);
            });
            sets.assign(result);
        },
        in_subset: function (name) {
            return sets.data[sets.selected].entities.indexOf(name) >= 0;
        },
        // return whether or not the name is contained in the subset
        // if no subset selected, return true
        show_entity: function (name) {
            return sets.edit_mode || sets.selected < 0 || this.in_subset(name);
        },
        handlers: {
            // select a subset or select all entities
            "change select": function (e) {
                var val =  $(e.currentTarget).find(':selected').val();
                sets.selected = parseInt(val, 10);
                localStorage.setItem('selected_subset', val);
                sets.$.container.toggleClass('subset-selected', sets.selected >= 0);
                graph.filter_subset();
            },
            // change subset order in subset manager
            "update sort": function () {
                sets.reorder($(this).sortable('toArray'));
            },
            // submit 'add set' form in subset manager
            "submit add-set-form": function (e) {
                e.preventDefault();
                var input = $('#add-set-text'),
                    start = $(this).find('input:radio:checked').val(),
                    entities = [];
                if (input.val()) {
                    if (start === 'selected') {
                        entities = graph.selected;
                    } else if (start === 'all') {
                        entities = graph.$.entities.filter('.selected, .hops-1, .hops-2, .hops-3')
                            .map( function (i, elem) { return $(elem).data('name'); }).get();
                    }
                    sets.add({name: input.val(), entities: entities });
                }
                input.val('');
            },
            // check for click on the remove button
            "click list": function (e) {
                var target = $(e.target);
                if (target.hasClass('remove-icon')) {
                    sets.remove(target.parent().index());
                }
            },
            // click edit button next to set selection
            "click edit": function (e) {
                sets.edit_mode = !sets.edit_mode;
                $('button:not(.edit-subset-btn)').prop('disabled', sets.edit_mode);
                sets.$.select.toggleClass('disabled', sets.edit_mode);
                search.$.input.toggleClass('disabled', sets.edit_mode);
                sets.$.edit.toggleClass('btn-default btn-danger');
                graph.filter_subset();
                if (sets.edit_mode) {
                    graph.$.entities.filter(function(i, elem){
                        return sets.in_subset($(elem).data('name'));
                    }).addClass('selected');
                }
                
            }
        }
    };


    /**********************************
        Init
    **********************************/

    function init(graph_data, sets_data) {

        help.init();
        search.init();
        graph.init(graph_data[0], $('#graph'));
        hops.init();
        sets.init(sets_data[0].sets);

        //recall graph state
        hops.selected = localStorage.getItem('hops_away') || 1;
        hops.$.hops_btns.eq(hops.selected - 1).addClass('selected');

        var selected_index = parseInt(localStorage.getItem('selected_subset'), 10);
        if (selected_index >= 0) { sets.$.select.val(selected_index).change(); }

        var selected_entities = localStorage.getItem('selected_entities');
        graph.set_selected(selected_entities ? JSON.parse(selected_entities) : []);
    }

    /***************************************************************************
        AJAX requests
    ***************************************************************************/


    /**
     * When graph and subset data have been fetched, render graph and recall saved state.
     */
    $.when($.ajax({url: '/secured/mind-map/assets/links-new-format.json'}),
           $.ajax({url: '/secured/mind-map/assets/sets-by-name.json'}))
    .done(function (graph_data, sets_data) {
        init(graph_data, sets_data);
    })
    .fail(function() {
        error_handler('unable to download graph data');
    });

}(window, document, jQuery, Entity_Set));
