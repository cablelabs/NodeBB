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
        init: function () {
            // attach event handlers
            this.$.toggle_btn.on('click', help.handlers['click toggle_btn']);
            this.$.titles    .on('click', help.handlers['click title']);
        },
        $: {
            container:  $('#help-overlay'),
            titles:     $('#help-overlay .popover-title'),
            toggle_btn: $('#entity-map-container .toggle-help-btn'),
        },
        handlers: {
            'click toggle_btn': function (e) {
                // show/hide help section
                help.$.container.fadeToggle();
            },
            'click title': function (e) {
                // adding 'open' class sets z-index: 1000 on help bubble
                // slide open/close the bubble content
                $(this).parent().toggleClass('open').end().next().slideToggle();
            }
        }
    };

    /***************************************************************************
        hops away - all data, elements, and methods for hops away
    ***************************************************************************/

    var hops = {
        init: function () {
            // attach event handlers
            this.$.btns.on('click', hops.handlers["click btn"]);
        },
        $: {
            btns: $('#hops-away span')
        },
        handlers: {
            // change hops away setting
            "click btn": function (e) {
                hops.$.btns.removeClass('selected');
                $(this).addClass('selected');
                hops.selected = $(this).data('hops');
                localStorage.setItem('hops_away', hops.selected);
                if (graph.selected) {graph.set_selected(graph.selected); }
            }
        }
    };

    /***************************************************************************
        search - all data, elements, and methods for search
    ***************************************************************************/
    var search = {
        init: function () {
            var form = $('#search-form');

            //attach event handlers
            search.$.input     .on('keyup',  search.handlers["keyup input"]);
            form               .on('submit', search.handlers["submit form"]);
            form.find('button').on('click',  search.handlers["click clear-btn"]);
        },
        $: {
            input: $('#search-field'),
        },
        handlers: {
            "keyup input": function (e) {
                graph.search(search.$.input.val());
            },
            "submit form": function (e) {
                e.preventDefault();
            },
            "click clear-btn": function (e) {
                search.$.input.val('');
                graph.reset();
            }
        }
    };
    
    /**********************************
        graph  - all data, elements, and methods for graph
    **********************************/

    var graph = {
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
        $: {
            container: null,
            entities: null
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
            return '<span>' + data[name].trails.join('<br>') + '</span>';
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
        // set the graph state to reflect the entity param as selected
        // if entity is undefined, reset the graph
        set_selected: function (entity) {
            // if entity is undefined, remove references
            if (!entity) {
                delete this.selected;
                localStorage.removeItem('selected_entity');
            // if entity is a string (name), set selected to name and entity to jQuery object
            } else if (typeof entity === 'string') {
                this.selected = entity;
                entity = this.$.entities.filter('[data-name="' + entity + '"]');
            // if entity is a jQuery object, set selected to element's data-name value
            } else {
                this.selected = entity.data('name');
            }

            this.reset();

            if (this.selected) {
                localStorage.setItem('selected_entity', this.selected);
                entity.addClass('selected');
                this.show_hops();
            }
        },
        // if subset_selected, filter graph.$.entities to entites in subset, hide all entites not in subset
        // if !subset, set graph.$.entites to all entities, show all
        set_subset: function (subset_selected) {
            var ents = $('.entity');
            if (subset_selected) {
                ents.filter(function (i, elem) {
                    return !sets.in_subset($(elem).data('name'));
                }).addClass('noshow');
                this.$.entities = ents.filter(function (i, elem) {
                    return sets.in_subset($(elem).data('name'));
                });
            } else {
                this.$.entities = ents;
            }
            this.reset();
        },
        // remove classes, so no entity is selected, remove hop-trail text
        reset: function () {
            this.$.entities.removeClass('selected hops-1 hops-2 hops-3 noshow').find('.hop-trail').html('');
        },
        // configure graph to reflect "hops away" from selected entity for all entites not selected
        show_hops: function () {
            //hops_data is an object where keys are entity names of related entities
            var hop_data = this.es.hops_data(this.selected, hops.selected),
                found, elem, name;

            // run the function for all non-selected graph.$.entities
            this.$.entities.not('.selected').each(function (i, element) {
                found = false;  // default is false -> entity's name hasn't been found in hop_data
                elem = $(element);
                name = elem.data('name');

                // if hop_data has a key that matches the entity's name
                if (hop_data.hasOwnProperty(name)) {
                    found = true;
                    // if the entity is more than one hop away from the selected entity
                    if (hop_data[name].hops > 1) {
                        elem.addClass("hops-" + hop_data[name].hops);
                        elem.children().eq(2).append(graph.hop_trail_html(hop_data, name));
                    }
                }
                // hide entity if name not found in hop_data
                if (!found) { elem.addClass('noshow'); }
            });
        },
        // reset graph and filter entities to show only those whose name's contain text in the search field
        search: function (search_term) {
            this.reset();
            search_term = search_term.toLowerCase();
            this.entities.each(function (i, elem) {
                elem = $(elem);
                if (elem.data('name').toLowerCase().indexOf(search_term) < 0) {
                    elem.addClass('noshow');
                }
            });
        },
        related_to_subset: function (entities) {

        },
        handlers: {
            'click entity': function (e) {
                // if entity is clicked, but not on an icon
                if (e.target.tagName !== 'SPAN') {
                    var ent = $(this);
                    // if editing a subset
                    if (sets.selected.edit_mode) {
                        sets.update(ent.data('name'));
                        ent.toggleClass('selected');

                    // normal functionality, not in edit mode
                    } else {
                        graph.set_selected(ent.hasClass('selected') ? undefined : ent);
                    }
                }
            },
            'click domain': function (e) {
                // hide/show domain
                $(this).toggleClass('open');
            },
            'click description': function (e) {
                // toggle selected class on icons' container, so it doesn't close when description is open
                $(this).parent().toggleClass('selected');
            } 
        }
    };

    /***************************************************************************
        sets - all data, elements, and methods for sets
    ***************************************************************************/
    var sets = {
        init: function (data) {
            this.assign(data);

            // attach event listeners
            this.$.select              .on('change', this.handlers["change select"]);
            this.$.list                .on('click',  this.handlers["click list"]);
            this.$.edit                .on('click',  this.handlers["click edit"]);
            this.$.show_related        .on('click',  this.handlers["click show_related"]);
            $('#add-set-form')         .on('submit', this.handlers["submit add-set-form"]);

            //init jquery-ui sortable plugin and attach event handler to update
            this.$.list.sortable({update: this.handlers["update sort"]});

        },
        $: {
            container: $('#entity-subsets'),
            select: $('#entity-subsets select'),
            list: $('#subset-list'),
            edit: $('#edit-subset-btn').hide(),
            show_related: $('#entity-subsets .checkbox')
        },
        selected: {
            edit_mode: false
        },
        add: function (set) {
            sets.data.unshift(set);
            sets.render();
            //FIX: make API call to add set
        },
        remove: function (index) {
            sets.data.splice(index, 1);
            sets.render();
            //FIX: make API call to remove set
        },
        assign: function (data) {
            sets.data = data;
            sets.render();
        },
        update: function (name) {
            var entities = sets.data[sets.selected].entities,
                index = entities.indexOf(name);
            if (index < 0) {
                entities.push(name);
            } else {
                entities.splice(index, 1);
            }
            //FIX: make api call to update set
        },
        // re-render select options in DOM to reflect sets.data
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
        // return whether or not the name is contained in the subset
        in_subset: function (name) {
            return sets.selected.hasOwnProperty('entities') ? sets.selected.entities.indexOf(name) >= 0 : true;
        },
        // 
        select_subset: function (index) {
            if (isNaN(index)) {
                delete sets.selected.index;
                delete sets.selected.entities;
                localStorage.removeItem('selected_subset_index');
                sets.$.container.removeClass('subset-selected');
            } else {
                index = parseInt(index, 10);
                sets.selected.index = index;
                sets.selected.entities = sets.selected.show_related ? graph.related_to_subset(sets.data[index].entities) : sets.data[index].entities;
                localStorage.setItem('selected_subset_index', index);
                sets.$.container.addClass('subset-selected');
            }
            graph.set_subset(sets.selected.hasOwnProperty('index'));
        },
        handlers: {
            // select a subset or select all entities
            "change select": function (e) {
                sets.select_subset($(e.currentTarget).find(':selected').val());
            },
            // change subset order in subset manager
            "update sort": function () {
                sets.reorder($(this).sortable('toArray'));
            },
            // submit 'add set' form in subset manager
            "submit add-set-form": function (e) {
                e.preventDefault();
                var input = $('#add-set-text');
                if (input.val()) {
                    sets.add({name: input.val(), entities: [] });
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
                sets.selected.edit_mode = !sets.selected.edit_mode;
                sets.$.edit.toggleClass('btn-default');
                sets.$.edit.toggleClass('btn-danger');
                graph.set_subset(sets.selected.edit_mode ? false : true);
                graph.entities.toggleClass('selected', sets.selected.edit_mode);
            },
            // click show related checkbox under subset select
            "click show_related": function (e) {
                sets.selected.show_related = $(e.currentTarget).prop('checked');
                sets.select_subset(sets.selected.index);
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

        // get hops away setting
        hops.selected = localStorage.getItem('hops_away') || 1;
        hops.$.btns.eq(hops.selected - 1).addClass('selected');

        var selected_index = parseInt(localStorage.getItem('selected_subset_index'), 10);
        if (selected_index >= 0) { sets.$.select.val(selected_index).change(); }

        sets.selected.show_related = localStorage.getItem('selected_subset_show_related') ? true : false;

        graph.set_selected(localStorage.getItem('selected_entity'));
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
