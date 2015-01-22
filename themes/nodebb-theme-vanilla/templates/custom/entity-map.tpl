<!--<!doctype html>-->
<!--<html lang="en">-->
<!--<head>-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>CIA Entities Map</title>
    <!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">-->
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="secured/mind-map/secured/css/app.css">
<!--</head>-->

<!--<body>-->

<!--<div id="container-fluid">-->

<div class="entity-map-container">
  <button class="btn btn-default toggle-help-btn">?</button>
  <div class="graph-settings" class="row">
    <div class="col-md-4" id="entity-sets">
      <div>
        <label for="sets">Entity Subset</label>
        <button type="button" id="edit-setlist-btn" class="btn btn-link" title="Manage Entity Sets"
                data-toggle="modal" data-target="#set-manager">
          <span class="glyphicon glyphicon-edit"></span>
        </button>
      </div>
      <div>
        <select name="sets" id="sets" class="form-control">
          <option value="all">All Entities</option>
        </select>
      </div>
      <div>
        <button type="button" id="edit-set-btn" class="btn btn-default">
          <span class="glyphicon glyphicon-edit"></span>
        </button>
      </div>
    </div>
    <div class="col-md-4">
      <form role="search" id="search-form">
        <label for="search-field">Entity Search</label>
        <div class="input-group input-group-lg">
          <input type="text" class="form-control" placeholder="Entity Name" id="search-field">
          <span class="input-group-btn">
            <button class="btn btn-default" id="clear-search-btn" type="button">&#x2716;</button>
          </span>
        </div>
      </form>
    </div>
    <div class="hops-away-wrap col-md-4">
      <span>Hops Away </span>
      <div data-hops="1" class="depth-1 hops-away-btn">1</div>
      <div data-hops="2" class="depth-2 hops-away-btn">2</div>
      <div data-hops="3" class="depth-3 hops-away-btn">3</div>
    </div>
  </div>
  <div id="graph"></div>
  <div id="help-overlay">
    <div class="row">
      <div class="col-md-4">
        <div class="popover bottom" id="help-subsets">
          <div class="arrow"></div>
          <div class="popover-title">Subsets <span class="glyphicon glyphicon-question-sign"></span></div>
          <div class="popover-content">
            Subsets enable you to limit the scope of what you see.  Click on the pencil icon next to "Entity Subset" to create, delete, and reorder subsets.  To edit which entites are in a subset, select the subset and then click the circular edit icon that appears.
            The edit icon will turn red to show that you are in edit mode.  Click the edit icon again to exit edit mode.  Selecting a subset only filters which entities are shown.  The graph still behaves as if all entities are present, so two entities in a subset can be related through entities that aren't in the subset.
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="popover bottom" id="help-search">
          <div class="arrow"></div>
          <div class="popover-title">Search <span class="glyphicon glyphicon-question-sign"></span></div>
          <div class="popover-content">
            Search will deselect all entities and show only entities whose name matches the text in the search field.  Click any entity in the search results.  Clicking the 'X' will remove search text and reset the entity-map.
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="popover bottom" id="help-hops">
          <div class="arrow"></div>
          <div class="popover-title">Hops Away <span class="glyphicon glyphicon-question-sign"></span></div>
          <div class="popover-content">
            'Hops Away' indicates how many hops it takes to get from one entity to another.  All "hops away" are bi-directional and calculated from the selected entity.  Entities that are directly related are 1 hop away.  2 hops away indicates that two entities share a "1 hop" relationship with a common entity.  3 hops away indicates that 2 entities are related through two different entities.  Select "1, 2, or 3" to limit which relationships will appear after selecting an entity.
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="popover bottom" id="help-entity">
          <div class="popover-title">Entity <span class="glyphicon glyphicon-question-sign"></span></div>
          <div class="popover-content">
            <img src="/images/entity-open.jpg" alt="Entity">
            <span>
              When you position your mouse over or touch an entity, it expands to show two icons.  Click on the 'i' to see the entity's description.  Click on the 'arrows' icon to leave the entity-map and navigate to that entity in the API documentation.  Click anywhere except for those two icons to select the entity and view related entities.
            </span>
          </div>
        </div>
      </div>
      <!--
      <div class="col-md-4">
        <div class="popover bottom" id="help-video">
          <div class="popover-title">Video</div>
          <div class="popover-content">
            For more detailed instructions on how to use the entity-map, please watch the
            <a href="#">Entity-Map Video Tutorial</a>.
          </div>
        </div>
      </div>
      -->
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="set-manager" tabindex="-1" role="dialog" aria-labelledby="set-manager" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Manage Entity Sets</h4>
      </div>
      <div class="modal-body">
        <div>
          <form role="add" id="add-set-form">
            <div class="input-group input-group-lg">
            <input type="text" class="form-control" placeholder="New Set Name" id="add-set-text">
            <span class="input-group-btn">
              <button class="btn btn-default" id="add-set-btn" type="submit">
                <span class="glyphicon glyphicon-plus"></span>
              </button>
            </span>
          </div>
          </form>
          <ul id="entity-set-sort-list"></ul>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>

<!--<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>-->
<script src="secured/mind-map/secured/js/jquery-ui.min.js"></script>
<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>-->
<script src="secured/mind-map/secured/js/dom-element.js"></script>
<script src="secured/mind-map/secured/js/entity-graph.js"></script>
<script src="secured/mind-map/secured/js/app.js"></script>

<!--</body>-->
<!--</html>-->