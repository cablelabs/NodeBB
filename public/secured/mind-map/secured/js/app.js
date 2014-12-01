(function (window, document, $, undefined) {

var $searchField = $('#search-field'),
    $viewDepthSelect = $('.view-depth-select'),
    graph;

$searchField.on('keyup', function (evt) {
    graph.search($searchField.val())
})

$('#search-form').on('submit', function (evt) {
    evt.preventDefault();
})

$('#clear-search-btn').on('click', function () {
    $searchField.val('');
    graph.reset();
})

$viewDepthSelect.on('click', function (event) {
    $viewDepthSelect.removeClass('selected')
    $(this).addClass('selected')
    graph.setDepth($(this).data('depth'))
})

/* Ajax Request to fetch Graph Data */
$.ajax({url: '/secured/mind-map/assets/links.json'}).done(function (data) {

    //graph is the id of the element in which we'll create the graph
    //EntityGraph depends on jQuery.  Please include it in index.html
    graph = EntityGraph.create(data, 'graph')

}).fail(function() { alert('unable to download graph data')} );

}(window, document, jQuery))
