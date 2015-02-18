<script type="text/javascript">
    $('#guideline-tabs a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).tab('show');
    });
</script>


<div id="about-cia" class="info-page">
    <!-- Header -->
    <div class="row">
        <div class="col-md-12">
            <header class="header">
                <img id="header-icon" src="/images/about-cia/About-CIA-Icon.png" />
                <h2>About Cable Information Architecture (CIA)</h2>
            </header>
            <p>
                This section will provide you with an overview of what the CIA project is, how the engagement process with CableLabs works and what resources & tools are available.
            </p>
        </div>
    </div> <!-- end row -->

    <div class="row">
        <!-- Navigation Buttons -->
        <div class="col-md-3 col-md-push-9 col-sm-12">
            <div id="guideline-tabs">
                <h2>Guidelines</h2>
                <ul class="nav nav-pills nav-stacked">
                    <li class="active"><a href="#project-overview">Project Overview</a></li>
                    <li><a href="#engagement-process">Engagement Process</a></li>
                </ul>
            </div>
        </div>

        <!-- Content -->
        <div class="col-md-9 col-md-pull-3 col-sm-12">
            <div class="tab-content">

                <!-- Project Overview Tab -->
                <div class="tab-pane active" id="project-overview">
                    <div class="row clearfix">
                        <div class="col-sm-1 col-md-2">
                            <img class="tab-title-img icon" src="images/about-cia/Project-Overview-Icon.png" />
                        </div>
                        <div class="col-sm-11 col-md-10">
                            <h2>Project Overview</h2>
                            <div style="line-height: 1.5em;">
                                <p class="tab-desc" style="padding-top: .5em; margin-bottom: 1em;">
                                    The CIA project is a Cable Industry led initiative focused on enabling seamless information flow and increased automation across platforms, locations and incompatible system interfaces.
                                </p>
                                <h3>The Foundational Focus</h3>
                                <p class="tab-desc">
                                    The initiative is focused on cable operators’ management and operations, specifically fulfillment (quote to cash) and service assurance. The focus is then broken down into five major contributing components:
                                </p>
                                <ul class="icon-list">
                                    <li>
                                        <img class="icon" src="images/about-cia/Automated-Fulfillment-Icon.png" alt="Automated Fulfillment">
                                        <div>
                                            <h4>Automated Fulfillment</h4>
                                            <p>Improve/automate data flow for the order-to-activation process by targeting key interface points between B/OSS and provisioning platforms.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <img class="icon" src="images/about-cia/Customer-Data-Icon.png" alt="Customer Data">
                                        <div>
                                            <h4>Unified Customer Data</h4>
                                            <p>Enable a unified view of customer data for use in self-service portals, operational analytics, and e-bonding.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <img class="icon" src="images/about-cia/Integrated-Inventory-Icon.png" alt="Integrated-Inventory">
                                        <div>
                                            <h4>Integrated Inventory Data</h4>
                                            <p>Provide a single, integrated view of enterprise Services and Resources for consumption by upstream B/OSS platforms.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <img class="icon" src="images/about-cia/Location-Services-Icon.png" alt="Location Services">
                                        <div>
                                            <h4>Location Services</h4>
                                            <p>Unify location data through a standard API for usage across the B/OSS, with a specific focus on serviceability and enabling location-based services.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <img class="icon" src="images/about-cia/Operational-Analytics-Icon.png" alt="Operational Analytics">
                                        <div>
                                            <h4>Operational Analytics</h4>
                                            <p>Bring together in “near real-time” customer usage data, interactions, and contextual service assurance data to deliver improved customer experience and provide customer-centric operational insight.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-md-offset-2">
                            <img src="images/about-cia/Focus-Visual.png"/>
                            <h3 class='larger'>
                                The Approach to Transition from Logical Resources to Physical Implementation
                            </h3>
                            <p class="larger">
                                Utilizing a common data architecture, the project leverages existing standards, foundational data models (customer, products, location, resources, etc.) and agile software methodologies, working directly with Cable Operators in production environments, to build a rich, highly reusable API library which is referred to as the CIA Core. The Core is housed in the API section of this portal and designed to be easily and directly accessible by our Members and Suppliers. Below Illustrates the approach:
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-md-offset-2 larger italic-headers">
                            <h4>
                                Aggregate, Distill &amp; Extend Existing Standards/Data Models into Cable-Centric Common Data Architecture
                            </h4>
                            <img class="long-img" src="images/about-cia/Aggregating-Insight-Visual.png"/>
                            <h4>Interface Design from Logical to Physical</h4>
                            <img class="long-img" src="images/about-cia/Interface-Design-Visual.png"/>
                            <h4>Transition from Logical Design To Physical Design</h4>
                            <img class="long-img" src="images/about-cia/Transition-From-Logical-to-Physical-Visual.png"/>
                            <h4>Implementation of Physical Rources</h4>
                            <img class="long-img" src="images/about-cia/Implementation-Visual.png"/>
                        </div>
                    </div>
                </div>

                <!-- Project Overview Tab -->
                <div class="tab-pane" id="engagement-process">
                    <div class="row clearfix">
                        <div class="col-sm-1 col-md-2">
                            <img class="tab-title-img icon" src="images/about-cia/Engagement-Icon.png" />
                        </div>
                        <div class="col-sm-11 col-md-10">
                            <h2>Engagement Process</h2>
                            <div style="line-height: 1.5em;">
                                <p class="tab-desc" style="padding-top: .5em; margin-bottom: 1em;">
                                    With every engagement the goal is to accelerate development and deployment while creating the extensible solution to support future operational demand and support. The illustartion below depicts how CableLabs works with participating Members and Suppliers in lockstep through their projects:
                                </p>
                                <img class="large-visual" src="images/about-cia/Engagement-Process-Visual.png" alt="Engagement Process">
                                <h3>How the Engagement Works</h3>
                                <ul class="red-dot-list">
                                    <li>
                                        <span>Engagements start with a funded member project that fits within the scope of the focus of management and operations and projects that focus on new build or greenfield opportunities.</span>
                                    </li>
                                    <li>
                                        <span>Once the project has been identified, the CableLabs team works to ensure that 80% of the new development can be reused among the industry.</span>
                                    </li>
                                    <li>
                                        <span>A gap analysis is conducted to determine what artifacts can be reused and what extentions are required. This is where the development and deployment speed come into play.</span>
                                    </li>
                                    <li>
                                        <span>The DIA team then works to map the existing artifacts into the members project. Development of new extensions are then applied and capurted for industry reuse.</span>
                                    </li>
                                    <li>
                                        <span>Once the member project is to be released into a production environment the DIA team works in conjunction with the members to ensure a successful launch.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- end of tab content -->
        </div>
    </div>
</div>