(function (window, document, $, EntityGraph, undefined) {
    'use strict';

    /***************************************************************************
        Globals
    ***************************************************************************/

    var graph;

    // initialize sockets
    var ioParams = {
        'max reconnection attempts': config.maxReconnectionAttempts,
        'reconnection delay': config.reconnectionDelay,
        resource: RELATIVE_PATH.length ? RELATIVE_PATH.slice(1) + '/socket.io' : 'socket.io'
    };
    if (utils.isAndroidBrowser()) {
        ioParams.transports = ['xhr-polling'];
    }
    var socket = io.connect(config.websocketAddress, ioParams);

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
        searchTxt: $('#share-set-user'),
        sort: $('#entity-set-sort-list'),
        edit: $('#edit-set-btn').hide(),
        share: $('#share-set-btn').hide(),
        add: function (set) {
            console.log("Came to add set.");
            sets.data.unshift(set);
            sets.render();
            //FIX: make API call to add set
            user_update();
        },
        remove: function (index) {
            sets.data.splice(index, 1);
            sets.render();
            //FIX: make API call to remove set
            user_update();
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
                    // remove localstorage value
                    case 'all':
                        sets.selected = null;
                        graph.setEntitySet();
                        sets.edit.fadeOut();
                        sets.share.fadeOut();
                        break;
                    // when a set is selected, reveal edit button
                    default:
                        sets.selected = selected.index() - 1;
                        graph.setEntitySet({
                            entities: sets.data[sets.selected].entities,
                            update: sets.update
                        });
                        sets.edit.fadeIn();
                        sets.share.fadeIn();
                }
                window.localStorage.setItem('entity_set_selected_index', selected.val());
                graph.reset();
            },
            "change search": function () {
                console.log($('#share-set-user').val())
                socket.emit('user.search', $('#share-set-user').val(), function(err, data) {
                    if (err) {
                        console.log("Search failed");
                    }
                    if (!data) {
                        console.log("Search returned null");
                    }

                    console.log(JSON.stringify(data));
                    var innerHtml = '';

                    $('#search-results').innerHTML = innerHtml;
                });
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
            "submit share-set-form": function (e) {
                e.preventDefault();
                var username = $('#share-set-user');
                console.log("user name " + username.val());
                if (username.val()) {
                    var data = {
                        username: username.val(),
                        set: sets.data[sets.selected]
                    }
                    socket.emit('user.shareSet', data, function(err, return_data) {
                        if (err) {
                            return app.alertError(err.message);
                        }
                        $('#share-set').modal('toggle');
                        app.alertSuccess('[[user:set_share_success]]');
                    });
                    username.val('');
                }
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
                user_update();
            },
            "click share": function (e) {
                console.log("sets.selected" + JSON.stringify(sets.data[sets.selected]));
            }
        }
    };

    //events
    sets.select.on('change', sets.handlers["change select"]);

    //sets.searchTxt.on('change', sets.handlers["change search"]);

    $('#add-set-form').on('submit', sets.handlers["submit add-set-form"]);

    $('#share-set-form').on('submit', sets.handlers["submit share-set-form"]);

    //$('#add-set-form').on('submit', sets.handlers["submit add-set-form"]);

    sets.sort.on('click', sets.handlers["click sort"]);

    sets.edit.on('click', sets.handlers["click edit"]);

    sets.share.on('click', sets.handlers["click share"]);

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
                var hops_away = $(this).data('hops');
                window.localStorage.setItem('hops_away', hops_away);
                hops.btns.removeClass('selected');
                $(this).addClass('selected');
                graph.setDepth(hops_away);
            }
        }
    };

    // events
    hops.btns.on('click', hops.handlers["click btn"]);

    

    /**********************************
        Help overlay
    **********************************/

    var help = {
        container: $('#help-overlay'),
        title: $('#help-overlay .popover-title'),
        show_help_btn: $('.entity-map-container .toggle-help-btn'),
        handlers: {
            'click title': function (e) {
                var title = $(this);
                title.parent().toggleClass('open');
                title.next().slideToggle();
            },
            'click show_help_btn': function (e) {
                help.container.fadeToggle();
            }
        }
    };

    help.title.on('click', help.handlers['click title']);
    help.show_help_btn.on('click', help.handlers['click show_help_btn']);
    help.container.hide();
    help.title.next().hide();

    /***************************************************************************
        AJAX requests
    ***************************************************************************/

    function recall_graph_state (result) {
        graph = result;

        // set hop depth
        var hops_away = window.localStorage.getItem('hops_away') || 1;
        hops.btns.eq(hops_away - 1).trigger('click');

        // selected entity set
        var selected = window.localStorage.getItem('entity_set_selected_index');
        if (selected) { sets.select.val(selected).change(); }

        // selected entity
        graph.selectEntity(window.localStorage.getItem('selected_entity_name'));
    }

    function user_getsets() {
        socket.emit('user.getSets', function(err, data) {
            if (err) {
                return app.alertError(err.message);
            }
            if(data != null) {
                sets.assign(JSON.parse(data));
            }
        });
    }

    function user_update() {
        socket.emit('user.setSets', JSON.stringify(sets.data), function(err, data) {
            if (err) {
                return app.alertError(err.message);
            }
            app.alertSuccess('[[user:profile_update_success]]');
        });
    }

    /**
     * When graph and subset data have been fetched, render graph and recall saved state.
     */
    $.when($.ajax({url: '/secured/mind-map/assets/links.json'}),
           $.ajax({url: '/secured/mind-map/assets/sets.json'}))
    .done(function (graph_data, sets_data) {
            sets.assign(sets_data[0].sets);
            EntityGraph.create(graph_data[0], 'graph', recall_graph_state);
    });

    // Get User Sets
    user_getsets();

}(window, document, jQuery, EntityGraph));
