<!DOCTYPE html>
<html>
<head>
	<title>{browserTitle}</title>

	<!-- BEGIN metaTags -->
	    {function.buildMetaTag}
	<!-- END metaTags -->

	<!-- Le styles -->

    <!-- <link href="{relative_path}/flatscroller/assets/css/bootstrap.css?{css-buster}" rel="stylesheet"> -->

    <link href="{relative_path}/flatscroller/assets/css/bootstrap-responsive.css?{css-buster}" rel="stylesheet">
    <link href="{relative_path}/flatscroller/assets/css/style.css?{css-buster}" rel="stylesheet">
    <link href="{relative_path}/flatscroller/assets/css/font-awesome.min.css?{css-buster}" rel="stylesheet">

    <!--[if lt IE 7]>
        <link href="{relative_path}/flatscroller/assets/css/font-awesome-ie7.min.css?{css-buster}" rel="stylesheet">
    <![endif]-->

    <!-- Fav and touch icons -->

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="{relative_path}/flatscroller/assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="{relative_path}/flatscroller/assets/ico/apple-touch-icon-57-precomposed.png">

	<link rel="stylesheet" type="text/css" href="{relative_path}/stylesheet.css?{css-buster}" />
	<!-- IF bootswatchCSS --><link href="{bootswatchCSS}" rel="stylesheet" media="screen"><!-- ENDIF bootswatchCSS -->
	<!-- BEGIN linkTags -->
	<link<!-- IF linkTags.link --> link="{linkTags.link}"<!-- ENDIF linkTags.link --><!-- IF linkTags.rel --> rel="{linkTags.rel}"<!-- ENDIF linkTags.rel --><!-- IF linkTags.type --> type="{linkTags.type}"<!-- ENDIF linkTags.type --><!-- IF linkTags.href --> href="{linkTags.href}"<!-- ENDIF linkTags.href --> />
	<!-- END linkTags -->
	<!-- IF useCustomCSS -->
	<style type="text/css">{customCSS}</style>
	<!-- ENDIF useCustomCSS -->

	<!--[if lt IE 9]>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.3.0/es5-shim.min.js"></script>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.js"></script>
  		<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
  		<script>__lt_ie_9__ = 1;</script>
	<![endif]-->

	<script>
		var RELATIVE_PATH = "{relative_path}";
	</script>
	<script src="{relative_path}/socket.io/socket.io.js"></script>
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
	<div class="navbar navbar-inverse navbar-fixed-top header" role="navigation" id="header-menu">
		<div class="container">
			<!-- IMPORT partials/menu.tpl -->
		</div>
	</div>

	<input id="csrf_token" type="hidden" template-variable="csrf" value="{csrf}" />

	<div class="container landing" id="content">
	<!-- IMPORT partials/noscript/warning.tpl -->