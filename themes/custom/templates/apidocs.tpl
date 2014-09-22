<div class="motd">
	<div widget-area="motd"></div>
</div>

<div class="row home" itemscope itemtype="http://www.schema.org/ItemList">
	<div class="col-lg-9 col-sm-12" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">
		<div class="col-lg-9 col-sm-12" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">
                <!-- Marketing messaging and featurettes
                ================================================== -->
                <!-- Wrap the rest of the page in another container to center all the content. -->

                    <div class="container">
                        <div class="row">
                            <h2>Api Section</h2>
                        </div>
                    </div>

                  <!-- BEGIN apis -->

                  <hr class="featurette-divider"/>

                  <div class="row featurette">
                    <div class="col-md-12">
                      <h2 class="featurette-heading">{apis.name}</h2>
                      <p class="lead">{apis.description}</p>
                    </div>
                  </div>

                  <iframe class="container well well-small pull-right"
                          style="width: 100%; height: 400px; background-color: #f5e5c5;"
                          src="../console/index.html?raml={apis.raml_location}">
                  </iframe>

                  <!-- END apis -->
        </div>

	</div>
	<div widget-area="sidebar" class="col-lg-3 col-sm-12"></div>
</div>