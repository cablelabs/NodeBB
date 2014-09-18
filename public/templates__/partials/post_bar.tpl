<div class="inline-block">

	<span class="tags">
	<!-- BEGIN tags -->
	<a href="{relative_path}/tags/{tags.name}"><span class="tag-item" data-tag="{tags.name}">&bull; {tags.name}</span></a>
	<!-- END tags -->
	</span>

	<!-- IF tags.length -->
	<span>|</span>
	<!-- ENDIF tags.length -->

	<small class="topic-stats">
		<span>[[global:posts]]</span>
		<strong><span class="topic-post-count" class="human-readable-number" title="{postcount}">{postcount}</span></strong> |
		<span>[[global:views]]</span>
		<strong><span class="human-readable-number" title="{viewcount}">{viewcount}</span></strong> |
		<span>[[category:browsing]]</span>
	</small>
	<div class="thread_active_users active-users inline-block"></div>
</div>

<div class="topic-main-buttons pull-right inline-block">
	<div class="loading-indicator" done="0" style="display:none;">
		<span class="hidden-xs-inline">[[topic:loading_more_posts]]</span> <i class="fa fa-refresh fa-spin"></i>
	</div>
	<!-- IF privileges.topics:reply -->
	<button class="btn btn-primary post_reply" type="button">[[topic:reply]]</button>
	<!-- ELSE -->
		<!-- IF !loggedIn -->
		<a href="/login?next=topic/{slug}" class="btn btn-primary">[[topic:reply]]</a>
		<!-- ENDIF !loggedIn -->
	<!-- ENDIF privileges.topics:reply -->



<!-- IF loggedIn -->
<div class="btn-group thread-sort dropup">
	<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">[[topic:sort_by]] <span class="caret"></span></button>
	<ul class="dropdown-menu pull-right">
		<li><a href="#" class="oldest_to_newest" data-sort="oldest_to_newest"><i class="fa fa-fw"></i> [[topic:oldest_to_newest]]</a></li>
		<li><a href="#" class="newest_to_oldest" data-sort="newest_to_oldest"><i class="fa fa-fw"></i> [[topic:newest_to_oldest]]</a></li>
		<li><a href="#" class="most_votes" data-sort="most_votes"><i class="fa fa-fw"></i> [[topic:most_votes]]</a></li>
	</ul>
</div>
<!-- ENDIF loggedIn -->



<!-- IF privileges.view_thread_tools -->
<div class="btn-group thread-tools dropup">
	<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">[[topic:thread_tools.title]] <span class="caret"></span></button>
	<ul class="dropdown-menu pull-right">
		<!-- IF privileges.editable -->
		<li><a href="#" class="markAsUnreadForAll"><i class="fa fa-fw fa-inbox"></i> [[topic:thread_tools.markAsUnreadForAll]]</a></li>
		<li><a href="#" class="pin_thread"><i class="fa fa-fw fa-thumb-tack"></i> [[topic:thread_tools.pin]]</a></li>
		<li><a href="#" class="lock_thread"><i class="fa fa-fw fa-lock"></i> [[topic:thread_tools.lock]]</a></li>
		<li class="divider"></li>
		<li><a href="#" class="move_thread"><i class="fa fa-fw fa-arrows"></i> [[topic:thread_tools.move]]</a></li>
		<li><a href="#" class="fork_thread"><i class="fa fa-fw fa-code-fork"></i> [[topic:thread_tools.fork]]</a></li>
		<li class="divider"></li>
		<!-- ENDIF privileges.editable -->

		<!-- IF privileges.deletable -->
		<li><a href="#" class="delete_thread"><span class="text-error"><i class="fa fa-fw fa-trash-o"></i> [[topic:thread_tools.delete]]</span></a></li>
		<li><a href="#" class="purge_thread <!-- IF !deleted -->none<!-- ENDIF !deleted -->"><span class="text-error"><i class="fa fa-fw fa-eraser"></i> [[topic:thread_tools.purge]]</span></a></li>
		<!-- ENDIF privileges.deletable -->

		<!-- IF privileges.editable -->
		<!-- BEGIN thread_tools -->
		<li>
			<a href="#" class="{thread_tools.class}"><i class="fa fa-fw {thread_tools.icon}"></i> {thread_tools.title}</a>
		</li>
		<!-- END thread_tools -->
		<!-- ENDIF privileges.editable -->
	</ul>
</div>
<!-- ENDIF privileges.view_thread_tools -->
</div>
<div style="clear:both;"></div>