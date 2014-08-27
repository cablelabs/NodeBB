
<div class="categories">
	<h1><i class="fa fa-folder"></i> Api Categories
		<div class="pull-right">
			<button class="btn btn-default" id="revertChanges">Revert Changes</button>
			<button class="btn btn-primary" id="addNew">New API Category</button>
		</div>
	</h1>
	<hr />
	<ul class="nav nav-pills">
		<li class='active'><a href='/admin/apis/active'>Active</a></li>
		<li class=''><a href='/admin/apis/disabled'>Disabled</a></li>
	</ul><br />

	<div class="row admin-apis">
		<ul class="col-md-12" id="entry-container">
		<!-- BEGIN apis -->
			<li data-cid="{apis.cid}" class="entry-row">
				<div class="well">
					<form class="form">
						<div class="row">
							<div class="col-sm-2 hidden-xs text-center">
								<div class="preview-box" style="
									<!-- IF apis.bgColor -->background-color: {apis.bgColor};<!-- ENDIF apis.bgColor -->
									color: {apis.color};
									background-size:cover;
								">
								<div class="icon">
                                    <p>Preview Box</p>
                                </div>
								</div><br />
							</div>
							<div class="col-sm-10">
								<h3 data-edit-target="#cid-{apis.cid}-name"><span>{apis.name}</span> <small><i class="fa fa-edit"></i></small></h3>
								<input id="cid-{apis.cid}-name" type="text" class="form-control hide" placeholder="Category Name" data-name="name" value="{apis.name}" />
								<h4 data-edit-target="#cid-{apis.cid}-description"><span>{apis.description}</span> <small><i class="fa fa-edit"></i></small></h4>
								<input id="cid-{apis.cid}-description" data-name="description" placeholder="Category Description" value="{apis.description}" class="form-control category_description input-sm description hide"></input>

								<div class="col-sm-4 col-xs-12">
									<div class="form-group">
										<label for="cid-{apis.cid}-bgColor">Background Colour</label>
										<input id="cid-{apis.cid}-bgColor" placeholder="#0059b2" data-name="bgColor" value="{apis.bgColor}" class="form-control category_bgColor" />
									</div>
								</div>
								<div class="col-sm-4 col-xs-12">
									<div class="form-group">
										<label for="cid-{apis.cid}-color">Text Colour</label>
										<input id="cid-{apis.cid}-color" placeholder="#fff" data-name="color" value="{apis.color}" class="form-control category_color" />
									</div>
								</div>
								<div class="col-sm-4 col-xs-12">
									<div class="form-group">
										<label for="cid-{apis.cid}-class">Custom Class</label>
										<input id="cid-{apis.cid}-class" type="text" class="form-control" placeholder="col-md-6 col-xs-6" data-name="class" value="{apis.class}" />
									</div>
								</div>
								<div class="col-sm-8 col-xs-12">
									<div class="form-group">
										<label for="cid-{apis.cid}-link">Raml Location</label>
										<input id="cid-{apis.cid}-link" type="text" class="form-control" placeholder="http://domain.com/*.raml" data-name="raml_location" value="{apis.raml_location}" />
									</div>
								</div>
								<div class="col-sm-6 col-xs-12">
									<div class="form-group">
										<div class="dropdown">
											<button type="button" class="btn btn-default" data-toggle="dropdown"><i class="fa fa-cogs"></i> Options</button>
											<ul class="dropdown-menu" role="menu">
												<li class="permissions"><a href="#"><i class="fa fa-ban"></i> Access Control</a></li>
												<hr />
												<li data-disabled="{apis.disabled}">
													<!-- IF apis.disabled -->
														<a href="#"><i class="fa fa-power-off"></i> Enable</a>
													<!-- ELSE -->
														<a href="#"><i class="fa fa-power-off"></i> Disable</a>
													<!-- ENDIF apis.disabled -->
												</li>
												<li><a href="#" class="purge"><i class="fa fa-eraser"></i> Purge</a></li>
											</ul>


											<button class="btn btn-primary save">Save</button>

										</div>
									</div>
								</div>

								<input type="hidden" data-name="order" data-value="{apis.order}"></input>
							</div>
						</div>
					</form>
				</div>
			</li>

		<!-- END apis -->
		</ul>


	</div>

	<div id="new-api-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="Add New Modal" aria-hidden="true">
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
					<button type="button" id="create-api-btn" href="#" class="btn btn-primary btn-lg btn-block">Create</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<div id="api-permissions-modal" class="modal permissions-modal fade" tabindex="-1" role="dialog" aria-labelledby="Category Permissions" aria-hidden="true">
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
