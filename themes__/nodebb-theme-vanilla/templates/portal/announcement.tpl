<div class="motd">
	<div widget-area="motd"></div>
</div>

<div class="row home" itemscope itemtype="http://www.schema.org/ItemList">
	<div class="col-lg-9 col-sm-12" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">
		<!-- BEGIN announcements -->
		<div class="{announcements.class}" data-cid="{announcements.cid}" data-numRecentReplies="{announcements.numRecentReplies}">
			<meta itemprop="name" content="{announcements.name}">
			<h4>
				<!-- IF !announcements.link -->
				<span class="badge {announcements.unread-class}">{announcements.topic_count} </span>
				<!-- ENDIF !announcements.link -->

				<!-- IF announcements.link -->
				<a href="{announcements.link}" itemprop="url" target="_blank">
				<!-- ELSE -->
				<a href="{announcements.raml-location}" itemprop="url">
				<!-- ENDIF announcements.link -->
				{announcements.name}
				</a>
			</h4>

			<!-- IF announcements.link -->
			<a style="color: {announcements.color};" href="{announcements.link}" itemprop="url" target="_blank">
			<!-- ELSE -->
			<a style="color: {announcements.color};" href="{announcements.raml_location}" itemprop="url">
			<!-- ENDIF announcements.link -->
				<div
					id="category-{announcements.cid}" class="category-header icon category-header-image-{announcements.imageClass}"
					title="{announcements.description}"
					style="
						<!-- IF announcements.backgroundImage -->background-image: url({announcements.backgroundImage});<!-- ENDIF announcements.backgroundImage -->
						<!-- IF announcements.bgColor -->background-color: {announcements.bgColor};<!-- ENDIF announcements.bgColor -->
					"
				>
					<div id="category-{announcements.cid}" class="category-slider-{announcements.post_count}">
						<!-- IF announcements.icon -->
						<div class="category-box"><i class="fa {announcements.icon} fa-4x"></i></div>
						<!-- ENDIF announcements.icon -->
						<div class="category-box" itemprop="description">{announcements.description}</div>

						<!-- BEGIN posts -->
						<div class="category-box">
							<div class="post-preview">
								<img src="{announcements.posts.user.picture}" class="pull-left" />
								<p class=""><strong>{announcements.posts.user.username}</strong>: {announcements.posts.content}</p>
							</div>
						</div>
						<!-- END posts -->
						<!-- IF announcements.icon -->
						<div class="category-box"><i class="fa {announcements.icon} fa-4x"></i></div>
						<!-- ENDIF announcements.icon -->
					</div>
				</div>
			</a>
		</div>
		<!-- END announcements -->
	</div>

	<div widget-area="sidebar" class="col-lg-3 col-sm-12"></div>
</div>