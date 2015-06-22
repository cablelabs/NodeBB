<div id="get-started" class="info-page">
    <!-- Header -->
    <div class="row">
        <div class="col-md-12">
            <header class="header">
                <img id="header-icon" src="/images/getting-started/getting-started-icon.png" />
                <h2>GETTING STARTED</h2>
            </header>
            <p>
                Welcome to Cablelabs’ Business Technologies Portal. Learn how to access the APIs, use the API navigation tool, access and interact with the underlying model and utilize the community forums.
            </p>
        </div>
    </div> <!-- end row -->

    <div class="row">
        <!-- Navigation Buttons -->
        <div class="col-md-3 col-md-push-9 col-sm-12">
            <div id="guideline-tabs">
                <h2>Guidelines</h2>
                <ul class="nav nav-pills nav-stacked">
                    <li class="active"><a href="#access-model-info">Access Model Information</a></li>
                    <li><a href="#access-api">Access the APIs</a></li>
                    <li><a href="#entity-map">API Entity Map</a></li>
                    <li><a href="#forums">Community Forums</a></li>
                </ul>
            </div>
        </div>

        <!-- Content -->
        <div class="col-md-9 col-md-pull-3 col-sm-12">
            <div class="tab-content">

                <!-- ACCESS MODEL INFORMATION TAB -->
                <div class="tab-pane active" id="access-model-info">
                    <div class="row clearfix">
                        <div class="col-sm-1 col-md-2">
                            <img class="icon img-block" src="images/getting-started/data-model-icon.png" />
                        </div>
                        <div class="col-sm-11 col-md-10">
                            <h2>ACCESSING and INTERACTING with the MODEL INFORMATION</h2>
                            <div style="line-height: 2.1em;">
                                <p class="tab-desc" style="padding-top: .5em">
                                    All the modeling for the APIs is done through Visual Paradigm housed in a VPository account.
                                </p>
                                <p class="tab-desc">To access the model and start interacting:</p>
                                <ol class="tab-desc">
                                    <li>Download and install Visual Paradigm.</li>
                                    <li><a href="mailto:dia@Cablelabs.com?Subject=Request%20for%20Visual%20Paradigm%20Access" target="_top">Request access</a> to the VPository account, which is the central store of the models.</li>
                                    <li>Follow these steps, to setup Visual Paradigm and link the VPository account.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 4em;">
                        <div class="col-md-1"></div>
                        <div class="col-md-6">
                            <span class="header-numbers">1.</span>
                            <h3 style="margin-top:-.4em;">Make sure your version of Visual Paradigm is 11.2 or higher</h3>
                            <p style="margin: 2em 0">Run Visual Paradigm. Open the About window (Help > About) and check the installed version. Make sure you are using the following versions of products, or a higher version.</p>
                            <p>If you are running an earlier version and are entitled to version 11.2, or any higher version, please consider upgrading. If your maintenance has expired, please consider renewing it to enjoy our product upgrades.</p>
                        </div>
                        <div class="col-md-5">
                            <img src="images/getting-started/model-1.png" />
                        </div>
                    </div>
                    <div class="row" style="margin-top: 4em;">
                        <div class="col-md-1"></div>
                        <div class="col-md-6">
                            <span class="header-numbers">2.</span>
                            <h3 style="margin-top: .7em">Connect to VPository</h3>
                            <p style="margin: 2em 0">Open Teamwork Client (by selecting "Teamwork > Teamwork Client" from the menu). Choose VPository. Enter the Cloud entry point <strong>(cablelabs)</strong>, email, password and click Login.</p>
                            <p>We recommend you work on a new workspace if you are already connecting to an existing server repository.</p>
                        </div>
                        <div class="col-md-5">
                            <img src="images/getting-started/model-2.png" />
                        </div>
                    </div>
                    <div class="row" style="margin-top: 4em;">
                        <div class="col-md-1"></div>
                        <div class="col-md-6">
                            <span class="header-numbers">3.</span>
                            <h3 style="margin-top: .7em;">Getting Started</h3>
                            <p style="margin: 2em 0">Click on "File -> Open" and use the dialog to select the project that you want to open from the VPository tab.</p>
                            <p>Once the project is open, you can browse though the diagrams in the "Diagram Navigator" -> UML Diagrams -> "Class diagram"</p>
                        </div>
                        <div class="col-md-5">
                            <img src="images/getting-started/model-3.png" />
                        </div>
                    </div>
                </div>

                <!-- ACCESS THE APIs TAB -->
                <div class="tab-pane" id="access-api">
                    <div class="row clearfix">
                        <div class="col-sm-1 col-md-2">
                            <img class="icon img-block" src="images/getting-started/api-icon.png" />
                        </div>
                        <div class="col-sm-11 col-md-10">
                            <h2>ACCESSING &amp; INTERACTING with the APIs</h2>
                            <div style="line-height: 1.5em;">
                                <p class="tab-desc" style="padding-top: .5em; margin-bottom: 1em;">
                                    <strong>IMPORTANT!</strong> An API-KEY is not required to test and interact with the API while logged into the portal. In order to call an API from an external client or application you must request an API key.
                                </p>
                                <p class="tab-desc">
                                    Now that you are successfully logged into the portal, you will have the capability to interact with the API endpoints, test payloads, and review detailed descriptions within the <a href="/documentation">interactive documentation</a> section. The APIs are grouped by the following domains:
                                </p>
                                <ul class="red-dot-list">
                                    <li>
                                        <span><strong>COMMON:</strong> The Common Business Entities domain is a general area for entities that are not part of distinct domains, such as, contact information and preferences.</span>
                                    </li>
                                    <li>
                                        <span><strong>CUSTOMER:</strong> Customer is a Party Role. Entities included in this domain are Customer Bills, Customer Accounts, Customer Tax Exemptions, Customer Credit, Profiles and Customer Orders.</span>
                                    </li>
                                    <li>
                                        <span><strong>INTERACTION:</strong> The Business Interaction domain describes the interactions between diverse entities such as individuals, organizations, applications, devices and customer accounts. Business interactions take the form of requests, responses, notifications, and agreements. Customer service calls, customer orders, trouble tickets, and work orders are all in the Business Interaction domain.</span>
                                    </li>
                                    <li>
                                        <span><strong>LOCATION:</strong> The Location domain defines places, from geographic coordinates, to postal addresses, to specific floors in a building. Locations can be associated with entities in several other domains, such as, locations of Resources, Customers and their service addresses, marketing areas and business interactions.</span>
                                    </li>
                                    <li>
                                        <span><strong>PRODUCT:</strong> The Product domain describes all aspects of a service provider’s offerings to the market. The entities in the Product domain provide the framework for all details of product lifecycle from inception, market positioning, pricing and contract agreement rules, sale to a customer, and usage and performance once in use by that customer.</span>
                                    </li>
                                    <li>
                                        <span><strong>RESOURCE:</strong> The Resource domain describes all aspects of a service provider’s infrastructure. Resources are physical and logical entities that represent the definition, development, and operational aspects of a service provider’s information computing and processing infrastructure. Resources are generally consumed or used by Services (for example, a physical port assigned to a service) or contribute to the realization of a Product (for example, a SIM card).</span>
                                    </li>
                                    <li>
                                        <span><strong>SERVICE:</strong> The Service domain represents the intangible functionality provided by a service provider’s computing and information processing infrastructure. Services support Products either internally at the service provider or externally as part of the Product itself.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-md-offset-2">
                            <h4>Once you have accessed the documentation section you will have the capabilities to POST, PUT, DELETE, GET resources.</h4>
                            <img src="images/getting-started/common-api.png"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 col-md-offset-2">
                            <h4>Control Response Class, Response Content Types between json and xml, view Parameters and Response Messages right within the portal.</h4>
                            <img src="images/getting-started/common-api-get.png"/>
                            <h4>Have QUESTIONS, THOUGHTS or COMMENTS about the APIs? Join and subscribe to the <a href="/forums">Development Forum</a>.</h4>
                        </div>
                    </div>
                </div>

                <!-- API ENTITY MAP TAB -->
                <div class="tab-pane" id="entity-map">
                    <div class="row clearfix">
                        <div class="col-sm-1 col-md-2">
                            <img class="icon img-block" src="images/getting-started/entity-map-icon.png" />
                        </div>
                        <div class="col-sm-11 col-md-10">
                            <h2>INTERACTING with the ENTITY MAP</h2>
                            <div style="line-height: 1.5em;">
                                <p class="tab-desc" style="padding-top: .5em">
                                    The <a href="/entity-map">Entity Map</a> is an interactive tool that allows you to navigate the relationships between entities, view the detailed descriptions and access the documentation directly from the map. Through the entity relationships you will get on understanding of the domain relationships for the underlying data model.
                                </p>
                                <p class="tab-desc" style="margin: 2em 0">
                                    For more information about interacting with the entity map, please watch this 
                                    <a href="http://youtu.be/32dmHyHAnSI">video tutorial</a>.
                                </p>
                                <p class="tab-desc" style="margin: 2em 0">
                                    The map provides you with the capabilities to:
                                </p>
                                <div>
                                    <h4>View Complete List of Common Entities within Each Domain</h4>
                                    <img src="images/getting-started/entity-map-1.png" alt=""/>
                                    <h4 style="margin-top: 2em;">Isolate Domains and the Related Entities</h4>
                                    <img src="images/getting-started/entity-map-2.png" alt=""/>
                                    <h4 style="margin-top: 2em;">Access any Entity Definition and Documentation with One Click</h4>
                                    <img src="images/getting-started/entity-map-3.png" alt=""/>
                                    <h4 style="margin-top: 2em;">View Immediate, Secondary and Tertiary Relationships for any Entity</h4>
                                    <img src="images/getting-started/entity-map-4.png" alt=""/>
                                    <h4>Have QUESTIONS, THOUGHTS or COMMENTS about the APIs? Join and subscribe to the <a href="/forums">Development Forum</a>.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- COMMUNITY FORUMS TAB -->
                <div class="tab-pane" id="forums">
                    <div class="col-sm-1 col-md-2">
                        <img class="icon img-block" src="images/getting-started/forum-icon.png" />
                    </div>
                    <div class="col-sm-11 col-md-10">
                        <h2>UTILIZING the COMMUNITY FORUMS</h2>
                        <div style="line-height: 1.5em;">
                            <p class="tab-desc" style="padding-top: .5em">
                                The community forums allow you to interact with any user on the portal. While in the forums you will have the ability to inidvidually discuss topics with an individual user, or open your discussions for the entire user community.
                            </p>
                            <h3>QUICK TIPS:</h3>
                            <ul class="red-dot-list" style="padding-bottom: 3em">
                                <li><span>To notify specific users about a recent post, use ‘@’ followed by the user’s name to send a notification to that user.</span></li>
                                <li><span>Have questions for the CableLabs Data &amp; Information Architecture team? Use @dia-team to notify team members.</span></li>
                                <li><span>Use the RSS Feed within each forum to subscribe in order to be notified of any new posts or comments. Only interested in a specific topic in a forum? Click the “watch” icon to follow specific topics.</span></li>
                                <li><span>Update notification preferences under the “settings” section of your profile.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $('#guideline-tabs a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).tab('show');
    });
</script>