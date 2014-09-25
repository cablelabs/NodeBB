
/*==============================================
 * Livefyre utilities
 *==============================================*/
var Livefyre = Livefyre || {};
Livefyre.UI = (function (self) {
  var tpls = {};

  function init(settings){
    /* Some jQuery plugins, like Chosen are still doing some browser detection  */
    jQuery.browser = {};
    jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

    configureCommentCounts();
  }

  /**
   * Update replacing count HTML to correct the grammar in the number + noun agreement.
   * Ex: 1 Comment vs. 0 Comments
   */
  function configureCommentCounts(){
    $(document).ready(function(){
      var setIntervalId, counter = 5;
      setIntervalId = setInterval(function () {
        if(!counter) {clearInterval(setIntervalId);}

        if (typeof LF == "object") {
          LF.CommentCount({
            replacer: function(element, count) {
              element.innerHTML = count +' Comment'+ (count === 1 ? '' : 's');
            }
          });
          clearInterval(setIntervalId);
        } else {
          counter--;
        }
      }, 2000);
    });
  }

  return $.extend(self,{
    init : init,
    tpls : tpls
  });
})(Livefyre.UI || {});
