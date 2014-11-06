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

	<!-- Cablelabs.com CSS -->
	<link href="{relative_path}/custom-css/cl-style.css?{css-buster}" rel="stylesheet">
	<link href="{relative_path}/flatscroller/assets/css/bootstrap-responsive.css?{css-buster}" rel="stylesheet">
	<link href="{relative_path}/flatscroller/assets/css/style.css?{css-buster}" rel="stylesheet">
	<link href="{relative_path}/flatscroller/assets/css/font-awesome.min.css?{css-buster}" rel="stylesheet">
	<!--[if lt IE 7]>
	<link href="{relative_path}/flatscroller/assets/css/font-awesome-ie7.min.css?{css-buster}" rel="stylesheet">
	<![endif]-->
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
</head>

<body>
	<!--<div class="navbar navbar-inverse navbar-fixed-top header" role="navigation" id="header-menu">-->
		<!--<div class="header_row3">-->
			<!--<div class="page_width clearfix">-->
				<!--<div class="for_mobile mobile_menu">menu</div>-->
				<!--<div id="logo" class ="pull-left"><a href="http://cablelabs.com">CableLabs</a></div>-->
				<!--<nav id="nav_main">-->
					<!--<ul id="nav-header" class="nav" style="display: block;">-->
						<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-47 first-item lev1"><a href="http://cablelabs.com/about-cablelabs/" class="link">About</a>-->
							<!--&lt;!&ndash;<div class="sub_menu sub_menu1">&ndash;&gt;-->
							<!--&lt;!&ndash;<div class="menu_col"><p>Jump to Content About:</p>&ndash;&gt;-->
							<!--&lt;!&ndash;<ul class="">&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-53 first-item"><a href="http://cablelabs.com/about-cablelabs/the-board/">The Board</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-50"><a href="http://cablelabs.com/about-cablelabs/member-companies/">Member Companies</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-54"><a href="http://cablelabs.com/about-cablelabs/the-team/">The Team</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-51"><a href="http://cablelabs.com/about-cablelabs/social-responsibility/">Social Responsibility</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5393 last-item"><a href="http://cablelabs.com/home/contact-us/">Contact Us</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;</ul>&ndash;&gt;-->
							<!--&lt;!&ndash;</div>&ndash;&gt;-->
							<!--&lt;!&ndash;<div class="menu_col menu_col_last"><p>Jump to Content for:</p>&ndash;&gt;-->
							<!--&lt;!&ndash;<ul class="">&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-48 first-item"><a href="http://cablelabs.com/about-cablelabs/cable-industry/">Cable Industry</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-52"><a href="http://cablelabs.com/about-cablelabs/suppliers/">Suppliers</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-49 last-item"><a href="http://cablelabs.com/about-cablelabs/media/">Media</a></li>&ndash;&gt;-->
							<!--&lt;!&ndash;</ul>&ndash;&gt;-->
							<!--&lt;!&ndash;</div>&ndash;&gt;-->
							<!--&lt;!&ndash;</div>&ndash;&gt;-->
						<!--</li>-->
						<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-56 lev1"><a href="http://cablelabs.com/innovations/" class="link">Innovations</a>-->
							<!--<div class="sub_menu">-->
								<!--<div class="menu_col">-->
									<!--<ul class="">-->
										<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-338 first-item"><a href="http://cablelabs.com/innovations/featured-technology/">Featured Technology</a></li>-->
										<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-339"><a href="http://cablelabs.com/innovations/patents/">Granted Patents</a></li>-->
										<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6542"><a href="http://cablelabs.com/innovations/published-inventions/">Published Inventions</a></li>-->
										<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-413"><a href="http://cablelabs.com/innovations/showcase-opportunities/">Showcase Opportunities</a></li>-->
										<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6017 last-item"><a href="http://cablelabs.com/innovations/university-outreach/">University Outreach</a></li>-->
									<!--</ul>-->
								<!--</div>-->
							<!--</div>-->
						<!--</li>-->
						<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-65 lev1"><a href="http://cablelabs.com/specs/" class="link">Specifications</a>-->
							<!--<div class="sub_menu"><div class="menu_col"><ul class="">-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1248 first-item"><a href="http://cablelabs.com/specs/specification-search/">Specifications Search</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-341 last-item"><a href="http://cablelabs.com/specs/certification/">Certification</a></li>-->
							<!--</ul></div></div>-->
						<!--</li>-->
						<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-57 lev1"><a href="http://cablelabs.com/news-events/" class="link">News &amp; Events</a>-->
							<!--<div class="sub_menu"><div class="menu_col"><ul class="">-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-900 first-item"><a href="http://cablelabs.com/news-events/news/">News</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-899 last-item"><a href="http://cablelabs.com/news-events/events/">Events</a></li>-->
							<!--</ul></div></div>-->
						<!--</li>-->
						<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-55 lev1"><a href="http://cablelabs.com/careers/" class="link">Careers</a>-->
							<!--<div class="sub_menu"><div class="menu_col"><ul class="">-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-323 first-item"><a href="http://cablelabs.com/careers/why-cablelabs/">Why CableLabs</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-913"><a href="http://cablelabs.com/careers/join-our-team/">Join Our Team</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-321"><a href="http://cablelabs.com/careers/community-involvement/">Community Involvement</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6024 last-item"><a href="http://cablelabs.com/careers/internships/">Internships</a></li>-->
							<!--</ul></div></div>-->
						<!--</li>-->
						<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-64 lev1"><a href="http://cablelabs.com/resources/" class="link">Resources</a>-->
							<!--<div class="sub_menu"><div class="menu_col"><ul class="">-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-9216 first-item"><a href="http://cablelabs.com/resources/4k/">4K</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-317"><a href="http://cablelabs.com/resources/shared-services/">Shared Services</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-314"><a href="http://cablelabs.com/resources/development-lab/">Development Lab</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-316"><a href="http://cablelabs.com/resources/digital-certificate-issuance-service/">Security</a></li>-->
								<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6831 last-item"><a href="http://cablelabs.com/resources/publications/">Publications</a></li>-->
							<!--</ul></div></div>-->
						<!--</li>-->
						<!--<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-58 last-item lev1"><a href="http://cablelabs.com/news-events/blog/" class="link">Blog</a></li>-->
					<!--</ul>-->
				<!--</nav>-->

				<!--<div class="for_mobile mobile_search">-->
					<!--<span>search</span>-->
					<!--<form action="./CableLabs_files/CableLabs.html" method="get">-->
						<!--<input type="text" name="s" value="">-->
						<!--<input type="submit" value="Search">-->
					<!--</form>-->
				<!--</div>-->
			<!--</div>-->
		<!--</div>-->
	<div class="navbar navbar-fixed-top navbar-inverse header" role="navigation" id="header-menu">
		<div class="container">
			<!-- IMPORT partials/portal-menu.tpl -->
		</div>
	</div>

	<div class="container" id="content">
	<!-- IMPORT partials/noscript/warning.tpl -->