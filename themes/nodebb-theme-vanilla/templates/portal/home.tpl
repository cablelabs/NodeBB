

    <div class="container">
        <div class="row">
            <h2>Welcome to Cablelabs Portal</h2>

            <hr class="featurette-divider"/>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Curabitur sodales ligula in libero. </p>

            <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. <b>Curabitur sodales ligula in libero</b>. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>

            <p>Nam nec ante. <b>Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa</b>. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. <b>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos</b>. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. </p>

            <p>Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. <i>Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh</i>. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. </p>

            <p>Cras metus. Sed aliquet risus a tortor. <i>Suspendisse in justo eu magna luctus suscipit</i>. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. </p>
        </div>
    </div>

    <hr class="featurette-divider"/>

    <!-- Carousel
    ================================================== -->
    <div class="carousel-reviews">
        <div class="container">
            <div class="row">
                <div id="carousel-reviews" class="carousel slide" data-ride="carousel">

                    <div class="carousel-inner">
                        <div class="item active">
                            <!-- BEGIN announcements -->
                    	    <div class="col-md-4 col-sm-6">
            				    <div class="block-text rel zmin">
    						        <a title="" href="#">{announcements.name}</a>
    						        <p>{announcements.description}</p>
    							    <ins class="ab zmin sprite sprite-i-triangle block"></ins>
    					        </div>
    						</div>
    						<!-- END announcements -->
                        </div>
                        <div class="item">
                            <!-- BEGIN announcements -->
                            <div class="col-md-4 col-sm-6">
                                <div class="block-text rel zmin">
                                    <a title="" href="#">{announcements.name}</a>
                                    <p>{announcements.description}</p>
                                    <ins class="ab zmin sprite sprite-i-triangle block"></ins>
                                </div>
                            </div>
                            <!-- END announcements -->
                        </div>
                    </div>
                    <a class="left carousel-control" href="#carousel-reviews" role="button" data-slide="prev">
                        <span class="fa fa-arrow-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-reviews" role="button" data-slide="next">
                        <span class="fa fa-arrow-right"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>


    <hr class="featurette-divider"/>

    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

      <!-- START THE FEATURETTES -->

        <div class="container">
            <div class="row">
                <h2>Api Section</h2>
            </div>
        </div>

      <!-- BEGIN apis -->

        <hr class="featurette-divider"/>

          <!-- IF apis.cid -->
              <div class="row featurette">
                <div class="col-md-7">
                  <h2 class="featurette-heading">{apis.name}</h2>
                  <p class="lead">{apis.description}</p>
                </div>
                <div class="col-md-5">
                  <a href="{apis.raml_location">RAML</a>
                </div>
              </div>
          <!-- ELSE -->
              <div class="row featurette">
                <div class="col-md-5">
                  <img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="Generic placeholder image">
                </div>
                <div class="col-md-7">
                  <h2 class="featurette-heading">{apis.name}</h2>
                  <p class="lead">{apis.description}</p>
                </div>
              </div>
          <!-- ENDIF apis.cid -->
      <!-- END apis -->

</div>