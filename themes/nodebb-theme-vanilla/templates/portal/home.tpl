<div class="motd">
	<div widget-area="motd"></div>
</div>

<div class="row home" itemscope itemtype="http://www.schema.org/ItemList">
	<div class="col-lg-9 col-sm-12" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">
		<!-- BEGIN apis -->
		<div class="{apis.class}" data-cid="{apis.cid}" data-numRecentReplies="{apis.numRecentReplies}">
			<meta itemprop="name" content="{apis.name}">
			<h4>
				<!-- IF !apis.link -->
				<span class="badge {apis.unread-class}">{apis.topic_count} </span>
				<!-- ENDIF !apis.link -->

				<!-- IF apis.link -->
				<a href="{apis.link}" itemprop="url" target="_blank">
				<!-- ELSE -->
				<a href="{apis.raml-location}" itemprop="url">
				<!-- ENDIF apis.link -->
				{apis.name}
				</a>
			</h4>

			<!-- IF apis.link -->
			<a style="color: {apis.color};" href="{apis.link}" itemprop="url" target="_blank">
			<!-- ELSE -->
			<a style="color: {apis.color};" href="{apis.raml-location}" itemprop="url">
			<!-- ENDIF apis.link -->
				<div
					id="category-{apis.cid}" class="category-header icon category-header-image-{apis.imageClass}"
					title="{apis.description}"
					style="
						<!-- IF apis.backgroundImage -->background-image: url({apis.backgroundImage});<!-- ENDIF apis.backgroundImage -->
						<!-- IF apis.bgColor -->background-color: {apis.bgColor};<!-- ENDIF apis.bgColor -->
					"
				>
					<div id="category-{apis.cid}" class="category-slider-{apis.post_count}">
						<!-- IF apis.icon -->
						<div class="category-box"><i class="fa {apis.icon} fa-4x"></i></div>
						<!-- ENDIF apis.icon -->
						<div class="category-box" itemprop="description">{apis.description}</div>

						<!-- BEGIN posts -->
						<div class="category-box">
							<div class="post-preview">
								<img src="{apis.posts.user.picture}" class="pull-left" />
								<p class=""><strong>{apis.posts.user.username}</strong>: {apis.posts.content}</p>
							</div>
						</div>
						<!-- END posts -->
						<!-- IF apis.icon -->
						<div class="category-box"><i class="fa {apis.icon} fa-4x"></i></div>
						<!-- ENDIF apis.icon -->
					</div>
				</div>
			</a>
		</div>
		<!-- END apis -->
	</div>

	<div widget-area="sidebar" class="col-lg-3 col-sm-12"></div>
</div>