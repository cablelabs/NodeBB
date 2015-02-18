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


	<!-- Modernizr -->
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
	
	<script src="{relative_path}/custom-js/pre-check.js"></script>



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

	<script>
		if (BrowserDetect.browser === "Explorer") {
			if (BrowserDetect.version === 8) {
				document.write('<p class="alert alert-danger">' +
					  'The portal isn\'t compatible with versions of Internet Explorer below 9.' +
					  'Please update your version of Internet Explorer for full compatibility.</p>');
			}
			if (BrowserDetect.version === 9) {
				var hasFlash = false;
				try {
				  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
				  if (fo) {
				    hasFlash = true;
				  }
				} catch (e) {
				  if (navigator.mimeTypes
				        && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
				        && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
				    hasFlash = true;
				  }
				}
				var IE9Message = [];
				IE9Message.push('<div class="alert alert-danger"><p>');
				IE9Message.push('WARNING: This version of Internet Exporer doesn\'t support all features of the portal. ');
				IE9Message.push('Please upgrade your browser to the latest version of ');
				IE9Message.push('<a href="//windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages">Internet Explorer</a>. ');
				IE9Message.push('For the best user experience, we recommend using <a href="//www.google.com/chrome/browser/desktop/">');
				IE9Message.push('<img src="{relative_path}/images/chrome.png" style="width: 2.5em; height: 2.5em;"/></a>');

				if (!hasFlash) {
					IE9Message.push('<p>To view the portal with Internet Explorer 9, please install <a href="//get.adobe.com/flashplayer/otherversions/">Flash Player</a></p>');
				}

				IE9Message.push('</div>');
				document.write(IE9Message.join(''));
			}
		}
	</script>

	<div class="container-fluid parent-container" id="content">
	  <!-- IMPORT partials/noscript/warning.tpl -->
	
