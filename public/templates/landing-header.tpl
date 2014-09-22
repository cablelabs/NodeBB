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


    <!-- IF loggedIn -->
    <div class="navbar-collapse collapse navbar-ex1-collapse">
        <ul id="main-nav" class="nav navbar-nav pull-left">
            <!-- IF loggedIn -->
            <li>
                <a href="{relative_path}/unread"><i id="unread-count" class="fa fa-fw fa-inbox" data-content="0" title="[[global:header.unread]]"></i><span class="visible-xs-inline"> [[global:header.unread]]</span></a>
            </li>
            <!-- ENDIF loggedIn -->

            <li>
                <a href="{relative_path}/recent"><i class="fa fa-fw fa-clock-o" title="[[global:header.recent]]"></i><span class="visible-xs-inline"> [[global:header.recent]]</span></a>
            </li>
            <li>
                <a href="{relative_path}/tags"><i class="fa fa-fw fa-tags" title="[[global:header.tags]]"></i><span class="visible-xs-inline"> [[global:header.tags]]</span></a>
            </li>
            <li>
                <a href="{relative_path}/popular"><i class="fa fa-fw fa-fire" title="[[global:header.popular]]"></i><span class="visible-xs-inline"> [[global:header.popular]]</span></a>
            </li>

            <!-- IF searchEnabled -->
            <li class="visible-xs">
                <a id="mobile-search-button" href="{relative_path}/search"><i class="fa fa-search fa-fw" title="[[global:header.search]]"></i> [[global:header.search]]</a>
            </li>
            <!-- ENDIF searchEnabled -->
            <!-- BEGIN navigation -->
            <li class="{navigation.class}">
                <a href="{relative_path}{navigation.route}" title="{navigation.title}">
                    <!-- IF navigation.iconClass -->
                    <i class="fa fa-fw {navigation.iconClass}"></i>
                    <!-- ENDIF navigation.iconClass -->

                    <!-- IF navigation.text -->
                    <span class="{navigation.textClass}">{navigation.text}</span>
                    <!-- ENDIF navigation.text -->
                </a>
            </li>
            <!-- END navigation -->
        </ul>

        <!-- IF searchEnabled -->
        <ul class="nav navbar-nav navbar-right">
            <li>
                <form id="search-form" class="navbar-form navbar-right hidden-xs" role="search" method="GET" action="">
                    <div class="hide" id="search-fields">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="[[global:search]]" name="query" value="">
                        </div>
                        <button type="submit" class="btn btn-default hide">[[global:search]]</button>
                    </div>
                    <button id="search-button" type="button" class="btn btn-link"><i class="fa fa-search fa-fw" title="[[global:header.search]]"></i></button>
                </form>
            </li>
        </ul>
        <!-- ENDIF searchEnabled -->

        <ul class="nav navbar-nav navbar-right pagination-block hidden visible-lg visible-md">
            <li class="dropdown">
                <i class="fa fa-angle-double-up pointer fa-fw pagetop"></i>
                <i class="fa fa-angle-up pointer fa-fw pageup"></i>

                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <span id="pagination"></span>
                </a>

                <i class="fa fa-angle-down pointer fa-fw pagedown"></i>
                <i class="fa fa-angle-double-down pointer fa-fw pagebottom"></i>

                <div class="progress-container">
                    <div class="progress-bar"></div>
                </div>

                <ul class="dropdown-menu" role="menu">
                    <input type="text" class="form-control" id="indexInput" placeholder="[[global:pagination.enter_index]]">
                </ul>
            </li>
        </ul>

        <div class="header-topic-title hidden-xs">
            <span></span>
        </div>
    </div>
    <!-- ENDIF loggedIn -->
		</div>
	</div>

	<input id="csrf_token" type="hidden" template-variable="csrf" value="{csrf}" />

	<div class="container landing" id="content">
	<noscript>
		<div class="alert alert-danger">
			<p>
				Your browser does not seem to support JavaScript. As a result, your viewing experience will be diminished, and you have been placed in <strong>read-only mode</strong>.
			</p>
			<p>
				Please download a browser that supports JavaScript, or enable it if it's disabled (i.e. NoScript).
			</p>
		</div>
	</noscript>