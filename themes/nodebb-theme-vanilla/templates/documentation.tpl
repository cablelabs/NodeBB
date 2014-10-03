
    <div class="motd">
    	<div widget-area="motd"></div>
    </div>

    <script language="text/javascript">
      function resize(id){
          alert("Trying to resize");
          var newheight;
          var newwidth;

          if(document.getElementById(id)){
              newheight=document.getElementById(id).contentWindow.document .body.scrollHeight;
              newwidth=document.getElementById(id).contentWindow.document .body.scrollWidth;
          }
          document.getElementById(id).height= (newheight) + "px";
          document.getElementById(id).width= (newwidth) + "px";
      }
    </script>

    <iframe seamless src="swagger/index.html" scrolling="auto" width="100%" height="1000px" id="apidocs" padding-top="30px" marginheight="0" frameborder="0" onresize="resize('apidocs');" />