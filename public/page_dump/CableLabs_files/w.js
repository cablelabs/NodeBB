!function(a,b){"use strict";var c,d,e,f={},g=[],h=!0,i=!0,j=!0,k=11,l="//www.woopra.com/track/";Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var c=this.length>>>0;for(b=+b||0,1/0===Math.abs(b)&&(b=0),0>b&&(b+=c,0>b&&(b=0));c>b;b++)if(this[b]===a)return b;return-1}),f.extend=function(a,b){for(var c in b)a[c]=b[c]},f.serializeForm=function(a,b){if(a&&"FORM"===a.nodeName){var c,d,e={};for(c=a.elements.length-1;c>=0;c-=1)if(!(""===a.elements[c].name||b.indexOf(a.elements[c].name)>-1))switch(a.elements[c].nodeName){case"INPUT":switch(a.elements[c].type){case"text":case"hidden":case"password":case"button":case"reset":case"submit":e[a.elements[c].name]=a.elements[c].value;break;case"checkbox":case"radio":a.elements[c].checked&&(e[a.elements[c].name]=a.elements[c].value);break;case"file":}break;case"TEXTAREA":e[a.elements[c].name]=a.elements[c].value;break;case"SELECT":switch(a.elements[c].type){case"select-one":e[a.elements[c].name]=a.elements[c].value;break;case"select-multiple":for(d=a.elements[c].options.length-1;d>=0;d-=1)a.elements[c].options[d].selected&&(e[a.elements[c].name]=a.elements[c].options[d].value)}break;case"BUTTON":switch(a.elements[c].type){case"reset":case"submit":case"button":e[a.elements[c].name]=a.elements[c].value}}return e}},f.cookie=function(a,c,d){if(void 0!==c){var e=d||{};if("number"==typeof e.expires){var f=e.expires,g=e.expires=new Date;g.setDate(g.getDate()+f)}return b.cookie=[encodeURIComponent(a),"=",encodeURIComponent(c),e.expires?"; expires="+e.expires.toUTCString():"",e.path?"; path="+e.path:"",e.domain?"; domain="+e.domain:"",e.secure?"; secure":""].join("")}for(var h=function(a){try{return decodeURIComponent(a.replace(/\+/g," "))}catch(b){}},i=function(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),a=h(a);try{return a}catch(b){}},j=b.cookie?b.cookie.split("; "):[],k=a?void 0:{},l=0,m=j.length;m>l;l++){var n=j[l].split("="),o=h(n.shift()),p=n.join("=");if(a&&a===o){k=i(p);break}a||void 0===(p=i(p))||(k[o]=p)}return k},f.location=function(b,c){if("undefined"!=typeof a.location[b]){if("undefined"==typeof c)return a.location[b];a.location[b]=c}},f.getCampaignData=function(){for(var a,b,c=f.getUrlParams(),d={},e=["source","medium","content","campaign","term"],g=0;g<e.length;g++)a=e[g],b=c["utm_"+a]||c["woo_"+a],"undefined"!=typeof b&&(d["campaign_"+("campaign"===a?"name":a)]=b);return d},f.getCustomData=function(a,b){var c,d,e,g=f.getUrlParams(),h=b||"wv_";for(c in g)g.hasOwnProperty(c)&&(e=g[c],c.substring(0,h.length)===h&&(d=c.substring(h.length),a.call(this,d,e)))},f.getVisitorUrlData=function(a){f.getCustomData.call(a,a.identify,"wv_")},f.hideCampaignData=function(){var b=f.location("search").replace(/[?&]+((?:wv_|woo_|utm_)[^=&]+)=([^&]*)/gi,"");"?"!==b.substring(0,1)&&""!==b&&(b="?"+b),a.history&&a.history.replaceState&&a.history.replaceState(null,null,f.location("pathname")+b)},f.getUrlParams=function(){var a={};return f.location("href").replace(/[?&]+([^=&]+)=([^&]*)/gi,function(b,c,d){a[c]=decodeURIComponent(d.split("+").join(" "))}),a},f.buildUrlParams=function(a,b){var c,d=b||"",e=[];if("undefined"==typeof a)return a;for(c in a)a.hasOwnProperty(c)&&e.push(d+encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return e.join("&")},f.randomString=function(){var a,b,c="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",d="";for(a=0;12>a;a++)b=Math.floor(Math.random()*c.length),d+=c.substring(b,b+1);return d},f.loadScript=function(a,c){var d,e,g=b.createElement("script");g.type="text/javascript",g.async=!0,c&&"function"==typeof c&&(e=c),"undefined"!=typeof g.onreadystatechange?g.onreadystatechange=function(){(4===this.readyState||"complete"===this.readyState||"loaded"===this.readyState)&&(e&&e(),f.removeScript(g))}:(g.onload=function(){e&&e(),f.removeScript(g)},g.onerror=function(){f.removeScript(g)}),g.src=a,d=b.getElementsByTagName("script")[0],d.parentNode.insertBefore(g,d)},f.removeScript=function(a){a&&a.parentNode&&a.parentNode.removeChild(a)},f.getHost=function(){return f.location("host").replace("www.","")},f.endsWith=function(a,b){return-1!==a.indexOf(b,a.length-b.length)},f.sleep=function(a){for(var b=new Date,c=new Date;a>c-b;)c=new Date},c=f._on=function(a,b,c){var d=a.instanceName;g[b]||(g[b]={}),g[b][d]=a,a.__l&&(a.__l[b]||(a.__l[b]=[]),a.__l[b].push(c))},f._fire=function(a){var b,c,d=g[a];if(d)for(var e in d)if(d.hasOwnProperty(e)&&(b=d[e],c=b&&b.__l,c&&c[a]))for(var f=0;f<c[a].length;f++)c[a][f].apply(this,Array.prototype.slice.call(arguments,1))},f.attachEvent=function(a,b,c){a.addEventListener?a.addEventListener(b,c):a.attachEvent&&a.attachEvent("on"+b,c)},f.leftClick=function(b){b=b||a.event;var c="undefined"!=typeof b.which&&1===b.which||"undefined"!=typeof b.button&&0===b.button;return c&&!b.metaKey&&!b.altKey&&!b.ctrlKey&&!b.shiftKey},f.redirect=function(a){f.location("href",a)},function(c,g){c(b,"mousedown",function(a){g("mousemove",a,new Date)}),c(b,"click",function(b){var c,k,l,m,n,o="_blank";if(c=b.srcElement||b.target,h||i){for(;"undefined"!=typeof c&&null!==c&&(!c.tagName||"a"!==c.tagName.toLowerCase());)c=c.parentNode;"undefined"!=typeof c&&null!==c&&(k=c,l=k.pathname.match(/(?:doc|dmg|eps|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3|mp4|m4v)($|\&)/),n=!1,h&&l&&(g("download",k.href),k.target!==o&&f.leftClick(b)&&(b.preventDefault(),a.setTimeout(function(){f.redirect(k.href)},d))),m=f.location("hostname"),!i||l||k.hostname===m||j&&""!==m&&(-1!==k.hostname.indexOf(m)||-1!==m.indexOf(k.hostname))||-1!==k.hostname.indexOf("javascript")||""===k.hostname||(g("outgoing",k.href),k.target!==o&&f.leftClick(b)&&(b.preventDefault(),a.setTimeout(function(){f.redirect(k.href)},e))))}}),c(b,"mousemove",function(a){g("mousemove",a,new Date)}),c(b,"keydown",function(){g("keydown")})}(f.attachEvent,f._fire);var m=function(b){this.visitorData={},this.sessionData={},this.options={},this.instanceName=b||"woopra",this.idle=0,this.cookie="",this.last_activity=new Date,this.loaded=!1,this.dirtyCookie=!1,this.sentCampaign=!1,this.version=k,b&&""!==b&&(a[b]=this)};m.prototype={init:function(){var a,b=this;this.__l={},this._setOptions(),this._processQueue("config"),this._setupCookie(),this._bindEvents(),setTimeout(function(){b._processQueue()},1),this.loaded=!0,a=this.config("initialized"),a&&"function"==typeof a&&a(this.instanceName)},_setOptions:function(){var a=new Date;a.setDate(a.getDate()+365),this.config({domain:f.getHost(),app:"js-client",use_cookies:!0,cookie_name:"wooTracker",cookie_domain:null,cookie_path:"/",cookie_expire:a,ping:!0,ping_interval:12e3,idle_timeout:3e5,idle_threshold:1e4,download_pause:d||200,outgoing_pause:e||200,download_tracking:!0,outgoing_tracking:!0,outgoing_ignore_subdomain:!0,hide_campaign:!1,campaign_once:!1,save_url_hash:!0,ignore_query_url:!0})},_processQueue:function(b){var c,d,e,f;if(f=a.__woo?a.__woo[this.instanceName]:f,f=a._w?a._w[this.instanceName]:f,f&&f._e)for(e=f._e,c=0;c<e.length;c++)d=e[c],"undefined"==typeof d||!this[d[0]]||"undefined"!=typeof b&&b!==d[0]||this[d[0]].apply(this,Array.prototype.slice.call(d,1))},_setupCookie:function(){this.cookie=f.cookie(this.config("cookie_name")),this.cookie&&this.cookie.length>0||(this.cookie=f.randomString()),null===this.config("cookie_domain")&&(f.endsWith(f.location("host"),"."+this.config("domain"))?this.config("cookie_domain",this.config("domain")):this.config("cookie_domain",f.getHost())),f.cookie(this.config("cookie_name"),this.cookie,{expires:this.config("cookie_expire"),path:this.config("cookie_path"),domain:this.config("cookie_domain")}),this.dirtyCookie=!0},_bindEvents:function(){var a=this;c(this,"mousemove",function(){a.moved.apply(a,arguments)}),c(this,"keydown",function(){a.typed.apply(a,arguments)}),c(this,"download",function(){a.downloaded.apply(a,arguments)}),c(this,"outgoing",function(){a.outgoing.apply(a,arguments)})},_dataSetter:function(a,b,c){var d;if("undefined"==typeof b)return a;if("undefined"==typeof c){if("string"==typeof b)return a[b];if("object"==typeof b)for(d in b)b.hasOwnProperty(d)&&("cookie_"===d.substring(0,7)&&(this.dirtyCookie=!0),a[d]=b[d])}else"cookie_"===b.substring(0,7)&&(this.dirtyCookie=!0),a[b]=c;return this},_push:function(a){var b,c,d,e,g,h=a||{},i=this.config("protocol"),j=i&&""!==i?i+":":"",k=j+l+h.endpoint+"/",m="ra="+f.randomString(),n=[["visitorData","cv_"],["eventData","ce_"],["sessionData","cs_"]],o=[];f.getVisitorUrlData(this),this.config("hide_campaign")&&f.hideCampaignData(),o.push(m),o.push(f.buildUrlParams(this.getOptionParams()));for(g in n)n.hasOwnProperty(g)&&(e=n[g],h[e[0]]&&(c=f.buildUrlParams(h[e[0]],e[1]),c&&o.push(c)));b="?"+o.join("&"),d=k+b,f.loadScript(d,h.callback)},config:function(a,b){var c=this._dataSetter(this.options,a,b);return c===this&&(this.options.ping_interval<6e3?this.options.ping_interval=6e3:this.options.ping_interval>6e4&&(this.options.ping_interval=6e4),i=i&&this.options.outgoing_tracking,e=this.options.outgoing_pause,h=h&&this.options.download_tracking,d=this.options.download_pause,j=j&&this.options.outgoing_ignore_subdomain,this.dirtyCookie&&this.loaded&&this._setupCookie()),c},visit:function(a,b){return this._dataSetter(this.sessionData,a,b)},identify:function(a,b){return this._dataSetter(this.visitorData,a,b)},call:function(a){this[a]&&"function"==typeof this[a]&&this[a].apply(this,Array.prototype.slice.call(arguments,1))},track:function(a,b){var c,d,e={},g=arguments[arguments.length-1];this.config("campaign_once")&&this.sentCampaign||(f.extend(e,f.getCampaignData()),this.sentCampaign=!0),"function"==typeof g&&(c=g),"undefined"==typeof a||a===c?e.name="pv":"undefined"==typeof b||b===c?("string"==typeof a&&(e.name=a),"object"==typeof a&&this._dataSetter(e,a)):(this._dataSetter(e,b),e.name=a),"pv"===e.name&&(e.url=e.url||this.getPageUrl(),e.title=e.title||this.getPageTitle(),this.config("save_url_hash")&&(d=e.hash||this.getPageHash(),""!==d&&(e.hash=d))),this._push({endpoint:"ce",visitorData:this.visitorData,sessionData:this.sessionData,eventData:e,callback:c}),this.startPing()},trackForm:function(a,c,d){var e,g,h=a||"Tracked Form",i="string"==typeof c?d||{}:c||{},j=this;g=i.exclude||[],"string"==typeof c&&(e=b.getElementById("#"===c[0]?c.substr(1):c)),e&&f.attachEvent(e,"submit",function(a){var b={};e.getAttribute("data-tracked")||(a.preventDefault?a.preventDefault():event.returnValue=!1,b=f.serializeForm(e,g),e.setAttribute("data-tracked",!0),j.track(h,b,function(){e.submit()}))})},startPing:function(){var b=this;"undefined"==typeof this.pingInterval&&(this.pingInterval=a.setInterval(function(){b.ping()},this.config("ping_interval")))},stopPing:function(){"undefined"!=typeof this.pingInterval&&(a.clearInterval(this.pingInterval),delete this.pingInterval)},ping:function(){var a;return this.config("ping")&&this.idle<this.config("idle_timeout")?this._push({endpoint:"ping"}):this.stopPing(),a=new Date,a-this.last_activity>this.config("idle_threshold")&&(this.idle=a-this.last_activity),this},push:function(a){return this._push({endpoint:"identify",visitorData:this.visitorData,sessionData:this.sessionData,callback:a}),this},sleep:function(a){f.sleep(a)},moved:function(a,b){this.last_activity=b,this.idle=0},typed:function(){this.vs=2},downloaded:function(a){this.track("download",{url:a})},outgoing:function(a){this.track("outgoing",{url:a})},reset:function(){f.cookie(this.config("cookie_name"),"",{expires:-1e3,path:this.config("cookie_path"),domain:this.config("cookie_domain")}),this.cookie=null,this._setupCookie()},getPageUrl:function(){return this.options.ignore_query_url?a.location.pathname:a.location.pathname+a.location.search},getPageHash:function(){return a.location.hash},getPageTitle:function(){return 0===b.getElementsByTagName("title").length?"":b.getElementsByTagName("title")[0].innerHTML},getOptionParams:function(){var c={alias:this.config("domain"),instance:this.instanceName,ka:this.config("keep_alive")||2*this.config("ping_interval"),meta:f.cookie("wooMeta")||"",screen:a.screen.width+"x"+a.screen.height,language:a.navigator.browserLanguage||a.navigator.language||"",app:this.config("app"),referer:b.referrer,idle:""+parseInt(this.idle/1e3,10),vs:"i"};return this.config("use_cookies")&&(c.cookie=f.cookie(this.config("cookie_name"))||""),this.config("ip")&&(c.ip=this.config("ip")),2===this.vs?(c.vs="w",this.vs=0):0===this.idle&&(c.vs="r"),c},dispose:function(){this.stopPing();for(var b in this.__l)this.__l.hasOwnProperty(b)&&(g[b][this.instanceName]=null);if(this.__l=null,"undefined"!=typeof a[this.instanceName])try{delete a[this.instanceName]}catch(c){a[this.instanceName]=void 0}}},a.WoopraTracker=m,a.WoopraLoadScript=f.loadScript,"undefined"!=typeof a.exports&&(f.Tracker=m,a.exports.Woopra=f,"function"==typeof a.woopraLoaded&&(a.woopraLoaded(),a.woopraLoaded=null));var n=a.__woo||a._w;if("undefined"!=typeof n)for(var o in n)if(n.hasOwnProperty(o)){var p=new m(o);p.init(),"undefined"==typeof a.woopraTracker&&(a.woopraTracker=p)}}(window,document);