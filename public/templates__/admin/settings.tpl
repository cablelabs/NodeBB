<h1><i class="fa fa-cogs"></i> Settings</h1>
<hr />

<ul id="settings-tab" class="nav nav-tabs">
	<li class="active"><a href="#general" data-toggle="tab">General</a></li>
	<li><a href="#reputation" data-toggle="tab">Reputation</a></li>
	<li><a href="#email" data-toggle="tab">Email</a></li>
	<li><a href="#user" data-toggle="tab">User</a></li>
	<li><a href="#post" data-toggle="tab">Post</a></li>
	<li><a href="#pagination" data-toggle="tab">Pagination</a></li>
	<li><a href="#tags" data-toggle="tab">Tags</a></li>
	<li><a href="#web-crawler" data-toggle="tab">Web Crawler</a></li>
	<li><a href="#sockets" data-toggle="tab">Sockets</a></li>
	<li><a href="#advanced" data-toggle="tab">Advanced</a></li>
</ul>

<div class="tab-content">
	<div class="tab-pane active" id="general">
		<div class="alert alert-warning">
			<form>
				<label>Site Title</label>
				<input class="form-control" type="text" placeholder="Your Community Name" data-field="title" />

				<div class="checkbox">
					<label for="showSiteTitle">
						<input type="checkbox" id="showSiteTitle" data-field="showSiteTitle" name="showSiteTitle" /> Show Site Title in Header
					</label>
				</div>

				<label>Browser Title</label>
				<input class="form-control" type="text" placeholder="Browser Title" data-field="browserTitle" />
				<p class="help-block">
					If no browser title is specified, the site title will be used
				</p>

				<label>Site Description</label>
				<input type="text" class="form-control" placeholder="A short description about your community" data-field="description" /><br />

				<label>Site Keywords</label>
				<input type="text" class="form-control" placeholder="Keywords describing your community, comma-seperated" data-field="keywords" /><br />

				<label>Site Logo</label>
				<input id="logoUrl" type="text" class="form-control" placeholder="Path to a logo to display on forum header" data-field="brand:logo" /><br />
				<input data-action="upload" data-target="logoUrl" data-route="{relative_path}/admin/uploadlogo" type="button" class="btn btn-default" value="Upload Logo"></input> <br /> <br/>

				<label>Favicon</label><br />
				<input id="faviconUrl" type="text" class="form-control" placeholder="favicon.ico" data-field="brand:favicon" /><br />
				<input data-action="upload" data-target="faviconUrl" data-route="{relative_path}/admin/uploadfavicon" type="button" class="btn btn-default" value="Upload"></input> <br /> <br/>

				<hr/>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="allowGuestSearching"> <strong>Allow guests to search without logging in</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="useOutgoingLinksPage"> <strong>Use Outgoing Links Warning Page</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="disableSocialButtons"> <strong>Disable social buttons</strong>
					</label>
				</div>
			</form>
		</div>
	</div>
	<div class="tab-pane" id="email">
		<form>
			<div class="alert alert-warning">
				<div>
					<p>
						Please ensure that you have installed a third-party emailer (e.g. PostageApp, Mailgun, Mandrill, SendGrid, etc), otherwise emails will not be sent by NodeBB
					</p>
					<div class="form-group">
						<label for="email:from"><strong>Email Address</strong></label>
						<p class="help-block">
							The following email address refers to the email that the recipient will see in the "From" and "Reply To" fields.
						</p>
						<input type="text" class="form-control input-lg" id="email:from" data-field="email:from" placeholder="info@example.org" /><br />
					</div>
					<button class="btn btn-block btn-default" type="button" data-action="email.test">Send Test Email</button>
					<p class="help-block">
						The test email will be sent to the currently logged in user's email address.
					</p>
				</div>
			</div>
			<div class="alert alert-warning">
				<div class="checkbox">
					<label for="disableEmailSubscriptions">
						<input type="checkbox" id="disableEmailSubscriptions" data-field="disableEmailSubscriptions" name="disableEmailSubscriptions" /> Disable subscriber notification emails
					</label>
				</div>
			</div>
		</form>
	</div>
	<div class="tab-pane" id="user">
		<form role="form">
			<div class="alert alert-warning">
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="allowRegistration" checked> <strong>Allow registration</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="allowLocalLogin" checked> <strong>Allow local login</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="privateUserInfo"> <strong>Make user info private</strong>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="requireEmailConfirmation"> <strong>Require Email Confirmation</strong>
					</label>
				</div>
				<h3>Avatars</h3>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="profile:convertProfileImageToPNG"> <strong>Convert profile image uploads to PNG</strong>
					</label>
				</div>

				<div class="form-group">
					<label>Default Gravatar Image</label>
					<select class="form-control" data-field="defaultGravatarImage">
						<option value="">default</option>
						<option value="identicon">identicon</option>
						<option value="mm">mystery-man</option>
						<option value="monsterid">monsterid</option>
						<option value="wavatar">wavatar</option>
						<option value="retro">retro</option>
					</select>
				</div>

				<div class="form-group">
					<label>Custom Gravatar Default Image</label>
					<input id="customGravatarDefaultImage" type="text" class="form-control" placeholder="A custom image to use instead of gravatar defaults" data-field="customGravatarDefaultImage" /><br />
					<input data-action="upload" data-target="customGravatarDefaultImage" data-route="{relative_path}/admin/uploadgravatardefault" type="button" class="btn btn-default" value="Upload"></input>
				</div>

				<h3>Account Protection</h3>
				<div class="form-group">
					<label for="loginAttempts">Login attempts per hour</label>
					<input id="loginAttempts" type="text" class="form-control" data-field="loginAttempts" placeholder="5" />
					<p class="help-block">
						If login attempts to a user&apos;s account exceeds this threshold, that account will be locked for a pre-configured amount of time
					</p>
				</div>
				<div class="form-group">
					<label for="lockoutDuration">Account Lockout Duration (minutes)</label>
					<input id="lockoutDuration" type="text" class="form-control" data-field="lockoutDuration" placeholder="60" />
				</div>
				<div class="form-group">
					<label>Days to remember user login sessions</label>
					<input type="text" class="form-control" data-field="loginDays" placeholder="14" />
				</div>

				<h3>Other</h3>
				<div class="form-group">
					<label>Number of flags to ban user</label>
					<input type="text" class="form-control" value="3" placeholder="" data-field="flagsForBan" />
				</div>
				<div class="form-group">
					<label>Maximum User Image File Size</label>
					<input type="text" class="form-control" placeholder="Maximum size of uploaded user images in kilobytes" data-field="maximumProfileImageSize" />
				</div>
				<div class="form-group">
					<label>Minimum Username Length</label>
					<input type="text" class="form-control" value="2" data-field="minimumUsernameLength">
				</div>
				<div class="form-group">
					<label>Maximum Username Length</label>
					<input type="text" class="form-control" value="16" data-field="maximumUsernameLength">
				</div>
				<div class="form-group">
					<label>Minimum Password Length</label>
					<input type="text" class="form-control" value="6" data-field="minimumPasswordLength">
				</div>
				<div class="form-group">
					<label>Maximum Signature Length</label>
					<input type="text" class="form-control" value="255" data-field="maximumSignatureLength">
				</div>
				<div class="form-group">
					<label>Forum Terms of Use <small>(Leave blank to disable)</small></label>
					<textarea class="form-control" data-field="termsOfUse"></textarea>
				</div>
			</div>
		</form>
	</div>
	<div class="tab-pane" id="post">
		<form>
			<div class="alert alert-warning">
				<div class="form-group">
					<label>Default Post Sorting</label>
					<select class="form-control" data-field="topicPostSort">
						<option value="oldest_to_newest">Oldest to Newest</option>
						<option value="newest_to_oldest">Newest to Oldest</option>
						<option value="most_votes">Most Votes</option>
					</select>
				</div>

				<strong>Post Delay</strong><br /> <input type="text" class="form-control" value="10000" data-field="postDelay"><br />
				<strong>Minimum Title Length</strong><br /> <input type="text" class="form-control" value="3" data-field="minimumTitleLength"><br />
				<strong>Maximum Title Length</strong><br /> <input type="text" class="form-control" value="255" data-field="maximumTitleLength"><br />
				<strong>Minimum Post Length</strong><br /> <input type="text" class="form-control" value="8" data-field="minimumPostLength"><br />
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="disableSignatures"> <strong>Disable signatures</strong>
					</label>
				</div>
				<strong>Chat Messages To Display</strong><br /> <input type="text" class="form-control" value="50" data-field="chatMessagesToDisplay"><br />
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="allowFileUploads"> <strong>Allow users to upload regular files</strong>
					</label>
				</div>
				<strong>Maximum File Size</strong><br /> <input type="text" class="form-control" value="2048" data-field="maximumFileSize"><br />

				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="allowTopicsThumbnail"> <strong>Allow users to upload topic thumbnails</strong>
					</label>
				</div>
				<strong>Topic Thumb Size</strong><br /> <input type="text" class="form-control" value="120" data-field="topicThumbSize"><br />

				<h3>Composer Settings</h3>
				<p>
					The following settings govern the functionality and/or appearance of the post composer shown
					to users when they create new topics, or reply to existing topics.
				</p>
				<div class="checkbox">
					<label for="composer:showHelpTab">
						<input type="checkbox" id="composer:showHelpTab" data-field="composer:showHelpTab" checked />
						Show "Help" tab
					</label>
				</div>
				<div class="checkbox">
					<label for="composer:allowPluginHelp">
						<input type="checkbox" id="composer:allowPluginHelp" data-field="composer:allowPluginHelp" checked />
						Allow plugins to add content to the help tab
					</label>
				</div>
				<div class="form-group">
					<label for="composer:customHelpText">Custom Help Text</label>
					<textarea class="form-control" id="composer:customHelpText" data-field="composer:customHelpText" rows="5"></textarea>
				</div>
			</div>
		</form>
	</div>
	<div class="tab-pane" id="pagination">
		<form>
			<div class="alert alert-warning">
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="usePagination"> <strong>Paginate topics and posts instead of using infinite scroll.</strong>
					</label>
				</div>

				<strong>Topics per Page</strong><br /> <input type="text" class="form-control" value="20" data-field="topicsPerPage"><br />
				<strong>Posts per Page</strong><br /> <input type="text" class="form-control" value="20" data-field="postsPerPage"><br />
			</div>
		</form>
	</div>
	<div class="tab-pane" id="tags">
		<form>
			<div class="alert alert-warning">
				<strong>Tags per Topic</strong><br /> <input type="text" class="form-control" value="5" data-field="tagsPerTopic"><br />
				<strong>Minimum Tag Length</strong><br /> <input type="text" class="form-control" value="3" data-field="minimumTagLength"><br />
				<strong>Maximum Tag Length</strong><br /> <input type="text" class="form-control" value="15" data-field="maximumTagLength"><br />
			</div>
		</form>
	</div>
	<div class="tab-pane" id="web-crawler">
		<form>
			<div class="alert alert-warning">
				<strong>Custom Robots.txt <small>Leave blank for default</small></strong><br />
				<textarea class="form-control" data-field="robots.txt"></textarea>
			</div>

			<div class="alert alert-warning">
				<strong>Feeds</strong>
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="feeds:disableRSS"> <strong>Disable RSS Feeds</strong>
					</label>
				</div>

				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="feeds:disableSitemap"> <strong>Disable Sitemap.xml</strong>
					</label>
				</div>
			</div>
		</form>
	</div>
	<div class="tab-pane" id="sockets">
		<form>
			<div class="alert alert-warning">
				<div class="form-group">
					<label for="maxReconnectionAttempts">Max Reconnection Attempts</label>
					<input class="form-control" id="maxReconnectionAttempts" type="text" value="5" data-field="maxReconnectionAttempts" /><br />
				</div>
				<div class="form-group">
					<label for="reconnectionDelay">Reconnection Delay</label>
					<input class="form-control" id="reconnectionDelay" type="text" value="200" data-field="reconnectionDelay" /><br />
				</div>
				<div class="form-group">
					<label for="websocketAddress">Websocket Address</label>
					<input class="form-control" id="websocketAddress" type="text" data-field="websocketAddress" /><br />
					<p class="help-block">
						Leave blank if unsure.
					</p>
				</div>
			</div>
		</form>
	</div>
	<div class="tab-pane active" id="advanced">
		<div class="alert alert-warning">
			<form>
				<label>Set ALLOW-FROM to Place NodeBB in an iFrame:</label>
				<input class="form-control" type="text" placeholder="external-domain.com" data-field="allow-from-uri" /><br />
				
				<label>Set domain for session cookie <small>Leave blank for default</small></label>
				<input class="form-control" type="text" placeholder=".domain.tld" data-field="cookieDomain" /><br />
			</form>
		</div>
	</div>

	<!-- This was not moved into a partial because I am removing it soon (@julianlam) -->
	<!-- ^ Heh, when did I add this... this section is still here apparently. (@julianlam July 2014) -->
	<div class="tab-pane" id="reputation">
		<form>
			<div class="alert alert-warning">
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="reputation:disabled"> <strong>Disable Reputation System</strong>
					</label>
				</div>
			</div>

			<div class="alert alert-warning">
				<h3>Privilege Thresholds</h3>
				<p>Use <strong>privilege thresholds</strong> to manage how much reputation a user must gain to receive moderator access.</p><br />
				<strong>Manage Thread</strong><br /> <input type="text" class="form-control" value="1000" data-field="privileges:manage_topic"><br />
				<strong>Manage Content</strong><br /> <input type="text" class="form-control" value="1000" data-field="privileges:manage_content"><br />
				<div class="checkbox">
					<label>
						<input type="checkbox" data-field="privileges:disabled"> <strong>Disable Privilege Threshold System</strong>
					</label>
				</div>
			</div>

			<div class="alert alert-warning">
				<h3>Activity Thresholds</h3>
				<strong>Minimum reputation to downvote posts</strong><br /> <input type="text" class="form-control" data-field="privileges:downvote"><br />
			</div>
		</form>
	</div>
</div>


<button class="btn btn-primary" id="save">Save</button>

<script>
	require(['forum/admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>