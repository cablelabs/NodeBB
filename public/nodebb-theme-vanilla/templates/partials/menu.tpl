

    <!-- IF loggedIn -->
    <div class="navbar-collapse collapse navbar-ex1-collapse">
        <ul id="main-nav" class="nav navbar-nav pull-left">
            <!-- IF loggedIn -->
            <li>
                <a href="{relative_path}/unread"><i id="unread-count" class="fa fa-fw fa-inbox" data-content="0" title="[[global:header.unread]]"></i><span class="visible-xs-inline"> [[global:header.unread]]</span></a>
            </li>
            <!-- ENDIF loggedIn -->

            <li>
                <a href="{relative_path}/recent"><i class="fa fa-fw fa-clock-o" title="[[global:header.recent]]"></i><span class="visible-xs-inline"> [[global:header.recent]]</span></a>
            </li>
            <li>
                <a href="{relative_path}/tags"><i class="fa fa-fw fa-tags" title="[[global:header.tags]]"></i><span class="visible-xs-inline"> [[global:header.tags]]</span></a>
            </li>
            <li>
                <a href="{relative_path}/popular"><i class="fa fa-fw fa-fire" title="[[global:header.popular]]"></i><span class="visible-xs-inline"> [[global:header.popular]]</span></a>
            </li>

            <!-- IF searchEnabled -->
            <li class="visible-xs">
                <a id="mobile-search-button" href="{relative_path}/search"><i class="fa fa-search fa-fw" title="[[global:header.search]]"></i> [[global:header.search]]</a>
            </li>
            <!-- ENDIF searchEnabled -->
            <!-- BEGIN navigation -->
            <li class="{navigation.class}">
                <a href="{relative_path}{navigation.route}" title="{navigation.title}">
                    <!-- IF navigation.iconClass -->
                    <i class="fa fa-fw {navigation.iconClass}"></i>
                    <!-- ENDIF navigation.iconClass -->

                    <!-- IF navigation.text -->
                    <span class="{navigation.textClass}">{navigation.text}</span>
                    <!-- ENDIF navigation.text -->
                </a>
            </li>
            <!-- END navigation -->
        </ul>

        <!-- IF searchEnabled -->
        <ul class="nav navbar-nav navbar-right">
            <li>
                <form id="search-form" class="navbar-form navbar-right hidden-xs" role="search" method="GET" action="">
                    <div class="hide" id="search-fields">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="[[global:search]]" name="query" value="">
                        </div>
                        <button type="submit" class="btn btn-default hide">[[global:search]]</button>
                    </div>
                    <button id="search-button" type="button" class="btn btn-link"><i class="fa fa-search fa-fw" title="[[global:header.search]]"></i></button>
                </form>
            </li>
        </ul>
        <!-- ENDIF searchEnabled -->

        <ul class="nav navbar-nav navbar-right pagination-block hidden visible-lg visible-md">
            <li class="dropdown">
                <i class="fa fa-angle-double-up pointer fa-fw pagetop"></i>
                <i class="fa fa-angle-up pointer fa-fw pageup"></i>

                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <span id="pagination"></span>
                </a>

                <i class="fa fa-angle-down pointer fa-fw pagedown"></i>
                <i class="fa fa-angle-double-down pointer fa-fw pagebottom"></i>

                <div class="progress-container">
                    <div class="progress-bar"></div>
                </div>

                <ul class="dropdown-menu" role="menu">
                    <input type="text" class="form-control" id="indexInput" placeholder="[[global:pagination.enter_index]]">
                </ul>
            </li>
        </ul>

        <div class="header-topic-title hidden-xs">
            <span></span>
        </div>
    </div>
    <!-- ENDIF loggedIn -->