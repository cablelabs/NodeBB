<!DOCTYPE html>
<html>
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
<!--
<div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <div>
        <a href="{relative_path}/">
            <img class="{brand:logo:display} forum-logo" src="{brand:logo}" />
        </a>
        <!-- IF showSiteTitle -->
        <a href="{relative_path}/">
            <h1 class="navbar-brand forum-title">{title}</h1>
        </a>
        <!-- ENDIF showSiteTitle -->

        <div class="header-topic-title visible-xs">
            <span></span>
        </div>
    </div>
</div> -->

<!-- <div class="navbar-collapse collapse navbar-ex1-collapse header_row4"> -->
<div class="page_width clearfix">
    <!-- <div id="portal-logo" class ="pull-left"><a href="{relative_path}/#"></a></div> -->
    <ul id="main-nav" class="nav navbar-nav pull-left">
        <li>
            <a href="{relative_path}/">Developer Portal</a>
            <span>&nbsp;</span>
        </li>
        <li class="dropdown-container">
            <a>How-Tos</a>
            <!--
            <div class="dropdown">
                <a href="http://developer.marvel.com/documentation/getting_started">Getting Started</a>
                <a href="http://developer.marvel.com/documentation/generalinfo">General Information</a>
                <a href="http://developer.marvel.com/documentation/apiresults">API Results</a>
                <a href="http://developer.marvel.com/documentation/entity_types">Entity Types</a>
                <a href="http://developer.marvel.com/documentation/authorization">Authorization</a>
                <a href="http://developer.marvel.com/documentation/attribution">Attribution &amp; Rate Limits</a>
                <a href="http://developer.marvel.com/documentation/images">Images</a>
            </div> -->
        </li>
        <li class="dropdown-container">
            <a href="{relative_path}/documentation">API</a>
            <!--
            <div class="dropdown">
                <a href="http://developer.marvel.com/documentation/getting_started">Getting Started</a>
                <a href="http://developer.marvel.com/documentation/generalinfo">General Information</a>
                <a href="{relative_path}/apidocs">Get a Key</a>
            </div> -->
        </li>
        <li>
            <a href="{relative_path}/forums">Forums</a>
        </li>

        <!-- IF loggedIn -->
        <!-- IF isForums -->
        <li>
            <a href="{relative_path}/unread"><i id="unread-count" class="fa fa-fw fa-inbox" data-content="0" title="[[global:header.unread]]"></i><span class="visible-xs-inline"> [[global:header.unread]]</span></a>
        </li>
        <li>
            <a href="{relative_path}/recent"><i class="fa fa-fw fa-clock-o" title="[[global:header.recent]]"></i><span class="visible-xs-inline"> [[global:header.recent]]</span></a>
        </li>
        <li>
            <a href="{relative_path}/tags"><i class="fa fa-fw fa-tags" title="[[global:header.tags]]"></i><span class="visible-xs-inline"> [[global:header.tags]]</span></a>
        </li>
        <li>
            <a href="{relative_path}/popular"><i class="fa fa-fw fa-fire" title="[[global:header.popular]]"></i><span class="visible-xs-inline"> [[global:header.popular]]</span></a>
        </li>
        <!-- ENDIF isForums -->
        <!-- ENDIF loggedIn -->
    </ul>

    <!-- IF loggedIn -->
    <ul id="logged-in-menu" class="nav navbar-nav navbar-right pull-right">
        <li class="notifications dropdown text-center hidden-xs">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="notif_dropdown"><i class="fa fa-fw fa-bell-o" data-content="0" title="[[global:header.notifications]]"></i></a>
            <ul id="notif-list" class="dropdown-menu" aria-labelledby="notif_dropdown">
                <li>
                    <a href="#"><i class="fa fa-refresh fa-spin"></i> [[global:notifications.loading]]</a>
                </li>
            </ul>
        </li>

        <li>
            <!-- IF function.displayUsersLink -->
            <a href="{relative_path}/users"><i class="fa fa-fw fa-users" title="[[global:header.users]]"></i><span class="visible-xs-inline"> [[global:header.users]]</span></a>
            <!-- ENDIF function.displayUsersLink -->
        </li>

        <!-- IF isAdmin -->
        <li>
           <a href="{relative_path}/admin/designer/"><i class="fa fa-fw fa-clock-o" title="API Designer"></i><span class="visible-xs-inline">API Designer</span></a>
        </li>
        <!-- ENDIF isAdmin -->

        <!-- IF isAdmin -->
        <li>
            <a href="{relative_path}/admin" target="_top"><i class="fa fa-fw fa-cogs" title="[[global:header.admin]]"></i><span class="visible-xs-inline"> [[global:header.admin]]</span></a>
        </li>
        <!-- ENDIF isAdmin -->

        <li class="visible-xs">
            <a href="{relative_path}/notifications"><i class="fa fa-bell-o fa-fw" title="[[notifications:title]]"></i> [[notifications:title]]</a>
        </li>
        <li class="chats dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="chat_dropdown"><i id="chat-count" class="fa fa-comment-o fa-fw" title="[[global:header.chats]]"></i> <span class="visible-xs-inline">[[global:header.chats]]</span></a>
            <ul id="chat-list" class="dropdown-menu" aria-labelledby="chat_dropdown">
                <li>
                    <a href="#"><i class="fa fa-refresh fa-spin"></i> [[global:chats.loading]]</a>
                </li>
            </ul>
        </li>

        <li id="user_label" class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="user_dropdown" title="[[global:header.profile]]">
                <img id="user-header-picture" src="{user.picture}"/>
            </a>
            <ul id="user-control-list" class="dropdown-menu" aria-labelledby="user_dropdown">
                <li>
                    <a id="user-profile-link" href="{relative_path}/user/{user.userslug}"><i class="fa fa-circle status {user.status}"></i> <span id="user-header-name">{user.username}</span></a>
                </li>
                <li id="logout-link">
                    <a href="#">[[global:logout]]</a>
                </li>
                <li role="presentation" class="divider"></li>
                <li>
                    <a href="#" class="user-status" data-status="online"><i class="fa fa-circle status online"></i><span> [[global:online]]</span></a>
                </li>
                <li>
                    <a href="#" class="user-status" data-status="away"><i class="fa fa-circle status away"></i><span> [[global:away]]</span></a>
                </li>
                <li>
                    <a href="#" class="user-status" data-status="dnd"><i class="fa fa-circle status dnd"></i><span> [[global:dnd]]</span></a>
                </li>
                <li>
                    <a href="#" class="user-status" data-status="offline"><i class="fa fa-circle status offline"></i><span> [[global:invisible]]</span></a>
                </li>
            </ul>
        </li>
    </ul>
    <!-- ELSE -->
    <ul id="logged-out-menu" class="nav navbar-nav navbar-right pull-right">
        <!-- IF allowRegistration -->
        <li>
            <a href="{relative_path}/register">
                <i class="fa fa-pencil visible-xs-inline"></i>
                <span>[[global:register]]</span>
            </a>
        </li>
        <!-- ENDIF allowRegistration -->
        <li>
            <a href="{relative_path}/login">
                <i class="fa fa-sign-in visible-xs-inline"></i>
                <span>[[global:login]]</span>
            </a>
        </li>
    </ul>
    <!-- ENDIF loggedIn -->

    <ul class="nav navbar-nav navbar-right pull-right">
        <li>
            <a href="#" id="reconnect" class="hide" title="Connection to {title} has been lost, attempting to reconnect..."><i class="fa fa-check"></i></a>
        </li>
    </ul>

    <div class="header-topic-title hidden-xs">
        <span></span>
    </div>
</div>
		</div>
	</div>

	<input id="csrf_token" type="hidden" template-variable="csrf" value="{csrf}" />

	<div class="container" id="content">
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