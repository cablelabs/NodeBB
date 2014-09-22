<input type="hidden" template-variable="topic_id" value="{tid}" />
<input type="hidden" template-variable="topic_slug" value="{slug}" />
<input type="hidden" template-variable="category_id" value="{category.cid}" />
<input type="hidden" template-variable="currentPage" value="{currentPage}" />
<input type="hidden" template-variable="pageCount" value="{pageCount}" />
<input type="hidden" template-variable="locked" template-type="boolean" value="{locked}" />
<input type="hidden" template-variable="deleted" template-type="boolean" value="{deleted}" />
<input type="hidden" template-variable="pinned" template-type="boolean" value="{pinned}" />
<input type="hidden" template-variable="topic_name" value="{title}" />
<input type="hidden" template-variable="postcount" value="{postcount}" />
<input type="hidden" template-variable="viewcount" value="{viewcount}" />

<div class="topic">
	<ol class="breadcrumb">
		<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
			<a href="{relative_path}/" itemprop="url"><span itemprop="title">[[global:home]]</span></a>
		</li>
		<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
			<a href="{relative_path}/category/{category.slug}" itemprop="url"><span itemprop="title">{category.name}</span></a>
		</li>
		<li class="active" itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb">
			<span itemprop="title">{title} <!-- IF !feeds:disableRSS --><a target="_blank" href="{relative_path}/topic/{tid}.rss"><i class="fa fa-rss-square"></i></a><!-- ENDIF !feeds:disableRSS --></span>
		</li>
		<div class="loading-indicator pull-right" done="0" style="display:none;">
			<i class="fa fa-refresh fa-spin"></i>
		</div>
	</ol>

	<ul id="post-container" class="posts" data-tid="{tid}">
		<!-- BEGIN posts -->
			<li class="post-row<!-- IF posts.deleted --> deleted<!-- ENDIF posts.deleted -->" data-pid="{posts.pid}" data-uid="{posts.uid}" data-username="{posts.user.username}" data-userslug="{posts.user.userslug}" data-index="{posts.index}" data-timestamp="{posts.timestamp}" data-votes="{posts.votes}" itemscope itemtype="http://schema.org/Comment">
				<a id="post_anchor_{posts.index}" name="{posts.index}"></a>

				<meta itemprop="datePublished" content="{posts.relativeTime}">
				<meta itemprop="dateModified" content="{posts.relativeEditTime}">

				<div class="col-md-1 profile-image-block hidden-xs hidden-sm sub-post">
					<a href="<!-- IF posts.user.userslug -->{relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->">
						<img src="{posts.user.picture}" align="left" class="img-thumbnail" itemprop="image" />
						<!-- IF posts.user.banned -->
						<span class="label label-danger">[[topic:banned]]</span>
						<!-- ENDIF posts.user.banned -->
					</a>
				</div>

				<div class="col-md-11 panel panel-default post-block topic-item">

					<a class="main-post avatar" href="<!-- IF posts.user.userslug -->{relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->">
						<img itemprop="image" src="{posts.user.picture}" align="left" class="img-thumbnail" width=150 height=150 />
					</a>
					<h3 class="main-post">
						<p id="topic_title_{posts.pid}" class="topic-title" itemprop="name"><i class="fa fa-thumb-tack hide"></i> <i class="fa fa-lock hide"></i> {title}</p>
					</h3>

					<div class="topic-buttons">

						<div class="btn-group">

							<button class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" type="button" title="<!-- IF posts.user.userslug -->[[topic:posted_by, {posts.user.username}]]<!-- ELSE -->[[topic:posted_by_guest]]<!-- ENDIF posts.user.userslug -->">
								<i class="fa fa-circle status offline"></i>
								<span class="visible-xs-inline visible-md-inline"><img class="" src="{posts.picture}" width=18 height=18 />&nbsp;</span>
								<span class="username-field" href="<!-- IF posts.user.userslug -->{relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->" itemprop="author" data-username="{posts.username}">{posts.user.username}&nbsp;</span>
								<span class="caret"></span>
							</button>

						    <ul class="dropdown-menu">
								<li><a href="<!-- IF posts.user.userslug -->{relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->"><i class="fa fa-user"></i> [[topic:profile]]</a></li>
								<!-- IF !posts.selfPost -->
								<!-- IF posts.user.userslug -->
								<li><a href="#" class="chat"><i class="fa fa-comment"></i> [[topic:chat]]</a></li>
								<!-- ENDIF posts.user.userslug -->
								<!-- ENDIF !posts.selfPost -->
						    </ul>
						</div>

						<div class="btn-group">
							<button class="btn btn-sm btn-default follow hide" type="button" title="[[topic:notify_me]]"><i class="fa fa-eye"></i></button>
							<!-- IF !posts.selfPost -->
							<button class="btn btn-sm btn-default flag" type="button" title="[[topic:flag_title]]"><i class="fa fa-flag-o"></i></button>
							<!-- ENDIF !posts.selfPost -->
							<button data-favourited="{posts.favourited}" class="favourite favourite-tooltip btn btn-sm btn-default <!-- IF posts.favourited --> btn-warning <!-- ENDIF posts.favourited -->" type="button">
								<span class="favourite-text">[[topic:favourite]]</span>
								<span class="favouriteCount" data-favourites="{posts.reputation}">{posts.reputation}</span>&nbsp;
								<!-- IF posts.favourited -->
								<i class="fa fa-star"></i>
								<!-- ELSE -->
								<i class="fa fa-star-o"></i>
								<!-- ENDIF posts.favourited -->
							</button>
						</div>

						<!-- IF !reputation:disabled -->
						<div class="btn-group">
							<button class="upvote btn btn-sm btn-default <!-- IF posts.upvoted --> upvoted btn-primary <!-- ENDIF posts.upvoted -->">
								<i class="fa fa-chevron-up"></i>
							</button>
							<button class="votes btn btn-sm btn-default" data-votes="{posts.votes}" disabled>{posts.votes}</button>
							<button class="downvote btn btn-sm btn-default <!-- IF posts.downvoted --> downvoted btn-primary <!-- ENDIF posts.downvoted -->">
								<i class="fa fa-chevron-down"></i>
							</button>
						</div>
						<!-- ENDIF !reputation:disabled -->

						<!-- IF privileges.topics:reply -->
						<div class="btn-group">
							<button class="btn btn-sm btn-default quote" type="button" title="[[topic:quote]]"><i class="fa fa-quote-left"></i></button>
							<button class="btn btn-sm btn-primary btn post_reply" type="button">[[topic:reply]] <i class="fa fa-reply"></i></button>
						</div>
						<!-- ENDIF privileges.topics:reply -->

						<div class="pull-right">
							<div class="btn-group post-tools">
								<div class="dropdown share-dropdown pull-right">
									<button title="[[topic:share]]"class="btn btn-sm btn-default share" data-toggle="dropdown" href="#"><i class="fa fa-share-square-o"></i></button>

<ul class="dropdown-menu pull-right" role="menu">

	<li role="presentation" class="dropdown-header">[[category:share_this_category]]</li>
	<!-- IF !config.disableSocialButtons -->
	<li role="presentation">
		<a role="menuitem" class="facebook-share" tabindex="-1" href="#"><span class="menu-icon"><i class="fa fa-facebook"></i></span> Facebook</a>
	</li>
	<li role="presentation">
		<a role="menuitem" class="twitter-share" tabindex="-1" href="#"><span class="menu-icon"><i class="fa fa-twitter"></i></span> Twitter</a>
	</li>
	<li role="presentation">
		<a role="menuitem" class="google-share" tabindex="-1" href="#"><span class="menu-icon"><i class="fa fa-google-plus"></i></span> Google+</a>
	</li>
	<!-- ENDIF !config.disableSocialButtons -->
	<li class="text-center">
		<input id="category-link" type="text" value="" class="form-control post-link inline-block"></input>
	</li>
</ul>
								</div>
							</div>

							<!-- IF posts.display_moderator_tools -->
							<div class="btn-group post-tools">
								<div class="dropdown">
									<button title="[[topic:tools]]" class="btn btn-sm btn-default" data-toggle="dropdown" href="#"><i class="fa fa-gear"></i></button>
									<ul class="dropdown-menu text-center pull-right" role="menu" aria-labelledby="dLabel">
										<button class="btn btn-sm btn-default edit" type="button" title="[[topic:edit]]"><i class="fa fa-pencil"></i></button>
										<button class="btn btn-sm btn-default delete" type="button" title="[[topic:delete]]"><i class="fa fa-trash-o"></i></button>
										<button class="btn btn-sm btn-default purge <!-- IF !posts.deleted -->none<!-- ENDIF !posts.deleted -->" type="button" title="[[topic:purge]]"><i class="fa fa-eraser"></i></button>

										<!-- IF posts.display_move_tools -->
										<button class="btn btn-sm btn-default move" type="button" title="[[topic:move]]"><i class="fa fa-arrows"></i></button>
										<!-- ENDIF posts.display_move_tools -->
									</ul>
								</div>
							</div>
							<!-- ENDIF posts.display_moderator_tools -->
						</div>
					</div>

					<div id="content_{posts.pid}" class="post-content" itemprop="text">{posts.content}</div>
					<!-- IF posts.user.signature -->
					<div class="post-signature">{posts.user.signature}</div>
					<!-- ENDIF posts.user.signature -->

					<div class="post-info">
						<span class="pull-right">
							[[global:posted_ago, <span class="timeago" title="{posts.relativeTime}"></span>]]
							<!-- IF posts.editor.username -->
							<span>| [[global:last_edited_by_ago, <strong><a href="{relative_path}/user/{posts.editor.userslug}">{posts.editor.username}</a></strong>, <span class="timeago" title="{posts.relativeEditTime}"></span>]]</span>
							<!-- ENDIF posts.editor.username -->
						</span>
						<span class="pull-left">
							[[global:reputation]]: <i class='fa fa-star'></i> <span data-reputation="{posts.user.reputation}" data-uid="{posts.uid}" class='formatted-number reputation'>{posts.user.reputation}</span>&nbsp;|&nbsp;[[global:posts]]: <i class='fa fa-pencil'></i> <span class='formatted-number user_postcount_{posts.uid}'>{posts.user.postcount}</span>
							<!-- IF posts.user.custom_profile_info.length -->
								<!-- BEGIN custom_profile_info -->
								| {posts.user.custom_profile_info.content}
								<!-- END custom_profile_info -->
							<!-- ENDIF posts.user.custom_profile_info.length -->
						</span>
						<div style="clear:both;"></div>
					</div>
				</div>
				<div style="clear:both;"></div>
			</li>

			<!-- IF !posts.index -->
			<li class="well post-bar" data-index="{posts.index}">
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
			</li>
			<!-- ENDIF !posts.index -->
		<!-- END posts -->
	</ul>

	<div class="well col-md-11 col-xs-12 pull-right post-bar bottom-post-bar hide">
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
	</div>

	<!-- IF config.usePagination -->
	<div class="text-center">
		<ul class="pagination">
			<li class="previous pull-left"><a href="#"><i class="fa fa-chevron-left"></i> [[global:previouspage]]</a></li>
			<li class="next pull-right"><a href="#">[[global:nextpage]] <i class="fa fa-chevron-right"></i></a></li>
		</ul>
	</div>
	<!-- ENDIF config.usePagination -->

<div id="move_thread_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="Move Topic" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h3>[[topic:move_topic]]</h3>
			</div>
			<div class="modal-body">
				<p id="categories-loading"><i class="fa fa-spin fa-refresh"></i> [[topic:load_categories]]</p>
				<ul class="category-list"></ul>
				<p>
					[[topic:disabled_categories_note]]
				</p>
				<div id="move-confirm" style="display: none;">
					<hr />
					<div class="alert alert-info">[[topic:topic_will_be_moved_to]] <strong><span id="confirm-category-name"></span></strong></div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="move_thread_cancel">[[global:buttons.close]]</button>
				<button type="button" class="btn btn-primary" id="move_thread_commit" disabled>[[topic:confirm_move]]</button>
			</div>
		</div>
	</div>
</div>
<div id="fork-thread-modal" class="hide" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="none">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4>[[topic:fork_topic]]</h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="title">Title</label>
					<input id="fork-title" type="text" class="form-control" placeholder="Enter new thread title"><br/>
					<label>[[topic:fork_topic_instruction]]</label> <br/>
					<span id="fork-pids"></span>
				</div>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="fork_thread_cancel">[[global:buttons.close]]</button>
				<button type="button" class="btn btn-primary" id="fork_thread_commit" disabled>[[topic:confirm_fork]]</button>
			</div>
		</div>
	</div>
</div>
<div id="move-post-modal" class="hide" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="none">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4>[[topic:move_post]]</h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="topicId">Topic ID</label>
					<input id="topicId" type="text" class="form-control" placeholder="Enter topic ID"><br/>
				</div>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="move_post_cancel">[[global:buttons.close]]</button>
				<button type="button" class="btn btn-primary" id="move_post_commit" disabled>[[topic:confirm_move]]</button>
			</div>
		</div>
	</div>
</div>

</div>

<div widget-area="footer" class="col-xs-12"></div>

	<noscript>
		<div class="text-center">
			<ul class="pagination">
				<!-- BEGIN pages -->
				<li <!-- IF pages.active -->class="active"<!-- ENDIF pages.active -->><a href="?page={pages.page}">{pages.page}</a></li>
				<!-- END pages -->
			</ul>
		</div>
	</noscript>