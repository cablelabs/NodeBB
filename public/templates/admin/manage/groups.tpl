<div class="groups">
	<div class="col-sm-9">
		<div class="panel panel-default">
			<div class="panel-heading"><i class="fa fa-group"></i> Groups List</div>
			<div class="panel-body">	
				<ul id="groups-list">
				<!-- BEGIN groups -->
					<li data-groupname="{groups.name}">
						<div class="row">
							<div class="col-lg-8">
								<h2>
									{groups.name}
									<!-- IF groups.system -->
									<span class="badge">System Group</span>
									<!-- ENDIF groups.system -->
								</h2>
								<p>{groups.description}</p>

								<div class="btn-group">
									<button class="btn btn-default" data-action="members">Edit</button>
									<!-- IF groups.deletable -->
									<button class="btn btn-danger" data-action="delete">Delete Group</button>
									<!-- ENDIF groups.deletable -->
								</div>
							</div>
							<div class="col-lg-4">
								<ul class="pull-right members">
								<!-- BEGIN members --><li data-uid="{groups.members.uid}" data-toggle="tooltip" title="{groups.members.username}"><img src="{groups.members.picture}" /></li><!-- END members -->
								<!-- IF groups.truncated --><li data-toggle="tooltip" title="Total: {groups.memberCount}" class="more"><i class="fa fa-users fa-2x"></i></li><!-- ENDIF groups.truncated -->
								</ul>
							</div>
						</div>
					</li>
				<!-- END groups -->
				</ul>				
			</div>
		</div>
	</div>

	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Groups Control Panel</div>
			<div class="panel-body">
				<div>
					<button class="btn btn-primary" id="create">New Group</button>
				</div>
			</div>
		</div>
	</div>



	<div class="modal fade" id="create-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">Create Group</h4>
				</div>
				<div class="modal-body">
					<div class="alert alert-danger hide" id="create-modal-error"></div>
					<form>
						<div class="form-group">
							<label for="group-name">Group Name</label>
							<input type="text" class="form-control" id="create-group-name" placeholder="Group Name" />
						</div>
						<div class="form-group">
							<label for="group-name">Description</label>
							<input type="text" class="form-control" id="create-group-desc" placeholder="A short description about your group" />
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" id="create-modal-go">Create</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="group-details-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">Manage Group</h4>
				</div>
				<div class="modal-body">
					<div class="alert alert-danger hide" id="create-modal-error"></div>
					<form>
						<div class="form-group">
							<label for="change-group-name">Group Name</label>
							<input type="text" class="form-control" id="change-group-name" placeholder="Group Name" />
						</div>
						<div class="form-group">
							<label for="change-group-desc">Description</label>
							<input type="text" class="form-control" id="change-group-desc" placeholder="A short description about your group" />
						</div>
						<div class="form-group">
							<label for="change-group-user-title">Title of Members</label>
							<input type="text" class="form-control" id="change-group-user-title" placeholder="The title of users if they are a member of this group" />
						</div>
						<div class="form-group">
							<label for="change-group-icon">Group Icon</label><br/>
							<i id="group-icon" class="fa fa-shield fa-2x"></i>
							<button type="button" class="btn btn-default btn-sm" id="change-group-icon" placeholder="">Change Icon</button>
						</div>
						<div class="form-group">
							<label for="change-group-label-color">Group Label Color</label>
							<span id="group-label-preview" class="label label-default"></span>
							<input id="change-group-label-color" placeholder="#0059b2" data-name="bgColor" value="" class="form-control" />
						</div>
						<div class="form-group">
							<label>Members</label>
							<p>Click on a user to remove them from the group</p>
							<ul class="members current_members" id="group-details-members"></ul>
						</div>
						<div class="form-group">
							<label for="add-member">Add User to Group</label>
							<input type="text" class="form-control" id="group-details-search" placeholder="Search Users" />
							<ul class="members" id="group-details-search-results"></ul>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="details-modal-save" data-dismiss="modal">Save</button>
				</div>
			</div>
		</div>
	</div>
</div>

<input type="hidden" template-variable="yourid" value="{yourid}" />

<div id="icons" style="display:none;">
	<div class="icon-container">
		<div class="row fa-icons">
			<i class="fa fa-doesnt-exist"></i>
<i class="fa fa-adjust"></i><i class="fa fa-adn"></i><i class="fa fa-align-center"></i><i class="fa fa-align-justify"></i><i class="fa fa-align-left"></i><i class="fa fa-align-right"></i><i class="fa fa-ambulance"></i><i class="fa fa-anchor"></i><i class="fa fa-android"></i><i class="fa fa-angellist"></i><i class="fa fa-angle-double-down"></i><i class="fa fa-angle-double-left"></i><i class="fa fa-angle-double-right"></i><i class="fa fa-angle-double-up"></i><i class="fa fa-angle-down"></i><i class="fa fa-angle-left"></i><i class="fa fa-angle-right"></i><i class="fa fa-angle-up"></i><i class="fa fa-apple"></i><i class="fa fa-archive"></i><i class="fa fa-area-chart"></i><i class="fa fa-arrow-circle-down"></i><i class="fa fa-arrow-circle-left"></i><i class="fa fa-arrow-circle-o-down"></i><i class="fa fa-arrow-circle-o-left"></i><i class="fa fa-arrow-circle-o-right"></i><i class="fa fa-arrow-circle-o-up"></i><i class="fa fa-arrow-circle-right"></i><i class="fa fa-arrow-circle-up"></i><i class="fa fa-arrow-down"></i><i class="fa fa-arrow-left"></i><i class="fa fa-arrow-right"></i><i class="fa fa-arrow-up"></i><i class="fa fa-arrows"></i><i class="fa fa-arrows-alt"></i><i class="fa fa-arrows-h"></i><i class="fa fa-arrows-v"></i><i class="fa fa-asterisk"></i><i class="fa fa-at"></i><i class="fa fa-backward"></i><i class="fa fa-ban"></i><i class="fa fa-bar-chart"></i><i class="fa fa-barcode"></i><i class="fa fa-bars"></i><i class="fa fa-beer"></i><i class="fa fa-behance"></i><i class="fa fa-behance-square"></i><i class="fa fa-bell"></i><i class="fa fa-bell-o"></i><i class="fa fa-bell-slash"></i><i class="fa fa-bell-slash-o"></i><i class="fa fa-bicycle"></i><i class="fa fa-binoculars"></i><i class="fa fa-birthday-cake"></i><i class="fa fa-bitbucket"></i><i class="fa fa-bitbucket-square"></i><i class="fa fa-bold"></i><i class="fa fa-bolt"></i><i class="fa fa-bomb"></i><i class="fa fa-book"></i><i class="fa fa-bookmark"></i><i class="fa fa-bookmark-o"></i><i class="fa fa-briefcase"></i><i class="fa fa-btc"></i><i class="fa fa-bug"></i><i class="fa fa-building"></i><i class="fa fa-building-o"></i><i class="fa fa-bullhorn"></i><i class="fa fa-bullseye"></i><i class="fa fa-bus"></i><i class="fa fa-calculator"></i><i class="fa fa-calendar"></i><i class="fa fa-calendar-o"></i><i class="fa fa-camera"></i><i class="fa fa-camera-retro"></i><i class="fa fa-car"></i><i class="fa fa-caret-down"></i><i class="fa fa-caret-left"></i><i class="fa fa-caret-right"></i><i class="fa fa-caret-square-o-down"></i><i class="fa fa-caret-square-o-left"></i><i class="fa fa-caret-square-o-right"></i><i class="fa fa-caret-square-o-up"></i><i class="fa fa-caret-up"></i><i class="fa fa-cc"></i><i class="fa fa-cc-amex"></i><i class="fa fa-cc-discover"></i><i class="fa fa-cc-mastercard"></i><i class="fa fa-cc-paypal"></i><i class="fa fa-cc-stripe"></i><i class="fa fa-cc-visa"></i><i class="fa fa-certificate"></i><i class="fa fa-chain-broken"></i><i class="fa fa-check"></i><i class="fa fa-check-circle"></i><i class="fa fa-check-circle-o"></i><i class="fa fa-check-square"></i><i class="fa fa-check-square-o"></i><i class="fa fa-chevron-circle-down"></i><i class="fa fa-chevron-circle-left"></i><i class="fa fa-chevron-circle-right"></i><i class="fa fa-chevron-circle-up"></i><i class="fa fa-chevron-down"></i><i class="fa fa-chevron-left"></i><i class="fa fa-chevron-right"></i><i class="fa fa-chevron-up"></i><i class="fa fa-child"></i><i class="fa fa-circle"></i><i class="fa fa-circle-o"></i><i class="fa fa-circle-o-notch"></i><i class="fa fa-circle-thin"></i><i class="fa fa-clipboard"></i><i class="fa fa-clock-o"></i><i class="fa fa-cloud"></i><i class="fa fa-cloud-download"></i><i class="fa fa-cloud-upload"></i><i class="fa fa-code"></i><i class="fa fa-code-fork"></i><i class="fa fa-codepen"></i><i class="fa fa-coffee"></i><i class="fa fa-cog"></i><i class="fa fa-cogs"></i><i class="fa fa-columns"></i><i class="fa fa-comment"></i><i class="fa fa-comment-o"></i><i class="fa fa-comments"></i><i class="fa fa-comments-o"></i><i class="fa fa-compass"></i><i class="fa fa-compress"></i><i class="fa fa-copyright"></i><i class="fa fa-credit-card"></i><i class="fa fa-crop"></i><i class="fa fa-crosshairs"></i><i class="fa fa-css3"></i><i class="fa fa-cube"></i><i class="fa fa-cubes"></i><i class="fa fa-cutlery"></i><i class="fa fa-database"></i><i class="fa fa-delicious"></i><i class="fa fa-desktop"></i><i class="fa fa-deviantart"></i><i class="fa fa-digg"></i><i class="fa fa-dot-circle-o"></i><i class="fa fa-download"></i><i class="fa fa-dribbble"></i><i class="fa fa-dropbox"></i><i class="fa fa-drupal"></i><i class="fa fa-eject"></i><i class="fa fa-ellipsis-h"></i><i class="fa fa-ellipsis-v"></i><i class="fa fa-empire"></i><i class="fa fa-envelope"></i><i class="fa fa-envelope-o"></i><i class="fa fa-envelope-square"></i><i class="fa fa-eraser"></i><i class="fa fa-eur"></i><i class="fa fa-exchange"></i><i class="fa fa-exclamation"></i><i class="fa fa-exclamation-circle"></i><i class="fa fa-exclamation-triangle"></i><i class="fa fa-expand"></i><i class="fa fa-external-link"></i><i class="fa fa-external-link-square"></i><i class="fa fa-eye"></i><i class="fa fa-eye-slash"></i><i class="fa fa-eyedropper"></i><i class="fa fa-facebook"></i><i class="fa fa-facebook-square"></i><i class="fa fa-fast-backward"></i><i class="fa fa-fast-forward"></i><i class="fa fa-fax"></i><i class="fa fa-female"></i><i class="fa fa-fighter-jet"></i><i class="fa fa-file"></i><i class="fa fa-file-archive-o"></i><i class="fa fa-file-audio-o"></i><i class="fa fa-file-code-o"></i><i class="fa fa-file-excel-o"></i><i class="fa fa-file-image-o"></i><i class="fa fa-file-o"></i><i class="fa fa-file-pdf-o"></i><i class="fa fa-file-powerpoint-o"></i><i class="fa fa-file-text"></i><i class="fa fa-file-text-o"></i><i class="fa fa-file-video-o"></i><i class="fa fa-file-word-o"></i><i class="fa fa-files-o"></i><i class="fa fa-film"></i><i class="fa fa-filter"></i><i class="fa fa-fire"></i><i class="fa fa-fire-extinguisher"></i><i class="fa fa-flag"></i><i class="fa fa-flag-checkered"></i><i class="fa fa-flag-o"></i><i class="fa fa-flask"></i><i class="fa fa-flickr"></i><i class="fa fa-floppy-o"></i><i class="fa fa-folder"></i><i class="fa fa-folder-o"></i><i class="fa fa-folder-open"></i><i class="fa fa-folder-open-o"></i><i class="fa fa-font"></i><i class="fa fa-forward"></i><i class="fa fa-foursquare"></i><i class="fa fa-frown-o"></i><i class="fa fa-futbol-o"></i><i class="fa fa-gamepad"></i><i class="fa fa-gavel"></i><i class="fa fa-gbp"></i><i class="fa fa-gift"></i><i class="fa fa-git"></i><i class="fa fa-git-square"></i><i class="fa fa-github"></i><i class="fa fa-github-alt"></i><i class="fa fa-github-square"></i><i class="fa fa-gittip"></i><i class="fa fa-glass"></i><i class="fa fa-globe"></i><i class="fa fa-google"></i><i class="fa fa-google-plus"></i><i class="fa fa-google-plus-square"></i><i class="fa fa-google-wallet"></i><i class="fa fa-graduation-cap"></i><i class="fa fa-h-square"></i><i class="fa fa-hacker-news"></i><i class="fa fa-hand-o-down"></i><i class="fa fa-hand-o-left"></i><i class="fa fa-hand-o-right"></i><i class="fa fa-hand-o-up"></i><i class="fa fa-hdd-o"></i><i class="fa fa-header"></i><i class="fa fa-headphones"></i><i class="fa fa-heart"></i><i class="fa fa-heart-o"></i><i class="fa fa-history"></i><i class="fa fa-home"></i><i class="fa fa-hospital-o"></i><i class="fa fa-html5"></i><i class="fa fa-ils"></i><i class="fa fa-inbox"></i><i class="fa fa-indent"></i><i class="fa fa-info"></i><i class="fa fa-info-circle"></i><i class="fa fa-inr"></i><i class="fa fa-instagram"></i><i class="fa fa-ioxhost"></i><i class="fa fa-italic"></i><i class="fa fa-joomla"></i><i class="fa fa-jpy"></i><i class="fa fa-jsfiddle"></i><i class="fa fa-key"></i><i class="fa fa-keyboard-o"></i><i class="fa fa-krw"></i><i class="fa fa-language"></i><i class="fa fa-laptop"></i><i class="fa fa-lastfm"></i><i class="fa fa-lastfm-square"></i><i class="fa fa-leaf"></i><i class="fa fa-lemon-o"></i><i class="fa fa-level-down"></i><i class="fa fa-level-up"></i><i class="fa fa-life-ring"></i><i class="fa fa-lightbulb-o"></i><i class="fa fa-line-chart"></i><i class="fa fa-link"></i><i class="fa fa-linkedin"></i><i class="fa fa-linkedin-square"></i><i class="fa fa-linux"></i><i class="fa fa-list"></i><i class="fa fa-list-alt"></i><i class="fa fa-list-ol"></i><i class="fa fa-list-ul"></i><i class="fa fa-location-arrow"></i><i class="fa fa-lock"></i><i class="fa fa-long-arrow-down"></i><i class="fa fa-long-arrow-left"></i><i class="fa fa-long-arrow-right"></i><i class="fa fa-long-arrow-up"></i><i class="fa fa-magic"></i><i class="fa fa-magnet"></i><i class="fa fa-male"></i><i class="fa fa-map-marker"></i><i class="fa fa-maxcdn"></i><i class="fa fa-meanpath"></i><i class="fa fa-medkit"></i><i class="fa fa-meh-o"></i><i class="fa fa-microphone"></i><i class="fa fa-microphone-slash"></i><i class="fa fa-minus"></i><i class="fa fa-minus-circle"></i><i class="fa fa-minus-square"></i><i class="fa fa-minus-square-o"></i><i class="fa fa-mobile"></i><i class="fa fa-money"></i><i class="fa fa-moon-o"></i><i class="fa fa-music"></i><i class="fa fa-newspaper-o"></i><i class="fa fa-openid"></i><i class="fa fa-outdent"></i><i class="fa fa-pagelines"></i><i class="fa fa-paint-brush"></i><i class="fa fa-paper-plane"></i><i class="fa fa-paper-plane-o"></i><i class="fa fa-paperclip"></i><i class="fa fa-paragraph"></i><i class="fa fa-pause"></i><i class="fa fa-paw"></i><i class="fa fa-paypal"></i><i class="fa fa-pencil"></i><i class="fa fa-pencil-square"></i><i class="fa fa-pencil-square-o"></i><i class="fa fa-phone"></i><i class="fa fa-phone-square"></i><i class="fa fa-picture-o"></i><i class="fa fa-pie-chart"></i><i class="fa fa-pied-piper"></i><i class="fa fa-pied-piper-alt"></i><i class="fa fa-pinterest"></i><i class="fa fa-pinterest-square"></i><i class="fa fa-plane"></i><i class="fa fa-play"></i><i class="fa fa-play-circle"></i><i class="fa fa-play-circle-o"></i><i class="fa fa-plug"></i><i class="fa fa-plus"></i><i class="fa fa-plus-circle"></i><i class="fa fa-plus-square"></i><i class="fa fa-plus-square-o"></i><i class="fa fa-power-off"></i><i class="fa fa-print"></i><i class="fa fa-puzzle-piece"></i><i class="fa fa-qq"></i><i class="fa fa-qrcode"></i><i class="fa fa-question"></i><i class="fa fa-question-circle"></i><i class="fa fa-quote-left"></i><i class="fa fa-quote-right"></i><i class="fa fa-random"></i><i class="fa fa-rebel"></i><i class="fa fa-recycle"></i><i class="fa fa-reddit"></i><i class="fa fa-reddit-square"></i><i class="fa fa-refresh"></i><i class="fa fa-renren"></i><i class="fa fa-repeat"></i><i class="fa fa-reply"></i><i class="fa fa-reply-all"></i><i class="fa fa-retweet"></i><i class="fa fa-road"></i><i class="fa fa-rocket"></i><i class="fa fa-rss"></i><i class="fa fa-rss-square"></i><i class="fa fa-rub"></i><i class="fa fa-scissors"></i><i class="fa fa-search"></i><i class="fa fa-search-minus"></i><i class="fa fa-search-plus"></i><i class="fa fa-share"></i><i class="fa fa-share-alt"></i><i class="fa fa-share-alt-square"></i><i class="fa fa-share-square"></i><i class="fa fa-share-square-o"></i><i class="fa fa-shield"></i><i class="fa fa-shopping-cart"></i><i class="fa fa-sign-in"></i><i class="fa fa-sign-out"></i><i class="fa fa-signal"></i><i class="fa fa-sitemap"></i><i class="fa fa-skype"></i><i class="fa fa-slack"></i><i class="fa fa-sliders"></i><i class="fa fa-slideshare"></i><i class="fa fa-smile-o"></i><i class="fa fa-sort"></i><i class="fa fa-sort-alpha-asc"></i><i class="fa fa-sort-alpha-desc"></i><i class="fa fa-sort-amount-asc"></i><i class="fa fa-sort-amount-desc"></i><i class="fa fa-sort-asc"></i><i class="fa fa-sort-desc"></i><i class="fa fa-sort-numeric-asc"></i><i class="fa fa-sort-numeric-desc"></i><i class="fa fa-soundcloud"></i><i class="fa fa-space-shuttle"></i><i class="fa fa-spinner"></i><i class="fa fa-spoon"></i><i class="fa fa-spotify"></i><i class="fa fa-square"></i><i class="fa fa-square-o"></i><i class="fa fa-stack-exchange"></i><i class="fa fa-stack-overflow"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i><i class="fa fa-steam"></i><i class="fa fa-steam-square"></i><i class="fa fa-step-backward"></i><i class="fa fa-step-forward"></i><i class="fa fa-stethoscope"></i><i class="fa fa-stop"></i><i class="fa fa-strikethrough"></i><i class="fa fa-stumbleupon"></i><i class="fa fa-stumbleupon-circle"></i><i class="fa fa-subscript"></i><i class="fa fa-suitcase"></i><i class="fa fa-sun-o"></i><i class="fa fa-superscript"></i><i class="fa fa-table"></i><i class="fa fa-tablet"></i><i class="fa fa-tachometer"></i><i class="fa fa-tag"></i><i class="fa fa-tags"></i><i class="fa fa-tasks"></i><i class="fa fa-taxi"></i><i class="fa fa-tencent-weibo"></i><i class="fa fa-terminal"></i><i class="fa fa-text-height"></i><i class="fa fa-text-width"></i><i class="fa fa-th"></i><i class="fa fa-th-large"></i><i class="fa fa-th-list"></i><i class="fa fa-thumb-tack"></i><i class="fa fa-thumbs-down"></i><i class="fa fa-thumbs-o-down"></i><i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-up"></i><i class="fa fa-ticket"></i><i class="fa fa-times"></i><i class="fa fa-times-circle"></i><i class="fa fa-times-circle-o"></i><i class="fa fa-tint"></i><i class="fa fa-toggle-off"></i><i class="fa fa-toggle-on"></i><i class="fa fa-trash"></i><i class="fa fa-trash-o"></i><i class="fa fa-tree"></i><i class="fa fa-trello"></i><i class="fa fa-trophy"></i><i class="fa fa-truck"></i><i class="fa fa-try"></i><i class="fa fa-tty"></i><i class="fa fa-tumblr"></i><i class="fa fa-tumblr-square"></i><i class="fa fa-twitch"></i><i class="fa fa-twitter"></i><i class="fa fa-twitter-square"></i><i class="fa fa-umbrella"></i><i class="fa fa-underline"></i><i class="fa fa-undo"></i><i class="fa fa-university"></i><i class="fa fa-unlock"></i><i class="fa fa-unlock-alt"></i><i class="fa fa-upload"></i><i class="fa fa-usd"></i><i class="fa fa-user"></i><i class="fa fa-user-md"></i><i class="fa fa-users"></i><i class="fa fa-video-camera"></i><i class="fa fa-vimeo-square"></i><i class="fa fa-vine"></i><i class="fa fa-vk"></i><i class="fa fa-volume-down"></i><i class="fa fa-volume-off"></i><i class="fa fa-volume-up"></i><i class="fa fa-weibo"></i><i class="fa fa-weixin"></i><i class="fa fa-wheelchair"></i><i class="fa fa-wifi"></i><i class="fa fa-windows"></i><i class="fa fa-wordpress"></i><i class="fa fa-wrench"></i><i class="fa fa-xing"></i><i class="fa fa-xing-square"></i><i class="fa fa-yahoo"></i><i class="fa fa-yelp"></i><i class="fa fa-youtube"></i><i class="fa fa-youtube-play"></i><i class="fa fa-youtube-square"></i>
		</div>
	</div>
</div>
