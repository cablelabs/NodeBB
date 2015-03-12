$(function () {

    // initialize sockets
    var ioParams = {
        'max reconnection attempts': config.maxReconnectionAttempts,
        'reconnection delay': config.reconnectionDelay,
        resource: RELATIVE_PATH.length ? RELATIVE_PATH.slice(1) + '/socket.io' : 'socket.io'
    };
    if (utils.isAndroidBrowser()) {
        ioParams.transports = ['xhr-polling'];
    }
    var socket = io.connect(config.websocketAddress, ioParams);

    var url = window.location.search.match(/url=([^&]+)/);
    if (url && url.length > 1) {
        url = url[1];
    } else {
        url = "/secured/api-docs/swagger-file-tr069.json";
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

    // Refresh the swagger file.
    socket.emit('custom.refreshZoneSwagger', '', function(err, data) {
        if (err) {
            return app.alertError(err.message);
        }
        console.log("Updated Swagger file.");
        $('.spinner').hide();
        window.swaggerUi.load();
    });
});