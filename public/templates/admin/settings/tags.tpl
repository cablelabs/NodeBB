<div class="col-lg-9">

<div class="panel panel-default">
	<div class="panel-heading">Tag Settings</div>
	<div class="panel-body">
		<form>
			<strong>Tags per Topic</strong><br /> <input type="text" class="form-control" value="5" data-field="tagsPerTopic"><br />
			<strong>Minimum Tag Length</strong><br /> <input type="text" class="form-control" value="3" data-field="minimumTagLength"><br />
			<strong>Maximum Tag Length</strong><br /> <input type="text" class="form-control" value="15" data-field="maximumTagLength"><br />
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