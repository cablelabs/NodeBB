<div class="col-lg-9">

<div class="panel panel-default">
	<div class="panel-heading">Notifications</div>
	<div class="panel-body">
		<form>
			<strong>Welcome Notification</strong><br /> <textarea class="form-control" data-field="welcomeNotification"></textarea><br />
			<strong>Welcome Notification Link</strong><br /> <input type="text" class="form-control" data-field="welcomeLink"><br />
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