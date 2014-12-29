(function (window, document, $, EntityGraph, undefined) {

    function init_sets (data) {
        sets = data.sets;
        entity_set_select.children('option').not(':first').remove();
        entity_set_sort.empty();
        data.sets.forEach(function (set, i) {
            entity_set_select.append('<option value="' + i + '">' + set.name + '</option');
            entity_set_sort.append('<li id="set-' + i + '"">' + set.name + '<span title="remove" class="remove-icon glyphicon glyphicon-minus"></span></li>');
        });
    }

    function reorder_sets (order) {
        var result = [];
        order.forEach(function (last, current) {
            last = parseInt(last.substring(4),10);
            result.push(sets[last]);
        });
        init_sets ({sets: result});
    }

    var search_field = $('#search-field'),
        view_depth_select = $('.view-depth-select'),
        entity_set_select = $('#entity-sets select'),
        entity_set_sort = $('#entity-set-sort-list'),
        set_manager = $('#set-manager'),
        edit_set_btn = $('#edit-set-btn').hide(),
        graph,
        sets;

    search_field.on('keyup', function (evt) {
        graph.search(search_field.val());
    });

    $('#search-form').on('submit', function (evt) {
        evt.preventDefault();
    });

    $('#clear-search-btn').on('click', function () {
        search_field.val('');
        graph.reset();
    });

    view_depth_select.on('click', function (event) {
        view_depth_select.removeClass('selected');
        $(this).addClass('selected');
        graph.setDepth($(this).data('depth'));
    });

    entity_set_select.on('change', function (event) {
        var value = $(event.currentTarget).find(':selected').val();
        switch(value) {
            case 'all':
                edit_set_btn.fadeOut();
                break;
            default:
                edit_set_btn.fadeIn();

        }
    });

    entity_set_sort.sortable({ update: function( event, ui ) {
        //console.log($(ui.item).index());
        reorder_sets($(this).sortable('toArray'));
    }});

    $('#add-set-btn').on('click', function (event) {
        sets.push({name: $('#add-set-text').val(), entities: [] });
        init_sets({sets: sets});
    });

    entity_set_sort.on('click', function (event) {
        var target = $(event.target);
        if (target.hasClass('remove-icon')) {
            console.log('remove it');
        }
    });

    /* Ajax Request to fetch Graph Data */
    $.ajax({url: '/secured/mind-map/assets/links.json'}).done(function (data) {

        //graph is the id of the element in which we'll create the graph
        //EntityGraph depends on jQuery.  Please include it in index.html
        graph = EntityGraph.create(data, 'graph');
        view_depth_select.eq(graph.getDepth() - 1).addClass('selected');

    }).fail(function() { alert('unable to download graph data'); } );


    /* Get Entity Subset Data */
    $.ajax({url: '/secured/mind-map/assets/sets.json'})
    .done(init_sets)
    .fail(function() { alert('unable to download saved entity sets'); } );

}(window, document, jQuery, EntityGraph));
