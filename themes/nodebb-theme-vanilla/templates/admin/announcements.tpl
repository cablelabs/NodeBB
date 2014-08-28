
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

    <div class="row col-md-6 pull-right">
        <div class="col-xs-6">
            <ul class="nav nav-pills">
            <!-- BEGIN templates -->
                <li class="<!-- IF @first -->active<!-- ENDIF @first -->"><a href="#" data-template="{templates.template}" data-toggle="pill">{templates.template}</a></li>
            <!-- END templates -->
            </ul>

            <div class="tab-content">
            <!-- BEGIN templates -->
                <div class="tab-pane <!-- IF @first -->active<!-- ENDIF @first -->" data-template="{templates.template}">
                <!-- BEGIN areas -->
                    <div class="area" data-template="{templates.template}" data-location="{templates.areas.location}">
                        <h4>{templates.areas.name} <small>{templates.template} / {templates.areas.location}</small></h4>
                        <div class="well widget-area">

                        </div>
                    </div>
                <!-- END areas -->
                </div>
            <!-- END templates -->
            </div>

            <button class="btn btn-success save pull-right">Save</button>
        </div>
        <div class="col-xs-6">
            <div class="available-widgets">
                <h4>Available Widgets <small>Drag and drop widgets into templates</small></h4>
                <!-- IF !widgets.length -->
                <div class="alert alert-info">No widgets found! Activate the essential widgets plugin in the <a href="/admin/plugins">plugins</a> control panel.</div>
                <!-- ENDIF !widgets.length -->
                <div class="row">
                    <!-- BEGIN widgets -->
                    <div class="col-lg-6 col-md-12">
                        <div data-widget="{widgets.widget}" class="panel panel-default pointer">
                            <div class="panel-heading">
                                <strong>{widgets.name}</strong>
                                <small><br />{widgets.description}</small>
                            </div>
                            <div class="panel-body hidden">
                                <form>
                                    {widgets.content}
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- END widgets -->
                </div>
            </div>
            <hr />
            <div class="available-containers">
                <h4>Available Containers <small>Drag and drop on top of any widget</small></h4>
                <div class="containers">
                    <div class="pointer" style="padding: 20px; border: 1px dotted #dedede; margin-bottom: 20px;" data-container-html=" ">
                        None
                    </div>
                    <div class="well pointer" data-container-html='<div class="well">{body}</div>'>
                        Well
                    </div>
                    <div class="jumbotron pointer" data-container-html='<div class="jumbotron">{body}</div>'>
                        Jumbotron
                    </div>
                    <div class="panel" data-container-html='<div class="panel"><div class="panel-body">{body}</div></div>'>
                        <div class="panel-body pointer">
                            Panel
                        </div>
                    </div>
                    <div class="panel panel-default pointer" data-container-html='<div class="panel panel-default"><div class="panel-heading">{title}</div><div class="panel-body">{body}</div></div>'>
                        <div class="panel-heading">
                            Panel Header
                            <div class="pull-right color-selector">
                                <button data-class="panel-default" class="btn btn-xs">&nbsp;&nbsp;</button>
                                <button data-class="panel-primary" class="btn btn-xs btn-primary">&nbsp;&nbsp;</button>
                                <button data-class="panel-success" class="btn btn-xs btn-success">&nbsp;&nbsp;</button>
                                <button data-class="panel-info" class="btn btn-xs btn-info">&nbsp;&nbsp;</button>
                                <button data-class="panel-warning" class="btn btn-xs btn-warning">&nbsp;&nbsp;</button>
                                <button data-class="panel-danger" class="btn btn-xs btn-danger">&nbsp;&nbsp;</button>
                            </div>
                        </div>
                        <div class="panel-body">
                            Panel Body
                        </div>
                    </div>

                    <div class="alert alert-info pointer" data-container-html='<div class="alert alert-info">{body}</div>'>
                        Alert
                        <div class="pull-right color-selector">
                            <button data-class="alert-success" class="btn btn-xs btn-success">&nbsp;&nbsp;</button>
                            <button data-class="alert-info" class="btn btn-xs btn-info">&nbsp;&nbsp;</button>
                            <button data-class="alert-warning" class="btn btn-xs btn-warning">&nbsp;&nbsp;</button>
                            <button data-class="alert-danger" class="btn btn-xs btn-danger">&nbsp;&nbsp;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
