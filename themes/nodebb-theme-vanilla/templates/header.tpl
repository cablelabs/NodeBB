<!DOCTYPE html>
<html class="no-js">
<head>
	<title>{browserTitle}</title>
	<!-- BEGIN metaTags -->
	{function.buildMetaTag}
	<!-- END metaTags -->
	<link rel="stylesheet" type="text/css" href="{relative_path}/stylesheet.css?{css-buster}" />
	<!-- IF bootswatchCSS --><link href="{bootswatchCSS}" rel="stylesheet" media="screen"><!-- ENDIF bootswatchCSS -->
	<!-- BEGIN linkTags -->
	<link<!-- IF linkTags.link --> link="{linkTags.link}"<!-- ENDIF linkTags.link --><!-- IF linkTags.rel --> rel="{linkTags.rel}"<!-- ENDIF linkTags.rel --><!-- IF linkTags.type --> type="{linkTags.type}"<!-- ENDIF linkTags.type --><!-- IF linkTags.href --> href="{linkTags.href}"<!-- ENDIF linkTags.href --> />
	<!-- END linkTags -->
	<!-- IF useCustomCSS -->
	<style type="text/css">{customCSS}</style>
	<!-- ENDIF useCustomCSS -->

	<!-- Cablelabs.com CSS -->
	<link href="{relative_path}/custom-css/cl-style.css?{css-buster}" rel="stylesheet">
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  
	
	<!-- Le fav and touch icons -->
	<link rel="shortcut icon" href="{relative_path}/images/cl-icon-bw.ico">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-57-precomposed.png">

	<script src="{relative_path}/custom-js/modernizr.js"></script>

	<script>
		Modernizr.load([
			{
				test: Modernizr.flexbox,
				yep: '{relative_path}/custom-css/entity-map.css?{css-buster}',
				nope: '{relative_path}/custom-css/entity-map-ie9.css?{css-buster}'
			}
	]);
	</script>



	<script>
		var RELATIVE_PATH = "{relative_path}";
	</script>
	<script src="{relative_path}/nodebb.min.js?{script-buster}"></script>
	<script>
		require.config({
			baseUrl: "{relative_path}/src/modules",
			waitSeconds: 3,
			urlArgs: "{cache-buster}",
			paths: {
				'forum': '../forum',
				'vendor': '../../vendor',
				'buzz': '../../vendor/buzz/buzz.min'
			}
		});
	</script>
	
	<!-- IF useCustomJS -->
	{customJS}
	<!-- ENDIF useCustomJS -->

	
</head>

<body>	

	<nav class="navbar navbar-inverse navbar-fixed-top header" role="navigation" id="header-menu">
		<!-- IMPORT partials/portal-menu.tpl -->
	</nav>

	<div class="container-fluid parent-container" id="content">
	  <!-- IMPORT partials/noscript/warning.tpl -->
	
