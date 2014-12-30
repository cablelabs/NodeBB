(function (window, document, $, EntityGraph, undefined) {
    'use strict';

    /***************************************************************************
        Globals
    ***************************************************************************/

    var graph;

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



    /***************************************************************************
        sets - all data, elements, and methods for sets
    ***************************************************************************/
    var sets = {
        select: $('#entity-sets select'),
        sort: $('#entity-set-sort-list'),
        edit: $('#edit-set-btn').hide(),
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
        update: function () {
            //FIX: make api call to update set
        },
        // empty set lists and render new set elements where they occur on the page
        render: (function () {
            function option (name, i) {
                return '<option value="' + i + '">' + name + '</option';
            }
            function li (name, i) {
                return '<li id="set-' + i + '">' + name + '<span title="remove" class="remove-icon glyphicon glyphicon-minus"></span></li>';
            }
            return function () {
                // remove set elements
                sets.select.children('option').not(':first').remove();
                sets.sort.empty();

                // create set elements
                sets.data.forEach(function (set, i) {
                    sets.select.append( option(set.name, i) );
                    sets.sort.append( li(set.name, i) );
                });
            };
        }()),
        /**
         * reorder_sets
         * order param is an array of strings in the format of 'set-n'
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
        /**
         * event handlers
         */
        handlers: {
            "change select": function (e) {
                var selected = $(e.currentTarget).find(':selected');
                switch( selected.val() ) {
                    // when all entities is selected, hide edit button
                    case 'all':
                        sets.selected = null;
                        graph.setEntitySet();
                        sets.edit.fadeOut();
                        break;
                    // when a set is selected, reveal edit button
                    default:
                        sets.selected = selected.index() - 1;
                        graph.setEntitySet({
                            entities: sets.data[sets.selected].entities,
                            update: sets.update
                        });
                        sets.edit.fadeIn();
                }
                graph.reset();
            },
            "update sort": function () {
                sets.reorder($(this).sortable('toArray'));
            },
            "submit add-set-form": function (e) {
                e.preventDefault();
                var input = $('#add-set-text');
                if (input.val()) {
                    sets.add({name: input.val(), entities: [] });
                }
                input.val('');
            },
            // check for click on the remove button
            "click sort": function (e) {
                var target = $(e.target);
                if (target.hasClass('remove-icon')) {
                    sets.remove(target.parent().index());
                }
            },
            "click edit": function (e) {
                graph.editting(!graph.editting());
                sets.edit.toggleClass('btn-default');
                sets.edit.toggleClass('btn-danger');
                graph.reset();
            }
        }
    };

    //events
    sets.select.on('change', sets.handlers["change select"]);

    $('#add-set-form').on('submit', sets.handlers["submit add-set-form"]);

    sets.sort.on('click', sets.handlers["click sort"]);

    sets.edit.on('click', sets.handlers["click edit"]);

    //init jquery-ui sortable plugin and attach event handler to update
    sets.sort.sortable({update:  sets.handlers["update sort"]});




    /***************************************************************************
        search - all data, elements, and methods for search
    ***************************************************************************/
    var search = {
        field: $('#search-field'),
        handlers: {
            "keyup field": function (e) {
                graph.search(search.field.val());
            },
            "submit form": function (e) {
                e.preventDefault();
            },
            "click clear-btn": function (e) {
                search.field.val('');
                graph.reset();
            }
        }
    };

    // events
    search.field.on('keyup', search.handlers["keyup field"]);

    $('#search-form').on('submit', search.handlers["submit form"]);

    $('#clear-search-btn').on('click', search.handlers["click clear-btn"]);




    /***************************************************************************
        hops away - all data, elements, and methods for hops away
    ***************************************************************************/

    var hops = {
        btns: $('.hops-away-btn'),
        handlers: {
            "click btn": function (e) {
                hops.btns.removeClass('selected');
                $(this).addClass('selected');
                graph.setDepth($(this).data('hops'));
            }
        }
    };

    // events
    hops.btns.on('click', hops.handlers["click btn"]);

    


    /***************************************************************************
        AJAX requests
    ***************************************************************************/

    /* Ajax Request to fetch Graph Data */
    $.ajax({url: '/secured/mind-map/assets/links.json'})
    .done(function (data) {
        graph = EntityGraph.create(data, 'graph');
        hops.btns.eq(graph.getDepth() - 1).addClass('selected');
    }).fail(function() {
        error_handler('unable to download graph data');
    });


    /* Ajax Request to fetch Entity Sets Data */
    $.ajax({url: '/secured/mind-map/assets/sets.json'})
    .done(function (data) {
        sets.assign(data.sets);
    })
    .fail(function() {
        error_handler('unable to download saved entity sets'); 
    });

}(window, document, jQuery, EntityGraph));
