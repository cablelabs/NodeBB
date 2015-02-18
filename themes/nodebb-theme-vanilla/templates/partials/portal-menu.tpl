            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#header-navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class="forum-logo">
                    <a href="{relative_path}/index">
                        <img class="{brand:logo:display}" src="{brand:logo}" />
                        <span><strong>DEVELOPER PORTAL</strong></span>
                    </a>
                    <!--<!-- IF showSiteTitle -->-->
                    <!--<a href="{relative_path}/">-->
                    <!--<h1 class="navbar-brand forum-title">{title}</h1>-->
                    <!--</a>-->
                    <!--<!-- ENDIF showSiteTitle -->-->

                    <div class="header-topic-title visible-xs">
                        <span></span>
                    </div>
                </div>
            </div>

            <div class="collapse navbar-collapse" id="header-navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">How-Tos<strong class="caret"></strong></a>
                        <ul class="dropdown-menu">
                            <!-- IF loggedIn -->
                            <li><a href="{relative_path}/getting-started">
                                Getting Started
                            </a></li>
                            <!--<li><a href="{relative_path}/authorization">Authorization</a></li>-->
                            <li><a href="{relative_path}/category/9/video-tutorials">
                                Video Tutorials
                            </a></li>
                            <li><a href="{relative_path}/about-cia">
                                About CIA
                            </a></li>
                            <!-- ELSE -->
                            <li><a href="{relative_path}/login">
                                Login
                            </a></li>
                            <!-- ENDIF loggedIn -->
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">APIs <strong class="caret"></strong></a>
                        <ul class="dropdown-menu">
                            <!-- IF loggedIn -->
                            <!--<li><a href="{relative_path}/api-info">General API Info</a></li>-->
                            <li><a href="{relative_path}/entity-map">
                                Entity Map
                            </a></li>
                            <li><a href="{relative_path}/documentation">
                                Documentation
                            </a></li>
                            <!--<li><a href="{relative_path}/key-management">Get a Key</a></li>-->
                            <!-- ELSE -->
                            <li><a href="{relative_path}/login">
                                Login
                            </a></li>
                            <!-- ENDIF loggedIn -->
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="{relative_path}/forums">
                            Forums<b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- IF loggedIn -->
                            <li>
                                <a href="{relative_path}/forums">
                                    <i id="forum-home" class="fa fa-fw fa-home"></i>Home
                                </a>
                            </li>
                            <li>
                                <a href="{relative_path}/unread">
                                    <i id="unread-count" class="fa fa-fw fa-inbox" data-content="0" title="[[global:header.unread]]"></i>
                                    <span class="visible-xs-inline"></span> [[global:header.unread]]
                                </a>
                            </li>
                            <li>
                                <a href="{relative_path}/recent">
                                    <i class="fa fa-fw fa-clock-o" title="[[global:header.recent]]"></i>
                                    <span class="visible-xs-inline"></span> [[global:header.recent]]
                                </a>
                            </li>
                            <li>
                                <a href="{relative_path}/tags">
                                    <i class="fa fa-fw fa-tags" title="[[global:header.tags]]"></i>
                                    <span class="visible-xs-inline"></span> [[global:header.tags]]
                                </a>
                            </li>
                            <li>
                                <a href="{relative_path}/popular">
                                    <i class="fa fa-fw fa-fire" title="[[global:header.popular]]"></i>
                                    <span class="visible-xs-inline"></span> [[global:header.popular]]
                                </a>
                            </li>
                            <!-- ELSE -->
                            <li><a href="{relative_path}/login">
                                Login
                            </a></li>
                            <!-- ENDIF loggedIn -->
                        </ul>
                    </li>
                </ul>
                <!-- IF loggedIn -->
                <ul id="logged-in-menu" class="nav navbar-nav navbar-right">
                    <li class="notifications dropdown text-center hidden-xs">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="notif_dropdown"><i class="fa fa-fw fa-bell-o" data-content="0" title="[[global:header.notifications]]"></i></a>
                        <ul id="notif-list" class="dropdown-menu" aria-labelledby="notif_dropdown">
                            <li>
                                <a href="#"><i class="fa fa-refresh fa-spin"></i> [[global:notifications.loading]]</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <!-- IF function.displayUsersLink -->
                        <a href="{relative_path}/users" title="[[global:header.users]]">
                            <i class="fa fa-fw fa-users"></i><span class="visible-xs-inline"> [[global:header.users]]</span>
                        </a>
                        <!-- ENDIF function.displayUsersLink -->
                    </li>

                    <!-- IF isAdmin -->
                    <li>
                        <a href="{relative_path}/designer">
                            <i class="fa fa-fw fa-clock-o" title="API Designer"></i>
                            <span class="visible-xs-inline">API Designer</span>
                        </a>
                    </li>
                    <!-- ENDIF isAdmin -->

                    <!-- IF isAdmin -->
                    <li>
                        <a href="{relative_path}/admin" target="_blank">
                            <i class="fa fa-fw fa-cogs" title="[[global:header.admin]]"></i>
                            <span class="visible-xs-inline"> [[global:header.admin]]</span>
                        </a>
                    </li>
                    <!-- ENDIF isAdmin -->

                    <li class="visible-xs">
                        <a href="{relative_path}/notifications">
                            <i class="fa fa-bell-o fa-fw" title="[[notifications:title]]"></i> [[notifications:title]]
                        </a>
                    </li>
                    <li class="chats dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="chat_dropdown"><i id="chat-count" class="fa fa-comment-o fa-fw" title="[[global:header.chats]]"></i> <span class="visible-xs-inline">[[global:header.chats]]</span></a>
                        <ul id="chat-list" class="dropdown-menu" aria-labelledby="chat_dropdown">
                            <li>
                                <a href="#"><i class="fa fa-refresh fa-spin"></i> [[global:chats.loading]]</a>
                            </li>
                        </ul>
                    </li>

                    <li id="user_label" class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="user_dropdown" title="[[global:header.profile]]">
                            <img id="user-header-picture" src="{user.picture}"/>
                        </a>
                        <ul id="user-control-list" class="dropdown-menu" aria-labelledby="user_dropdown">
                            <li>
                                <a id="user-profile-link" href="{relative_path}/user/{user.userslug}"><i class="fa fa-circle status {user.status}"></i> <span id="user-header-name">{user.username}</span></a>
                            </li>
                            <li id="logout-link">
                                <a href="#">[[global:logout]]</a>
                            </li>
                            <li role="presentation" class="divider"></li>
                            <li>
                                <a href="#" class="user-status" data-status="online"><i class="fa fa-circle status online"></i><span> [[global:online]]</span></a>
                            </li>
                            <li>
                                <a href="#" class="user-status" data-status="away"><i class="fa fa-circle status away"></i><span> [[global:away]]</span></a>
                            </li>
                            <li>
                                <a href="#" class="user-status" data-status="dnd"><i class="fa fa-circle status dnd"></i><span> [[global:dnd]]</span></a>
                            </li>
                            <li>
                                <a href="#" class="user-status" data-status="offline"><i class="fa fa-circle status offline"></i><span> [[global:invisible]]</span></a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- ELSE -->
                <ul id="logged-out-menu" class="nav navbar-nav navbar-right pull-right">
                    <!--<li>-->
                        <!--<!-- IF function.displayUsersLink -->-->
                        <!--<a href="{relative_path}/users" title="[[global:header.users]]">-->
                            <!--<i class="fa fa-fw fa-users"></i><span class="visible-xs-inline"> [[global:header.users]]</span>-->
                        <!--</a>-->
                        <!--<!-- ENDIF function.displayUsersLink -->-->
                    <!--</li>-->
                    <!-- IF allowRegistration -->
                    <li>
                        <a href="{relative_path}/register">
                            <i class="fa fa-pencil visible-xs-inline"></i>
                            <span>[[global:register]]</span>
                        </a>
                    </li>
                    <!-- ENDIF allowRegistration -->
                    <li>
                        <a href="{relative_path}/login">
                            <i class="fa fa-sign-in visible-xs-inline"></i>
                            <span>[[global:login]]</span>
                        </a>
                    </li>
                </ul>
                <!-- ENDIF loggedIn -->

                <ul class="nav navbar-nav navbar-right pull-right">
                    <li>
                        <a href="#" id="reconnect" class="hide" title="Connection to {title} has been lost, attempting to reconnect..."><i class="fa fa-check"></i></a>
                    </li>
                </ul>

                <div class="header-topic-title hidden-xs">
                    <span></span>
                </div>
            </div>