
<input type="hidden" template-variable="tag" value="{tag}" />

<div class="tag">
	<ol class="breadcrumb">
		<li><a href="{relative_path}/forums">[[global:home]]</a></li>
		<li><a href="{relative_path}/tags">[[tags:tags]]</a></li>
		<li class="active">{tag}</li>
	</ol>

	<!-- IF !topics.length -->
	<div class="alert alert-warning">
		<strong>[[tags:no_tag_topics]]</strong>
	</div>
	<!-- ENDIF !topics.length -->

	<div class="category row">
		<div class="col-md-12">
		<ul id="topics-container" data-nextstart="{nextStart}">
			<!-- BEGIN topics -->
			<li class="category-item<!-- IF topics.deleted --> deleted<!-- ENDIF topics.deleted --><!-- IF topics.unread --> unread<!-- ENDIF topics.unread -->" data-tid="{topics.tid}" data-cid="{topics.cid}">
				<div class="col-md-12 col-xs-12 panel panel-default topic-row">

					<!-- IF showSelect -->
					<i class="fa fa-fw fa-square-o pull-left select pointer"></i>
					<!-- ENDIF showSelect -->

					<a href="{relative_path}/user/{topics.user.userslug}" class="pull-left">
						<img class="img-rounded user-img" src="{topics.user.picture}" title="{topics.user.username}" />
					</a>

					<h3>
						<a href="{relative_path}/topic/{topics.slug}">
							<strong><!-- IF topics.pinned --><i class="fa fa-thumb-tack"></i><!-- ENDIF topics.pinned --> <!-- IF topics.locked --><i class="fa fa-lock"></i><!-- ENDIF topics.locked --></strong>
							<span class="topic-title">{topics.title}</span>
						</a>
					</h3>

					<small>
						<span class="topic-stats">
							[[global:posts]]
							<strong class="human-readable-number" title="{topics.postcount}">{topics.postcount}</strong>
						</span>
						|
						<span class="topic-stats">
							[[global:views]]
							<strong class="human-readable-number" title="{topics.viewcount}">{topics.viewcount}</strong>
						</span>
						|
						<span>
							<!-- IF topics.user.userslug -->
								[[global:posted_in_ago_by, <a href="{relative_path}/category/{topics.category.slug}"><i class="fa {topics.category.icon}"></i> {topics.category.name}</a>, <span class="timeago" title="{topics.relativeTime}"></span>, {topics.user.username}]]
							<!-- ELSE -->
								[[global:posted_in_ago_by_guest, <a href="{relative_path}/category/{topics.category.slug}"><i class="fa {topics.category.icon}"></i> {topics.category.name}</a>, <span class="timeago" title="{topics.relativeTime}"></span>]]
							<!-- ENDIF topics.user.userslug -->
						</span>


						<span class="pull-right">
							<!-- IF topics.unreplied -->
							[[category:no_replies]]
							<!-- ELSE -->
							<a href="<!-- IF topics.teaser.user.userslug -->{relative_path}/user/{topics.teaser.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.teaser.user.userslug -->">
								<img class="teaser-pic" src="{topics.teaser.user.picture}" title="{topics.teaser.user.username}"/>
							</a>
							<a href="{relative_path}/topic/{topics.slug}/{topics.teaser.index}">
								[[global:replied_ago, <span class="timeago" title="{topics.teaser.timestamp}"></span>]]
							</a>
							<!-- ENDIF topics.unreplied -->
						</span>
<!-- IF topics.tags.length -->
	<!-- BEGIN tags -->
		<a href="{relative_path}/tags/{topics.tags.name}"><span class="tag-item" data-tag="{topics.tags.name}">&bull; {topics.tags.name}</span></a>
	<!-- END tags -->
<!-- ENDIF topics.tags.length -->
					</small>
				</div>
			</li>
			<!-- END topics -->
		</ul>
			<button id="load-more-btn" class="btn btn-primary hide">[[unread:load_more]]</button>
		</div>
	</div>
</div>