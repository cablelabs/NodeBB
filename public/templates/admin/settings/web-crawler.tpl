<div class="col-lg-9">

<div class="panel panel-default">
	<div class="panel-heading">Crawlability Settings</div>
	<div class="panel-body">
		<form>
			<strong>Custom Robots.txt <small>Leave blank for default</small></strong><br />
			<textarea class="form-control" data-field="robots.txt"></textarea>
		</form>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-heading">Sitemap & Feed Settings</div>
	<div class="panel-body">
		<form>
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
		</form>
	</div>
</div>

</div>
<span class="hidden" id="csrf" data-csrf="{csrf}"></span>

<div class="col-lg-3">
	<div class="panel panel-default">
		<div class="panel-heading">Save Settings</div>
		<div class="panel-body">
			<button class="btn btn-primary btn-md" id="save">Save Changes</button>
			<button class="btn btn-warning btn-md" id="revert">Revert Changes</button>
		</div>
	</div>
</div>

<script>
	require(['forum/admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>