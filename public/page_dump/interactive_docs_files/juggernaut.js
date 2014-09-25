/*==============================================
 * Global Juggernaut utilities
 *==============================================*/
var Juggernaut = {};
Juggernaut.utilities = (function(self){
	function strip_tags(str){
		return str.replace(/(<([^>]+)>)/ig,"")
	}

	function _resolveSimpleParams(params){
		var objDelim = '///',
			equDelim = '===',
			arrDelim = '|||',
			store = {};

		params = params.split(objDelim);
		for(var i=0;i < params.length;i++){
			(function(param){
				var key, value;

				key = param[0];
				value = param[1] || '';

				value = value.split(arrDelim);
				if(value.length === 1)value = value[0];

				store[key] = value;
			})(params[i].split(equDelim));
		}
		return store;
	}

	/************************************************
	 * urlParams - Returns search query with Appender or modified param
	 ************************************************/
	function urlParams(key, value, searchQuery)
	{
	    key = escape(key); value = escape(value);
	    var kvp = (searchQuery || document.location.search.substr(1)).split('&');
	    var i=kvp.length; var x; while(i--)
	    {
	    	x = kvp[i].split('=');
	    	if (x[0]==key)
	    	{
	    		x[1] = value;
	    		kvp[i] = x.join('=');
	    		break;
	    	}
	    }

	    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

	    return '?'+kvp.join('&');
	    //this will reload the page, it's likely better to store this until finished
	    //document.location.search = kvp.join('&');
	}


	function slugify(value, extra){
		value = value.replace(/(<([^>]+)>)/ig,"").toLowerCase();//Equivalent of php strip_tags() then lowercased

		var pattern = [/\s+/g, /[^-_a-z0-9.]/g, /_{2,}/g, /-{2,}/g, /([\D])[.]([\D])/i, /([\D])[.]([\D])/i],//Javascript global modifiers requires g modifier
			replace = ['_', '', '_', '-',  '$1$2', '$1$2'];

		/*Extras functionality not yet tested. Depending on the type of keys it has maybe it will need a for in loop
		 * Here is the php implementation
		 * if($extra) {
	        	$pattern = array_merge(array_keys($extra), $pattern);
	        	$replace = array_merge(array_keys($extra), $replace);
	    	}
		 * */
		if(typeof extra !== 'undefined'){
			pattern = pattern.concat(extra);
			replace = replace.concat(extra);
		}

		var replaceLn = replace.length;

		for(var i=0; i<replaceLn; i++){
			value = value.replace(pattern[i],replace[i]);
		}

		return value;
	}

	/************************************************
	 * Image Optimizer
	 ************************************************/
	function imgReplace(){
		$('img[data-img-src]').each(function(e){
			$(this).attr('src',this.getAttribute('data-img-src'));
			this.removeAttribute('data-img-src');
		});
	}

	/************************************************
	 * Function Debounce
	 ************************************************/
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	/************************************************
	 * Function for Throttling
	 ************************************************/
	function throttle(func, wait, immediate) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    var later = function() {
	    	previous = new Date;
	    	timeout = null;
	    	result = func.apply(context, args);
	    };
	    return function() {
	    	var now = new Date;
	    	if (!previous && immediate === false) previous = now;
	    	var remaining = wait - (now - previous);
	    	context = this;
	    	args = arguments;
	    	if (remaining <= 0) {
	    		clearTimeout(timeout);
	    		timeout = null;
	    		previous = now;
	    		result = func.apply(context, args);
	    	} else if (!timeout) {
	    		timeout = setTimeout(later, remaining);
	    	}
	    	return result;
	    };
	}

	/************************************************
	 * Range
	 ************************************************/
	function range(start, end, step) {
	    step = step || 1;
	   	var range = [];
	  	while(start <= end){
	  		range.push(start);
	  		start += step;
	  	}
	    return range;
    }

	/************************************************
	 * Remove values from an array by key. Best Used with $.unique for arrays that have duplicate values.
	 * Supports only primitive values  @params keys - primitive value(s) to remove.    @params arr - array to look through
	 ************************************************/
	function removeByVal(keys,arr){
		keys = keys instanceof Array ? keys : [keys];
		for(var i=0;i<keys.length;i++){
			arr.splice($.inArray(keys[i], arr),1);
		}
		return arr;
	}

    /**
     * Sizes the width of the slider based on the type of slider it is. It will be sized so that you can see as many
     * items as possible, while still being able to see at least 5% of the next item.
     */
    function getWidthOfSliderForScroll($el_container){
        var el_width = $el_container.innerWidth();
        var li_width = $el_container.find('ul > li').first().outerWidth();

        var max = Math.floor(el_width / li_width);
        var remainder = el_width % li_width;

        //if remainder isn't more than 5%, then make slider fit max - 1 items.
        if(remainder > .05){
            return li_width * max;
        } else {
            return li_width * (max-1);
        }
    }
    
    function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
    }
            return arr;
    }


	return {
		_resolveSimpleParams : _resolveSimpleParams,
		strip_tags : strip_tags,
		imgReplace : imgReplace,
		urlParams : urlParams,
		slugify : slugify,
		debounce : debounce,
		throttle : throttle,
		range : range,
        getWidthOfSliderForScroll: getWidthOfSliderForScroll,
        removeByVal : removeByVal,
        shuffleArray : shuffleArray
	}
})(Juggernaut.utilities || {});

/*==============================================
 * Client detection script - Detection for properties
 *==============================================*/
Juggernaut.client = (function(self){
	var sizes = [570,800];

	var attr = {
		small        	 : false,
		medium    		 : false,
		large         	 : false,
		hasTouch         : false,
		hasMouse         : false,
		screenHD         : false,
		screenSD         : false,
		inHomeScreen     : false,
		isAndroid        : false,
		isIOS			 : false,
		ltIE9			 : false,
        ltIE10			 : false
	};

	function __init(){
		var ua = navigator.userAgent.toLowerCase();

		if (screen.width <= sizes[0])attr.small = true;
		else if(screen.width <= sizes[1])attr.medium = true;
		else attr.large = true;

		attr.hasTouch = "ontouchstart" in document.documentElement || "onMSPointerDown" in document.documentElement;
		$(window).on('mousemove.juggernautClient',function(){
			attr.hasMouse = true;
			$(window).off('mousemove.juggernautClient');
		});

		if(window.devicePixelRatio >= 2)attr.screenHD = true;
		else attr.screenSD = true;

		attr.isHomeScreen = ("standalone" in window.navigator ) && navigator.standalone;

		//Browser specific - not cool but sometimes necessary :(
        var $html = $('html');
		attr.isAndroid = ua.indexOf("android") > -1;
		attr.isIOS = /(ipad|iphone|ipod)/g.test( ua );


		attr.ltIE9 = $html.is('.lt-ie9');
        attr.ltIE10 = $html.is('.lt-ie10');
	}

	__init();
	return attr;
})(Juggernaut.client || {});

/*==============================================
 * Detection for css properties
 *==============================================*/
Juggernaut.cssCheck = (function(self){
	/************************************************
	 * CSS Support - avoiding massive modernizr script
	 ************************************************/
	var _prefixes = "Moz Webkit O ms".split(" "),
		_prefixesLn = _prefixes.length,
		_properties = "transform backfaceVisibility transition animation gridRow flowFrom hyphens columnCount perspective transitionDelay transitionDuration transitionProperty".split(" "),
		_propertiesLn = _properties.length,
		_supported = {};

	function _firstSupportedPropertyName(prefixedPropertyNames, identifier) {
		var tempDiv = document.createElement("div");
		for (var i = 0; i < prefixedPropertyNames.length; ++i) {
			if (typeof tempDiv.style[prefixedPropertyNames[i]] !== 'undefined')return prefixedPropertyNames[i];
		}

		document.documentElement.className += " noCSS_" +prefixedPropertyNames[0]+ " ";
		return null;
	}

	function _checkSupported(property){
		var prefixed = [property];
		for(var e=0;e<_prefixesLn;e++){
			prefixed.push(_prefixes[e]+ (property.charAt(0).toUpperCase()+property.slice(1)));
		}
		_supported[property] = _firstSupportedPropertyName(prefixed);
	}

	for(var i=0;i<_properties.length;i++){
		_checkSupported(_properties[i]);
	}
	return _supported;
})(Juggernaut.cssCheck || {});

Juggernaut.evCheck = (function(self){
	var _transition = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };
	return {
		transitionEnd: _transition[self.transition]
	};
})(Juggernaut.cssCheck || {});




/* =============================================================================
Fake console function where not available to prevent errors
========================================================================== */
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* =============================================================================
Event Switch for scenarios where selecting one or the other makes most sense
========================================================================== */
var clkType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

/* =============================================================================
Special device classes
========================================================================== */
(function(cl, dox){
	var className = dox.className || "";
	if(cl.hasTouch) className += " device_HASTOUCH ";
	else className += " device_NOT_HASTOUCH ";

	if(cl.small)className += " device_SMALL ";
	else if(cl.medium)className +=  " device_MEDIUM ";
	else className +=  " device_LARGE ";

	if(cl.screenHD)className += " device_SCREENHD ";
	else if(cl.screenSD)className +=  " device_SCREENSD ";

	if(cl.isAndroid)className += " device_ISANDROID";
	if(cl.isIOS)className += " device_ISIOS";

	dox.className = className;
})(Juggernaut.client, document.documentElement);


/* =============================================================================
 Useful jQuery plugins and functions from grapevine.js
 ========================================================================== */

/**
 * Checks to see if an element is overflowing it's bounds.
 * @return {Boolean}
 */
$.fn.isOverflowing = function(){
    var el = $(this).get(0);
    var curOverflow = el.style.overflow;
    if ( !curOverflow || curOverflow === "visible" ){
        el.style.overflow = 'hidden';
    }
    var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
};

(function($){

    /**
     * Centers an element, with regards to its container.
     * It can center on horizontal, vertical, or both axis.
     * Container defaults to it's immediate parent if not provided.
     * Axis defaults to 'xy' if not provided.
     * @param map
     */
    $.fn.centerPos = function(map){

        var settings = $.extend( {
            axis: 'xy', //can be x, y, or xy
            container: $(this).parent()
        }, map);

        $(this).css('position', 'absolute');

        var pos = 0;

        if(settings.axis === 'y' || settings.axis === 'xy'){
            var containerHeight = settings.container.outerHeight();
            pos = containerHeight/2 - $(this).outerHeight()/2;
            $(this).css('top', pos + 'px');
        }

        if(settings.axis === 'x' || settings.axis === 'xy'){
            var containerWidth = settings.container.outerWidth();
            pos = containerWidth/2 - $(this).outerWidth()/2;
            $(this).css('left', pos + 'px');
        }
    };

})(jQuery);


(function($){

    /**
     * jQuery support for spin.js
     * @param opts
     * @param color
     * @return {*}
     */
    $.fn.spin = function(opts, color) {
        var presets = {
            "tiny": { lines: 8, length: 2, width: 2, radius: 3 },
            "small": { lines: 8, length: 4, width: 3, radius: 5 },
            "large": { lines: 10, length: 8, width: 4, radius: 8 }
        };
        if (Spinner) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data();

                if (data.spinner) {
                    data.spinner.stop();
                    delete data.spinner;
                }
                if (opts !== false) {
                    if (typeof opts === "string") {
                        if (opts in presets) {
                            opts = presets[opts];
                        } else {
                            opts = {};
                        }
                        if (color) {
                            opts.color = color;
                        }
                    }
                    data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
                }
            });
        } else {
            throw "Spinner class not available.";
        }
    };

})(jQuery);

(function($){
    /**
     * Scroll to a specific element or position. Refers to its parent, unless 'document' value is provided for
     * relativeTo parameter. Will only scroll in one direction (you can thank iOS Safari for that). It will choose the
     * direction that is the greater distance.
     * @param opts
     * @return {*}
     */
    $.fn.scrollToPlace = function(opts){

        opts = $.extend({
            targetId: null,
            scrollX: null,
            scrollY: null,
            offsetTop: 0,
            offsetLeft: 0,
            duration: 500,
            easing: 'swing',
            callback: function(){},
            relativeTo: 'parent', //can be parent or document,
            forceAxis: null, //null, y, x,
            previous_stop: true,
            previous_clear_queue: false,
            previous_jump_to_end:false
        }, opts);

        function animate(css_map, callback){
            var callback_called = false;

            //previous animation control
            if(opts.previous_stop){
                scrollPane.stop(opts.previous_clear_queue, opts.previous_jump_to_end);
            }

            scrollPane.animate(css_map, opts.duration, opts.easing, function(){
                if(!callback_called){ //prevent double if multiple selector
                    callback();
                    callback_called = true;
                }
            });
        }

        var scrollPane, target = opts.targetId ? $('#' + opts.targetId) : null;

        //get position of scrollTarget
        if(target !== null){
            if(opts.relativeTo === 'parent'){
                opts.scrollY = target.position().top - parseInt(opts.offsetTop);
                opts.scrollX = target.position().left - parseInt(opts.offsetLeft);
            } else {
                opts.scrollY = target.offset().top - parseInt(opts.offsetTop);
                opts.scrollX = target.offset().left - parseInt(opts.offsetLeft);
            }
        }

        //if this is 'document', 'body', or 'html', make it $('html,body')
        if(this == document || this == document.body || this == $('html')[0]){
            scrollPane = $('html,body');
        } else {
            scrollPane = $(this);
        }

        var deltaY = Math.abs(opts.scrollY - scrollPane.scrollTop());
        var deltaX = Math.abs(opts.scrollX - scrollPane.scrollLeft());

        if(deltaY > deltaX || opts.forceAxis == 'y'){
            animate({scrollTop: opts.scrollY}, opts.callback);
        } else {
            animate({scrollLeft: opts.scrollX}, opts.callback);
        }

        return scrollPane;
    };
})(jQuery);


function htmlspecialchars(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    }
    return str;
}

function rhtmlspecialchars(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&quot;/ig, '"');
        str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
    }
    return str;
}

function parseJsonAttr(val){
    return $.parseJSON(rhtmlspecialchars(val));
}

/**
 * Does a redirect.
 * @param url
 */
function go2(url){
    window.location = url;
}

/**
 * Stops an event from bubbling.
 * @param e
 */
function stopBubbling(e){
    if (!e)
        e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    //IE8 and Lower
    else {
        e.cancelBubble = true;
    }
}


/* =============================================================================
 EASING
 ========================================================================== */
$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    }
});

/* =============================================================================
 Hide address bar & scroll-to-top iphone hack
 ========================================================================== */

if(Juggernaut.client.hasTouch){
    window.addEventListener("load",function() {
        setTimeout(function(){
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 0);
    });
}

/* =============================================================================
jQuery function to resize text to fit container
 ========================================================================== */

(function($){


    /**
     * Makes text fit inside container by making text smaller incrementally until the container no longer overflows.
     * @param $overflowingDiv
     * @param precision //in % (default: 1)
     * @param minSize (default: 50)
     * @param maxSize (default: 125)
     * @param $fontSizeControlDiv
     * @param frank_myers //go back this much after increasing text size, to fix some rendering issues with text
     *        (default is 0)
     */
    Juggernaut.utilities.makeTextFit = function($overflowingDiv, precision, minSize, maxSize, $fontSizeControlDiv, frank_myers){

        precision = precision || 1;
        minSize = minSize || 50;
        maxSize = maxSize || 125;
        $fontSizeControlDiv = $fontSizeControlDiv || $(this);
        frank_myers = frank_myers ? frank_myers : 0;

        if(!$overflowingDiv.is(':visible')){
            return;
        }

        //to get default starting font size, take average of min and max.
        var defaultRelSize = Math.round((minSize + maxSize) / 2);

        //see if a size has already been set. we store our value in data-fontsize, since what we get back from
        //$.css('font-size') is unreliable, and usually in px.
        var relSize = $fontSizeControlDiv.data('fontsize') || defaultRelSize;

        //set font size and data-fontsize
        function setSize(size){
            $fontSizeControlDiv.css('font-size', size + '%');
            $fontSizeControlDiv.data('fontsize', size);
        }
        setSize(relSize);

        //status keeps track if we're increasing or decreasing
        var status = null;

        //make smaller to fit ?
        while($overflowingDiv.isOverflowing() && relSize > minSize){
            //make smaller
            status = 'decreasing';
            relSize -= precision;
            setSize(relSize);
        }

        //make bigger to fit ?
        if(status == null){
            while(!$overflowingDiv.isOverflowing() && relSize < maxSize){
                //make bigger
                status = 'increasing';
                relSize += precision;
                setSize(relSize);
            }
            //go back one
            if(status == 'increasing'){
                relSize -= precision + frank_myers;
                setSize(relSize);
            }
        }

    }
})(jQuery);

/* =============================================================================
 Truncate text container to n number of lines
 ========================================================================== */
(function($){
    /**
     * Truncates a jQuery object to n number of lines. If any truncation is applied, class 'ellipsis' is added.
     * @param n
     */
    $.fn.truncateByLine = function(n){

        var $this = $(this);
        var goalHeight = getGoalHeight();

        //do some sanity tests
        if(!$this.html() || !goalHeight || !n){
            return;
        }
        var oldHTML = $this.html();

        var content_tokens = [];

        //trim function
        if (!String.prototype.trim) {
            String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
        }

        $this.html($this.html().trim());

        //if we're over our goal height, add class and start truncating
        if($this.innerHeight() > goalHeight){
            var content_removed = [];
            if (!(arguments[1] === "listbannertext")) {
                $this.addClass('ellipsis');
                content_tokens = $this.html();
                content_tokens = content_tokens.split(' ');
                while($this.innerHeight() > goalHeight){
                  var popped = content_tokens.pop();
                  content_removed.push(popped);
                    $this.html(content_tokens.join(' ').trim());
                }
            } else {
                $(this).prev().css('margin-top', '0px');
            }

            if (arguments[1] === "relatedProducts") {
                       var reversed = content_removed.reverse();
                       return reversed.join(' ').trim();
            }
        }

        /**
         * Simulate line height by temporarily making the HTML n number of lines
         * @return {*}
         */
        function getGoalHeight(){
            var content = $this.html();
            $this.html(getNLineHTMLString(n));
            var goalHeight = $this.innerHeight() + 3; //adding 3px to account for slight font discrepancies
            $this.html(content); //put it back
            return goalHeight;
        }

        /**
         * Returns a string that is n number of lines
         * @param n
         * @return {String}
         */
        function getNLineHTMLString(n){
            var output = [];
            for(i=0; i<n; i++){
                output.push('M');
            }
            return output.join("<br>");
        }

    };
})(jQuery);

/*********************************************************************
 * jQuery tap event.  Non touch devices use click event, otherwise touch, and touchend  do the job.
 *********************************************************************
(function($){
	var _isTouch = "ontouchstart" in document.documentElement, elems = $([]);
	function touchHandler(e){
		var $elem = $(e.target),$this = $(this);
		$elem.on('touchend.jtapEv', function(e){
			setTimeout(function(){
				$elem.trigger( 'jtap' );
			}, 300);//Delay prevents erroneous propagation
			$elem.off('touchend.jtapEv');
	    });
		$elem.on('touchmove.jtapEv', function(e){
			$elem.off('touchend.jtapEv');
	    });

	}
	function noTouchHandler(e){
		var $elem = $(e.target);
		$elem.trigger( 'jtap' );
	}
	$.event.special.jtap = {
		setup: function() {
			elems = elems.add( this );
			if ( elems.length === 1 ) {//On fist binding attach appropriate handler
				if(_isTouch)$(document).on('touchstart', touchHandler);
				else $(document).bind( 'click', noTouchHandler );
			}
		},
		teardown: function() {// Remove this element adn bindings from the internal collection.
			elems = elems.not( this );
			if ( elems.length === 0 )$(document).unbind( 'click', click_handler );
		}
	};
})(jQuery);*/

/*********************************************************************
 * jQuery tap event, which should be standard on all browsers! -_-
 *********************************************************************/

(function($){
    var tap_timeout = 1000;
    var tolerance = 10;
    var $document = $(document);
    var timeout, $startTarget;

    // Prevents "ghost clicks" on touch devices. Sounds scary!
    var clickbuster = {
        tolerance: 25,
        timeout: 2500,
        coords: [],
        preventClick: function(x, y){
            clickbuster.coords.push({x: x, y: y});
            setTimeout(function(){
                clickbuster.coords.pop();
            }, clickbuster.timeout);
        },
        onClick: function(e){
            for (var i = 0; i < clickbuster.coords.length; i++) {
                var p = clickbuster.coords[i];
                if (Math.abs(e.clientX - p.x) < clickbuster.tolerance && Math.abs(e.clientY - p.y) < clickbuster.tolerance) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        }
    };

    function onTouchStart(e){
        var touchStart = e;
        $startTarget = $(e.target);
        var touches = e.originalEvent.touches;
        if(touches.length > 1) return;
        var startX = touches[0].clientX;
        var startY = touches[0].clientY;
        timeout = setTimeout(cancel, tap_timeout); //hold vs. tap timeout

        $startTarget.on('touchend.jt', function(e){

            //see if finger moved too far
            var start_event = touchStart.originalEvent;
            var end_event = e.originalEvent.changedTouches[0];
            var start = {x: start_event.pageX, y: start_event.pageY};
            var end = {x: end_event.pageX, y: end_event.pageY};
            if(Math.abs(end.x - start.x) > tolerance || Math.abs(end.y - start.y) > tolerance){
                cancel();
                return;
            }

            var jtap = jQuery.Event("jtap");
            jtap.originalEvent = e;
            jtap.touchStart = touchStart;
            if($(this).data('jtap')) clickbuster.preventClick(startX, startY);
            $startTarget.trigger(jtap); //It's a tap!!
            cancel(); //cleanup
        });

    }

    function onClick(e){
        var jtap = jQuery.Event("jtap");
        $startTarget = $(e.target);
        jtap.originalEvent = e;
        $startTarget.trigger(jtap); //It's a tap!!
    }

    /**
     * Cancels the gesture and removes internal event listeners.
     */
    function cancel(){
        $startTarget.off('touchend.jt');
        clearTimeout(timeout);
    }

    if(document.addEventListener)document.addEventListener('click', clickbuster.onClick, true);//Ensure IE8 does not break appart
    $document.on('touchstart.jt', onTouchStart);
    $document.on('click.jt', onClick);


})(jQuery);


/*********************************************************************
 * BRIGHTCOVE PLAYER - Make sure context loads mustache template for this to work
 *********************************************************************/
(function(){
	$(document).on('click.marvelvideo','*[data-dpop-marvelvideo]',function(e){
		e.preventDefault();
		//Setup template
		var settings;
		try{
			settings = JSON.parse(this.getAttribute('data-dpop-marvelvideo'));
			if(typeof settings !== "object")settings = {id: settings};//assumes settings returns the number directly
		}
    	catch(e){settings = {id:this.getAttribute('data-dpop-marvelvideo')};}
    	if( !("host" in settings) )settings.host = window.location.host;

		var tplData = {
	            entity : {id: settings.id},//This ID doesn't matter since we are using brightcove's param
	            helpers: {siteName : {'siteName()' : {marvel : settings.host}}}//Emulate backend helper
	        },
	        tplOut = Mustache.render('<div data-marvelwidget-video="'+settings.id+'"></div>');
		dPop.create(tplOut, {css:'popVideo', onhide: function(){
			$('#dPopWin [data-marvelwidget-video]').remove();
		}});
		MarvelWidgets.video.create(settings.id,{host: settings.host, urlParams: {autoStart: true} },{
			playerId: 2235678034001
		});
	});
})();


/*********************************************************************
 * BRIGHTCOVE PLAYER - Make sure context loads mustache template for this to work
 *********************************************************************/
$(document).on('submit', ".findashop", function(e){
	e.preventDefault();
    var zipcode = $(this).find("#input-zipcode").val();
    window.open("/comics/locator/?zipcode="+zipcode,"_blank","width=470, height=695, scrollbars=yes, toolbar=no, menubar=no, status=no");
    return false;
});

function newsletterAjax(){
/* Ajax call to add the user to the Press List Newsletter */
   var ajaxObj = {
        url      : '/checkout/newsletter',
        data : { 'moduleId' : 35}
    };
    $('#sign-up-press-list-link').on('click', function(ev){
        $.ajax(ajaxObj).then(function(response){
            if(! $.isEmptyObject(response)){
                $('#sign-up-press-list').hide();
                $('.thank-you-press-list').show();
            }
            else{
                $('.error-press-list').show();
            }
        });
    });

    $('.thank-you-press-list button').on('click', function(ev){
        dPop.hide();
    });
}

$(document).ready(function() {

    /* Brace yourself. very specific code ahead */
    /* This is to display a pop up for a press list dialog */

    $('#related-media-for-vip a[href$="checkout/newsletter"]').on('click', function(){
        dPop.create(tplToJs.mustache.pressListPop, {css: 'press-list-pop'});
        newsletterAjax();
        return false;
    });

});

Juggernaut.mustache = (function($){
    var templates = {};
    /**
     * Fetches a compiled Mustache template. Only compiles on the first request.
     * @return {Object}
     * @constructor
     */
    function load(id){
        if(!templates[id])templates[id] = Mustache.compile(tplToJs.mustache[id]);
        return templates[id];
    }

    function hasTpl(id){
    	return !templates[id] ? false : true;
    }

    return {
        load  : load,
        hasTpl: hasTpl
    }
})(jQuery);


/*********************************************************************
 * FOR AUTOMATED TESTING
 *********************************************************************/
Juggernaut.selenium = '';
$(window).on('load', function(){
    function ready(){
        $('body').append('<input type="hidden" id="selenium-on-load">');
    }
});

/********************************************************************
* Browser Support
*********************************************************************/
if (!window.location.origin) { // for IE or any browser that doesn't support window.location.origina
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}