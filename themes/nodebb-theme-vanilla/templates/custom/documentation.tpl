<link href='//fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'/>
<!-- <link href='css/reset.css' media='screen' rel='stylesheet' type='text/css'/>
<link href='css/reset.css' media='print' rel='stylesheet' type='text/css'/> -->
<link href='secured/swagger/css/screen.css' media='screen' rel='stylesheet' type='text/css'/>
<link href='secured/swagger/css/screen.css' media='print' rel='stylesheet' type='text/css'/>
<script type="text/javascript" src="secured/swagger/lib/shred.bundle.js"></script>
<script src='secured/swagger/lib/jquery-1.8.0.min.js' type='text/javascript'></script>
<script src='secured/swagger/lib/jquery.slideto.min.js' type='text/javascript'></script>
<script src='secured/swagger/lib/jquery.wiggle.min.js' type='text/javascript'></script>
<script src='secured/swagger/lib/jquery.ba-bbq.min.js' type='text/javascript'></script>
<script src='secured/swagger/lib/handlebars-1.0.0.js' type='text/javascript'></script>
<script src='secured/swagger/lib/underscore-min.js' type='text/javascript'></script>
<script src='secured/swagger/lib/backbone-min.js' type='text/javascript'></script>
<script src='secured/swagger/lib/swagger-client.js' type='text/javascript'></script>
<script src='secured/swagger/swagger-ui.js' type='text/javascript'></script>
<script src='secured/swagger/lib/highlight.7.3.pack.js' type='text/javascript'></script>

<!-- enabling this will enable oauth2 implicit scope support -->
<script src='secured/swagger/lib/swagger-oauth.js' type='text/javascript'></script>
<script type="text/javascript">
    $(function () {
        var url = window.location.search.match(/url=([^&]+)/);
        if (url && url.length > 1) {
            url = url[1];
        } else {
            url = "/secured/api-docs/swagger-file.json";
        }
        window.swaggerUi = new SwaggerUi({
            url: url,
            useJQuery: true,
            dom_id: "swagger-ui-container",
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch', 'options'],
            onComplete: function(swaggerApi, swaggerUi){
                if(typeof initOAuth == "function") {
                    /*
                     initOAuth({
                     clientId: "your-client-id",
                     realm: "your-realms",
                     appName: "your-app-name"
                     });
                     */
                }
                $('pre code').each(function(i, e) {
                    hljs.highlightBlock(e)
                });
            },
            onFailure: function(data) {
                log("Unable to Load SwaggerUI");
            },
            docExpansion: "none",
            sorter : "alpha",
            sortAlphabetically: true,
            useJQuery: true
        });

        function addApiKeyAuthorization() {
            var key = $('#input_apiKey')[0].value;
            log("key: " + key);
            if(key && key.trim() != "") {
                log("added key " + key);
                window.authorizations.add("key", new ApiKeyAuthorization("Authorization", 'Bearer '+ key, "header"));
            }
        }

        $('#input_apiKey').change(function() {
            addApiKeyAuthorization();
        });

        // if you have an apiKey you would like to pre-populate on the page for demonstration purposes...
        /*
         var apiKey = "myApiKeyXXXX123456789";
         $('#input_apiKey').val(apiKey);
         addApiKeyAuthorization();
         */

        window.swaggerUi.load();
    });
</script>


<div class="swagger-section">
<!--<div id='header'>-->
<div class="swagger-ui-wrap">
    <!-- <a id="logo" href="http://swagger.io">swagger</a> -->
    <form id='api_selector'>
        <!-- <div class='input'><input placeholder="http://example.com/api" id="input_baseUrl" name="baseUrl" type="text"/></div> -->
        <!--<div class='input'>-->
        <!--<label for="input_apiKey">API Key</label>-->
        <!--<input placeholder="api_key" id="input_apiKey" name="apiKey" type="text"/>-->
        <!--</div>-->
        <!-- <div class='input'><a id="explore" href="#">Explore</a></div> -->
    </form>
</div>
<!--</div>-->

<div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>
<div id="swagger-ui-container" class="swagger-ui-wrap"></div>
</div>