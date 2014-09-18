

<div class="account-username-box" data-userslug="{userslug}" data-uid="{uid}">
	<ul class="nav nav-pills account-sub-links">
		<li>
			<div class="btn-group">
				<a href="{config.relative_path}/user/{userslug}" class="btn btn-primary" id="profile"><i class="fa fa-user"></i> [[user:profile]]</a>
				<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
					<span class="caret"></span>
					<span class="sr-only">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu pull-right" role="menu">
					<li><a href="{config.relative_path}/user/{userslug}/following"><i class="fa fa-fw fa-users"></i> [[user:following]]</a></li>
					<li><a href="{config.relative_path}/user/{userslug}/followers"><i class="fa fa-fw fa-users"></i> [[user:followers]]</a></li>
					<li class="divider"></li>
					<li><a href="{config.relative_path}/user/{userslug}/topics"><i class="fa fa-fw fa-book"></i> [[global:topics]]</a></li>
					<li><a href="{config.relative_path}/user/{userslug}/posts"><i class="fa fa-fw fa-pencil"></i> [[global:posts]]</a></li>
					<li id="favouritesLink" class="hide"><a href="{config.relative_path}/user/{userslug}/favourites"><i class="fa fa-fw fa-heart"></i> [[user:favourites]]</a></li>
					<!-- BEGIN profile_links -->
					<li id="{profile_links.id}" class="plugin-link <!-- IF profile_links.public -->public<!-- ELSE -->private<!-- ENDIF profile_links.public -->"><a href="{config.relative_path}/user/{userslug}/{profile_links.route}"><i class="fa fa-fw {profile_links.icon}"></i> {profile_links.name}</a></li>
					<!-- END profile_links -->
				</ul>
			</div>
		</li>
		<!-- IF showSettings -->
		<li id="settingsLink"><a href="{config.relative_path}/user/{userslug}/settings"><i class="fa fa-gear"></i> [[user:settings]]</a></li>
		<li id="editLink"><a href="{config.relative_path}/user/{userslug}/edit"><i class="fa fa-pencil-square-o"></i> [[user:edit]]</a></li>
		<!-- ENDIF showSettings -->
	</ul>
</div>

<div class="users account">
	<div>
		<!-- BEGIN following -->
		<div class="users-box">
			<a href="{relative_path}/user/{following.userslug}"><img src="{following.picture}" class="img-thumbnail"/></a>
			<br/>
			<div class="user-info">
				<a href="{relative_path}/user/{following.userslug}">{following.username}</a>
				<br/>
				<div title="reputation" class="reputation">
					<span class='formatted-number'>{following.reputation}</span>
					<i class='fa fa-star'></i>
				</div>
				<div title="post count" class="post-count">
					<span class='formatted-number'>{following.postcount}</span>
					<i class='fa fa-pencil'></i>
				</div>
			</div>
		</div>

		<!-- END following -->
	</div>
	<div id="no-following-notice" class="alert alert-warning hide">[[user:follows_no_one]]</div>
</div>

<input type="hidden" template-variable="yourid" value="{yourid}" />
<input type="hidden" template-variable="theirid" value="{theirid}" />
<input type="hidden" template-variable="followingCount" value="{followingCount}" />
