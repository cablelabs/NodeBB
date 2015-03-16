<!--<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">-->

<div id="entity-map-container">

    <div class="row" id="graph-settings">

      <!-- Subsets -->
      <div class="col-md-4" id="subset-settings">
        <select class="form-control">
          <option value="-1">All Entities</option>
        </select>
        <div class="second-row">
          <button class="btn btn-xs" type="button" data-toggle="modal" data-target="#subset-manager">
            <!-- <span class="glyphicon glyphicon-edit"></span> Subsets -->
            <i class="fa fa-tachometer"></i> Subsets
          </button>
          <div class="btn-group pull-right">
            <button type="button" class="btn btn-xs edit-subset-btn">
              <!-- <span class="glyphicon glyphicon-edit"></span> edit -->
              <i class="fa fa-edit"></i> edit
            </button>
            <button type="button" data-toggle="modal" data-target="#share-set" class="btn btn-primary btn-xs share-subset-btn">
              <!-- <span class="glyphicon glyphicon-share"></span> share -->
              <i class="fa fa-share"></i> share
            </button>
          </div>
        </div>
      </div>
      <!-- End Subsets -->

      <!-- Search, Help, Reset -->
      <div class="col-md-4" id="search-settings">
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" placeholder="Search by Name" id="search-field">
          <span class="input-group-btn">
            <button type="button" class="btn btn-xs reset-graph-btn">
              <!-- <span class="glyphicon glyphicon-refresh"></span> Reset -->
              <i class="fa fa-refresh"></i> Reset
            </button>
          </span>
        </div>
      </div>
      <!-- End Search -->

      <!-- Show Related -->
      <div class="col-md-4" id="show-related-settings">
        <div class="input-group">
          <span class="input-group-addon">Show Related</span>
          <div class="btn-group hops-btns">
            <button class="btn hops-1 btn-sm hops-btn" data-hops="1">1</button>
            <button class="btn hops-2 btn-sm hops-btn" data-hops="2">2</button>
            <button class="btn hops-3 btn-sm hops-btn" data-hops="3">3</button>
          </div>
          <button type="button" class="btn btn-primary btn-xs help-btn">
            <i class="fa fa-question show"></i><i class="fa fa-close"></i>
          </button>
        </div>
        <div class="second-row">
          <div class="btn-group">
            <button class="btn btn-xs show-all-btn" data-setting="show_all">show all</button>
          </div>
        </div>
      </div>
      <!-- End Show Related -->
    </div> <!-- End Graph Settings -->

    <!-- Spinner -->
    <!--[if IE]><p class="loading-msg">Loading Entity Map...</p><![endif]-->
    <!--[if !IE]> -->
    <div class="spinner">
      <div class="dot1"></div><div class="dot2"></div>
    </div>
    <!-- <![endif]-->

    <!-- Graph -->
    <div id="graph"></div>

    <!-- Help -->
    <div id="help-overlay">
      <div class="row">
        <div class="col-md-4">
          <div class="popover bottom" id="help-subsets">
            <div class="popover-title">Subsets</div>
            <div class="popover-content">
              Subsets enable you to limit the scope of what you see.  Click on "Subsets" to create, delete, and reorder subsets.  You can create a subset as empty, containing selected entities, or containing selected and related entities.  Outside of the subset manager, if you select a subset, you will see the edit and share buttons appear.  Edit allows you to add/remove entites from the set.  Share, allows you to share a copy of the subset with another user.  Any edits made after sharing won't be shared.
              The subset only filters which entities are shown.  The graph still behaves as if all entities are present, so two entities in a subset can be related through entities that aren't in the subset.
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="popover bottom" id="help-search">
            <div class="popover-title">Search</div>
            <div class="popover-content">
              Search will deselect all entities and show only entities whose name matches the text in the search field.  Click any entity in the search results.  Clicking the 'X' will remove search text and reset the entity-map.  Likewise, clicking the reset button will reset the map and the search field.
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="popover bottom" id="help-related">
            <div class="popover-title">Show Related</div>
            <div class="popover-content">
              "Show Related" settings 1, 2, or 3 will limit the degree of relationships visible after selecting entities.  1 limits the visible relationships to those entities directly related to the selected entities.  The relationships displayed are unidirectional, or stemming from the selected entities, unless bidirectional is selected.  Selecting bidirectional will consider both links to/from an entity in calculating relationships.
              Clicking "Show All" will display all entities (limited by the subset), not just those related to the selected entities.
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="popover bottom" id="help-entity">
            <div class="popover-title">Entity</div>
            <div class="popover-content">
              <img src="/images/entity-open.jpg" alt="Entity">
              <span>
                When you position your mouse over or touch an entity, it expands to show two icons.  Click on the 'i' to view a description of the icon.  Click on the arrows to leave the entity-map page and view the entity in the API documentation.  Click anywhere except for the two icons to select the entity and view related entities.
              </span>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="popover bottom" id="help-trail">
            <div class="popover-title">Entity Trail</div>
            <div class="popover-content">
              <img src="/images/hop-trail.jpg" alt="Entity">
              <span></span>
              Related entities will list the enties that are one step before the current entity, when tracing back to the selected entities.  In this example, "Account" is selected.  On Preference, the right arrow indicates that Account has a link to Preference.  On Payment Plan, the left arrow indicates that Payment Plan has a link to Account.  Preference and Payment plan are both one step away from Account.  Payment Method is two steps away from Account and relates to Account through Payment Plan.  Payment method shares a two-way relationship with Payment Plan. 
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="popover bottom" id="help-tutorial">
            <div class="popover-title">Video Tutorial</div>
            <div class="popover-content">
              For a better understanding of how to use the Entity Map, please see the 
              <a href="//youtu.be/Irpyf1pgLgI" target="_blank">video tutorial</a>.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div> <!-- end #entity-map-container -->
</div> <!-- end .container-fluid -->

<!-- Modal -->
<div class="modal fade" id="subset-manager" tabindex="-1" role="dialog" aria-labelledby="subset-manager" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Manage Entity Sets</h4>
      </div>
      <div class="modal-body">
        <div>
          <form role="add" id="add-set-form">
            <legend>Create Set</legend>
            <div class="add-set-radio">
              <label class="checkbox-inline">
                <input type="radio" name="include-related" value="none" checked> Empty
              </label>
              <label class="checkbox-inline">
                <input type="radio" name="include-related" value="selected"> Include Selected
              </label>
              <label class="checkbox-inline">
                <input type="radio" name="include-related" value="all"> Selected and Related
              </label>
            </div>
            <div class="input-group input-group-lg">
              <input type="text" class="form-control" placeholder="New Set Name" id="add-set-text">
              <span class="input-group-btn">
                <button class="btn btn-default" id="add-set-btn" type="submit">
                  <span class="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
          </form>
          <h3>Current Sets</h3>
          <ul id="subset-list"></ul>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>

<!-- Share Set Modal -->
<div class="modal fade" id="share-set" tabindex="-1" role="dialog" aria-labelledby="set-manager" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="shareModalLabel">Share Entity Set</h4>
      </div>
      <div class="modal-body">
        <div>
          <form role="add" id="share-set-form">
            <div class="input-group input-group-lg">
              <input type="text" class="form-control" placeholder="Enter username to search" id="share-set-user">
          <span class="input-group-btn">
            <button class="btn btn-default" id="share-set-submit" type="submit">
              <span class="glyphicon glyphicon-share"></span>
            </button>
          </span>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>

<!-- Page Loading Modal-->
<div class="modal hide" id="loadingModal" data-backdrop="static" data-keyboard="false">
  <div class="modal-header">
    <h1>Loading...</h1>
  </div>
  <div class="modal-body">
    <div class="progress progress-striped active">
      <div class="bar" style="width: 100%;"></div>
    </div>
  </div>
</div>

<!--<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>-->
<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>-->
<script src="secured/mind-map/secured/js/jquery-ui.min.js"></script>
<script src="secured/mind-map/secured/js/entity.js"></script>
<script src="secured/mind-map/secured/js/entity-map.js"></script>

