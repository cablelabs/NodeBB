
  <link href='//fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'/>
  <link href='apidocs/css/reset.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='apidocs/css/screen.css' media='screen' rel='stylesheet' type='text/css'/>
  <link href='apidocs/css/reset.css' media='print' rel='stylesheet' type='text/css'/>
  <link href='apidocs/css/screen.css' media='print' rel='stylesheet' type='text/css'/>
  <script type="text/javascript" src="apidocs/lib/shred.bundle.js"></script>
  <script src='apidocs/lib/jquery-1.8.0.min.js' type='text/javascript'></script>
  <script src='apidocs/lib/jquery.slideto.min.js' type='text/javascript'></script>
  <script src='apidocs/lib/jquery.wiggle.min.js' type='text/javascript'></script>
  <script src='apidocs/lib/jquery.ba-bbq.min.js' type='text/javascript'></script>
  <script src='apidocs/lib/handlebars-1.0.0.js' type='text/javascript'></script>
  <script src='apidocs/lib/underscore-min.js' type='text/javascript'></script>
  <script src='apidocs/lib/backbone-min.js' type='text/javascript'></script>
  <script src='apidocs/lib/swagger.js' type='text/javascript'></script>
  <script src='apidocs/lib/swagger-client.js' type='text/javascript'></script>
  <script src='apidocs/swagger-ui.js' type='text/javascript'></script>
  <script src='apidocs/lib/highlight.7.3.pack.js' type='text/javascript'></script>

  <!-- enabling this will enable oauth2 implicit scope support -->
  <script src='apidocs/lib/swagger-oauth.js' type='text/javascript'></script>

  <script type="text/javascript">
    $(function () {
      var url = window.location.search.match(/url=([^&]+)/);
      if (url && url.length > 1) {
        url = url[1];
      } else {
        url = "http://raml-store.herokuapp.com/raml/CLIPS.json";
      }
      window.swaggerUi = new SwaggerUi({
      url: url,
      dom_id: "swagger-ui-container",
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
      onComplete: function(swaggerApi, swaggerUi){
        log("Loaded SwaggerUI");

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
      sorter : "alpha"
    });

    $('#input_apiKey').change(function() {
      var key = $('#input_apiKey')[0].value;
      log("key: " + key);
      if(key && key.trim() != "") {
        log("added key " + key);
        window.authorizations.add("key", new ApiKeyAuthorization("api_key", key, "query"));
      }
    })
    window.swaggerUi.load();
  });
  </script>

  <div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>
  <div id="swagger-ui-container" class="swagger-ui-wrap row home"></div>

