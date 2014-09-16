
<div class="categories">
    <h1><i class="fa fa-folder"></i> Api Categories
        <div class="pull-right">
            <button class="btn btn-default" id="revertChanges">Revert Changes</button>
            <button class="btn btn-primary" id="addNew">New API Category</button>
        </div>
    </h1>
    <hr />
    <ul class="nav nav-pills">
        <li class='active'><a href='/admin/announcements/active'>Active</a></li>
        <li class=''><a href='/admin/announcements/disabled'>Disabled</a></li>
    </ul><br />

    <div class="row admin-announcements pull-left">
        <ul class="col-md-12" id="entry-container">
            <!-- BEGIN announcements -->
            <li data-cid="{announcements.cid}" class="entry-row">
                <div class="well">
                    <form class="form">
                        <div class="row">
                            <div class="col-sm-2 hidden-xs text-center">
                                <div class="preview-box" style="
									<!-- IF announcements.bgColor -->background-color: {announcements.bgColor};<!-- ENDIF announcements.bgColor -->
									color: {announcements.color};
									background-size:cover;
								">
                                    <div class="icon">
                                        <p>Preview Box</p>
                                    </div>
                                </div><br />
                            </div>
                            <div class="col-sm-10">

                                <div class="col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="cid-{announcements.cid}-name">Header</label>
                                        <input id="cid-{announcements.cid}-name" data-name="name" placeholder="Announcement Header" value="{announcements.name}" class="form-control category_name input-sm name"></input>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="cid-{announcements.cid}-description">Description</label>
                                        <input id="cid-{announcements.cid}-description" data-name="description" placeholder="Announcement Description" value="{announcements.description}" class="form-control category_description input-sm description"></input>
                                    </div>
                                </div>

                                <div class="col-sm-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="cid-{announcements.cid}-bgColor">Background Colour</label>
                                        <input id="cid-{announcements.cid}-bgColor" placeholder="#0059b2" data-name="bgColor" value="{announcements.bgColor}" class="form-control category_bgColor" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="cid-{announcements.cid}-color">Text Colour</label>
                                        <input id="cid-{announcements.cid}-color" placeholder="#fff" data-name="color" value="{announcements.color}" class="form-control category_color" />
                                    </div>
                                </div>
                                <div class="col-sm-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="cid-{announcements.cid}-class">Custom Class</label>
                                        <input id="cid-{announcements.cid}-class" type="text" class="form-control" placeholder="col-md-6 col-xs-6" data-name="class" value="{announcements.class}" />
                                    </div>
                                </div>
                                <div class="col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-default" data-toggle="dropdown"><i class="fa fa-cogs"></i> Options</button>
                                            <ul class="dropdown-menu" role="menu">
                                                <li class="permissions"><a href="#"><i class="fa fa-ban"></i> Access Control</a></li>
                                                <hr />
                                                <li data-disabled="{announcements.disabled}">
                                                    <!-- IF announcements.disabled -->
                                                    <a href="#"><i class="fa fa-power-off"></i> Enable</a>
                                                    <!-- ELSE -->
                                                    <a href="#"><i class="fa fa-power-off"></i> Disable</a>
                                                    <!-- ENDIF announcements.disabled -->
                                                </li>
                                                <li><a href="#" class="purge"><i class="fa fa-eraser"></i> Purge</a></li>
                                            </ul>


                                            <button class="btn btn-primary save">Save</button>

                                        </div>
                                    </div>
                                </div>

                                <input type="hidden" data-name="order" data-value="{announcements.order}"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </li>

            <!-- END announcements -->
        </ul>
    </div>

    <div id="new-announcement-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="Add New Modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3>Create New Api Category</h3>
                </div>
                <div class="modal-body">
                    <div>
                        <form class='form-horizontal'>
                            <div class="control-group">
                                <label class="control-label" for="inputName">Name</label>
                                <div class="controls">
                                    <input class="form-control" type="text" id="inputName" placeholder="Name" value="">
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="inputDescription">Description</label>
                                    <div class="controls">
                                        <input class="form-control" type="text" id="inputDescription" placeholder="Description" value="">
                                        </div>
                                    </div>

                                    <div class="control-group">
                                        <label class="control-label" for="inputIcon">Icon</label>
                                        <div class="controls">
                                            <div class="icon">
                                                <i data-name="icon" value="fa-pencil" class="fa fa-pencil fa-2x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="create-announcement-btn" href="#" class="btn btn-primary btn-lg btn-block">Create</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

            <div id="announcement-permissions-modal" class="modal permissions-modal fade" tabindex="-1" role="dialog" aria-labelledby="Category Permissions" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h3>Category Permissions</h3>
                        </div>
                        <div class="modal-body">
                            <p>The following users have access control permissions in this Category</p>
                            <ul class="members"></ul>

                            <hr />
                            <form role="form">
                                <div class="form-group">
                                    <label for="permission-search">User Search</label>
                                    <input class="form-control" type="text" id="permission-search" />
                                </div>
                            </form>
                            <ul class="search-results users"></ul>

                            <hr />
                            <form role="form">
                                <div class="form-group">
                                    <label for="permission-group-pick">User Groups</label>
                                </div>
                            </form>
                            <ul class="search-results groups"></ul>

                        </div>
                    </div>
                </div>
            </div>

            <div id="icons" style="display:none;">
                <div class="icon-container">
                    <div class="row fa-icons">
                        <i class="fa fa-doesnt-exist"></i>
                        <!-- IMPORT partials/fontawesome.tpl -->
                    </div>
                </div>
            </div>
