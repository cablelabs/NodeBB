/**
 * Widgets Javascript used to control generation of Marvel Widgets, such as Top Nav and Footer. For use for third-party integrations of Navigation.
 *
 * To invoke Example:
 *  MarvelWidgets.init({
 *           home_url: "http:// marvel.com",
 *           staging: "http://javen.marvel.com",
 *           current_section: "characters",
 *           targets: {
 *               topnav: "navigation-div",
 *               footer: "footer-div"
 *           },
 *           settings: {
 *               exclude_search: true,
 *               custom_terms: "comixology"
 *           }
 *   });
 *
 * @author  Matt Caron
 * @author  Javendra Lalla
 * @version $Id: marvel-widgets.js 6615 2012-04-17 16:56:27Z cnix $
 *
 */

var MarvelWidgets = (function(self){
    var _target_div_id= {};

    var _options = {
        staging: false,
        current_section: false,
        home_url: 'http://marvel.com',
        targets: {},
        settings: {}
    };

    function init(params) {
    "use strict";

        // overwrite options and set defaults
        var opts = __merge_opts(_options, params),
            base_url = "marvel.com",
            protocol = "http://",
            current_section = opts.current_section,
            jsonp_request = 1,
            scriptTag, final_url, item, setting;

        if (opts.staging && opts.staging.length) {
            base_url = opts.staging;

            //Strip protocol in Url if it was provided.
            if (base_url.substring(0, 7) === "http://"){
                base_url = base_url.replace("http://", "");
            }
            else if(base_url.substring(0, 8) === "https://"){
                base_url = base_url.replace("https://", "");
            }
        }

        if (base_url.charAt(base_url.length - 1) !== '/') {
            base_url = base_url + '/';
        }

        if (document.location.protocol === 'https:'){
            protocol = 'https://';
        }

        base_url = protocol + base_url;

        for(item in opts.targets) {

            // make sure this is actually a property of object
            if (!opts.targets.hasOwnProperty(item)) { continue; }

            // build jsonp call
            final_url = base_url + item + "?home_url=" + encodeURIComponent(opts.home_url.replace(/&amp;/g, "&")) + "&jsonp_request=" + jsonp_request;
            if (current_section !== false) {
                final_url += "&current_section=" + current_section;
            }

            //Append additional settings for call.
            for(setting in opts.settings) {
                if(!opts.settings.hasOwnProperty(setting)) { continue; }

                if(setting !== false) {
                    final_url += "&"+setting+"="+opts.settings[setting];
                }
            }


            // set targets in global
            _target_div_id = opts.targets;

            scriptTag = document.createElement('SCRIPT');
            scriptTag.src = final_url;
            document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);

        }
    }

    function generate(loadItem, data, css, jstags, jssettings) {
        "use strict";
        var cssLink = /href=['"]([^"']*?)['"]/g,
            jsSrc = /src=['"]([^"']*?)['"]/g,
            documentHead = document.getElementsByTagName('HEAD')[0],
            jsTag,
            jsCode,
            runTest,
            linkName,
            linkTest,
            target = _target_div_id[loadItem],
            maxAttempts = 100,
            count = 0,
            i;

        var cssAll = css.match(cssLink);
        for(var c in cssAll){
            var styleLink = document.createElement('link');
            styleLink.href = linkTest = cssAll[c].substring(6, cssAll[c].length-1 ); //remove href=" ..."
            styleLink.type = "text/css";
            styleLink.rel = "stylesheet";
            documentHead.appendChild(styleLink);
        }

        if(jssettings !== null){
            jsCode = '';
            for(var setting in jssettings){
                if(jssettings.hasOwnProperty(setting)){
                    // Ok, so we need to set var URLs via these settings and, since that's an object, we need some logic to handle the nested structure. Maybe this can be a recursive function when it grows up? - @roshow
                    if (typeof jssettings[setting] === 'object'){
                        jsCode += setting + '={};';
                        for(var key in jssettings[setting]){
                            if(jssettings[setting].hasOwnProperty(key)){
                                jsCode += setting + '.' + key + '=' + '"' +  jssettings[setting][key] + '";';
                            }
                        }
                    }
                    else {
                        jsCode += setting + '=' + '"' +  jssettings[setting] + '";';
                    }
                }
            }
            var scriptLink = document.createElement('script');
                scriptLink.type = "text/javascript";
            if(scriptLink.innerHTML){
                scriptLink.innerHTML = jsCode;
            }
            else{
                scriptLink.text = jsCode;
            }
            document.getElementsByTagName('BODY')[0].appendChild(scriptLink);
        }

        // Test if topnav css has been loaded, if it has then proceed
        // with loading dom elements
        runTest = setInterval(function () {
            // Test against max attempts (will run for 5 seconds as set)
            if (count === maxAttempts) {
                clearInterval(runTest);
                return;
            }

            count++;
            var stylesheets = document.styleSheets,
                stylesheetsLength = stylesheets.length;
            if (stylesheetsLength > 0) {
                for (i = 0; i < stylesheetsLength; i++) {
                    linkName = stylesheets[i].href;
                    if (linkName && linkName.indexOf(linkTest) !== -1) {
                        _loadHTML(target, data, jstags, jsSrc);
                        clearInterval(runTest);
                    }
                }
            }
        }, 200);

    }
    function _loadHTML(target, data, jstags, jsSrc){
        if (target !== null) {
            document.getElementById(target).innerHTML = data;
            if (jstags !== null){
                while((jsTag = jsSrc.exec(jstags)) !== null){
                    var scriptLink = document.createElement('script');
                    scriptLink.src = RegExp.$1;
                    scriptLink.type = "text/javascript";
                    document.getElementsByTagName('BODY')[0].appendChild(scriptLink);
                }
            }
        }
    }

    function __merge_opts(obj1, obj2) {
        "use strict";
        var obj3 = {},
            attrname;

        for (attrname in obj1) {
            if (obj1.hasOwnProperty(attrname)) {
                obj3[attrname] = obj1[attrname];
            }
        }

        for (attrname in obj2) {
            if (obj2.hasOwnProperty(attrname)) {
                obj3[attrname] = obj2[attrname];
            }
        }

        return obj3;
    }

    //extend
    self.init = init;
    self.generate = generate;
    return self;
})(MarvelWidgets || {});