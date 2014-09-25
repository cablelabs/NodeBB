var spec_search_copy_url = "";
jQuery(document).ready( function($) {


    $('.search_form #q').focus(function(){
        $(this).addClass('field_black');
        $(this).removeClass('field_gray');
    });
    $('.search_form #q').blur(function() {
        if($(this).val() == '' || $(this).val() == 'Enter Search Term...'){
            $(this).removeClass('field_black');
            $(this).addClass('field_gray');
            
            
        }else{
            $(this).addClass('field_black');
            $(this).removeClass('field_gray');
        }
    });
    
    
    $('.search_form #specification_cat, .search_form #specification_subcat, .search_form #specification_type').focus(function(){
        $(this).parent().children('.customSelect').addClass('field_black');
        $(this).parent().children('.customSelect').removeClass('field_gray');
    });
    $('.search_form #specification_cat, .search_form #specification_subcat, .search_form #specification_type').blur(function() {
        if($(this).val() == '' || $(this).val() == 'Enter Search Term...'){
            $(this).parent().children('.customSelect').removeClass('field_black');
            $(this).parent().children('.customSelect').addClass('field_gray');
        }else{
            $(this).parent().children('.customSelect').addClass('field_black');
            $(this).parent().children('.customSelect').removeClass('field_gray');
        }
    });


    /*
	$('.inno_items li').click(function() {
		var i = $(this).index();
		$('.inno_banner li').removeClass('active');
		$('.inno_banner li').eq(i).addClass('active');
		return false;
	});
	
	*/

    $('.results_list li .row-download').each(function() {
        var h = $(this).parent().height();
        $(this).css('height', h + 'px');
    });

    $('.vendor_box').eq(2).addClass('vendor_box_edge');
    $('.vendor_box').eq(5).addClass('vendor_box_edge');
    $('.vendor_box').eq(8).addClass('vendor_box_edge');
    $('.vendor_box').eq(11).addClass('vendor_box_edge');
	
    //----------------comm used----------------------------
	
    $('li:first-child').addClass('first-item');
	
    $('li:last-child').addClass('last-item');	
	
    // nav footer
	
    $('#nav-footer > li > a').each(function() {
        var h = $(this).html();
        var href = $(this).attr('href');
        $(this).replaceWith('<h6><a href="' +href+ '">' + h + '</a></h6>');
    });
	
    $('#nav-footer .col .sub-menu').removeClass('sub-menu');
	
    $('#nav-footer .col > a').remove();
	
    $('#nav-footer .sub-menu li ul').unwrap();
	
    $('#nav-footer .sub-menu ul').unwrap();
	
    $('#nav-footer > li').addClass('foot_links');
	
    $('#nav-footer > li.menu-item').each(function() {
        var i = $(this).index() + 1;
        if (i % 3 == 0) {
            $(this).addClass('foot_links_last');
        };
    });
	
    $('#nav-footer > li.menu-item').each(function() {
        var i = $(this).index() + 1;
        if (i == 3) {
            $(this).after('<li class="clear"></li>');
        };
    });
	
	
    // nav header
	
    $('#nav-header').hide();
    $('#nav-header .sub-menu .text > a').each(function() {
        var h = $(this).html();
        $(this).replaceWith('<p>' + h + '</p>');
    });
	
    $('#nav-header .sub-menu').wrap('<div class="sub_menu"><div class="menu_col"></div></div>').removeClass('sub-menu');	
    $('#nav-header .sub_menu .sub_menu .menu_col ul').unwrap().unwrap();
    $('#nav-header .sub_menu .text').each(function() {
        $(this).replaceWith('<div class="menu_col">' + $(this).html() + '</div>');
    });
    $('#nav-header .first-item .sub_menu .menu_col').unwrap();
    $('#nav-header .first-item .menu_col .menu_col').last().addClass('menu_col_last');
    $('#nav-header .first-item .menu_col .menu_col').parent().removeClass('menu_col').addClass('sub_menu');
    $('#nav-header .first-item .sub_menu').addClass('sub_menu1');
    $('#nav-header').show();
	
    /////////////////////////////////
	
    $('.mobile_nav .sub-menu .text > a').each(function() {
        var h = $(this).html();
        $(this).replaceWith('<p>' + h + '</p>');
    });
	
    $('.mobile_nav .sub-menu').wrap('<div class="sub_menu"><div class="menu_col"></div></div>').removeClass('sub-menu');	
    $('.mobile_nav .sub_menu .sub_menu .menu_col ul').unwrap().unwrap();
    $('.mobile_nav .sub_menu .text').each(function() {
        $(this).replaceWith('<div class="menu_col">' + $(this).html() + '</div>');
    });
    $('.mobile_nav .first-item .sub_menu .menu_col').unwrap();
    $('.mobile_nav .first-item .menu_col .menu_col').last().addClass('menu_col_last');
    $('.mobile_nav .first-item .menu_col .menu_col').parent().removeClass('menu_col').addClass('sub_menu');
    $('.mobile_nav .first-item .sub_menu').addClass('sub_menu1');
	
    /////////////////////////////////
	
    $('#nav_main > ul > li').addClass('lev1');
    $('#nav_main > ul > li > a').addClass('link');
	
    //$('#nav-header').show();
	
    //header share and search
	
	
	
    $('#i_share').click( function(){
        if( $('#follow_us').is(':visible')==false ){
            $('#follow_us, #search_form').hide();
            $('#follow_us').show();
            $('#i_share, #i_search').removeClass('on');
            $(this).addClass('on');
        }else{
            $('#follow_us, #search_form').hide();
            $(this).removeClass('on');
        }
        return false;
    });
	
    $('#i_search').click( function(){
        if( $('#search_form').is(':visible')==false ){
            $('#follow_us, #search_form').hide();
            $('#search_form').show();
            $('#i_share, #i_search').removeClass('on');
            $(this).addClass('on');
        }else{
            $('#follow_us, #search_form').hide();
            $(this).removeClass('on');
        }
        return false;
    });
	
	
    //mobile version search pop
    $('.mobile_search span').click( function(){
        $(this).parent().toggleClass('on');
        return false;
    });
	
    //mobile menu
    $('.mobile_menu').click( function(){
        $('body').toggleClass('activeMenu');
    });
	
    $('.mobile_nav>li').addClass('lev1');
    $('.mobile_nav>li>a').addClass('link');
    $( ".mobile_nav li" ).each(function(){
        if($(this).find('.sub_menu').length){
            $(this).find('a.link').after('<span> </span>');
        }
    });
    $('.mobile_nav li span').click( function(){
        $(this).next().slideToggle();
        $(this).toggleClass('on');
        return false;
    });
	
	
	

    //----------------2.0-Innovations----------------------------
	
    /*
	$('.inno_banner').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		sync: '.inno_items'
	});
	
	$('.inno_items').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 210,
		itemMargin: 5,
		asNavFor: '.inno_banner'
	});
	*/
	
    function am_inno_banner(pages){
        $('.inno_banner').flexslider({
            animation: "fade",
            //easing: "easeInOutExpo",
            animationSpeed: 400,
            slideshowSpeed: 4000,
            directionNav: false,
            controlNav: true,
            slideshow: false,
            start: function(slider) {
                $('.inno_items .slides li a').click(function(event){
                    event.preventDefault();
                    var which_index = $(this).parent().index();
                    if($(window).width() < 700){
                        $('.inno_banner .flex-control-nav a').eq(which_index-1).trigger('click');
                    }
                    else{
                        $('.inno_banner .flex-control-nav a').eq(which_index).trigger('click');
                    }
                    if(pages)
                        $( '.inno_banner > .flex-control-paging li:eq('+(which_index-1)+') a' ).addClass( "flex-active" );
                    $('html,body').animate({
                        'scrollTop' : '0'
                    },500);
                });
            }
        });
    }
	
	
	
    //mobile version items slider
    function flexdestroy(selector) {
        var el = $(selector);
        var elClean = el.clone();
	
        elClean.find('.flex-viewport').children().unwrap();
	
        elClean
        .removeClass('flexslider')
        .find('.clone, .flex-direction-nav, .flex-control-nav')
        .remove()
        .end()
        .find('*').removeAttr('style').removeClass (function (index, css) {
            return (css.match (/\bflex\S+/g) || []).join(' ');
        });  
	
        elClean.insertBefore(el);
        el.remove();        
    }
	
	

    function items_slider(){
        var w=$(window).width();
        $('.home_inno_items .flex-control-nav, .home_inno_items .flex-direction-nav').hide();
        //alert(w);
        if ( w>=700 && w<960 ){
            console.log(w);
            flexdestroy('.inno_items');
            var item_width = 240;
            
            flexdestroy('.home_inno_items');
            $('.home_inno_items').flexslider({
                animation: "slide",
                //easing: "easeInOutExpo",
                animationSpeed: 400,
                slideshowSpeed: 4000,
                directionNav: true,
                controlNav: true,
                slideshow: false,
                smoothHeight: true,
                itemWidth: item_width
            } );
			
            $('.floating_icons div').mouseover( function(){
                $(this).addClass('on');
                return false;
            });
            $('.floating_icons div').mouseout( function(){
                $(this).removeClass('on');
                return false;
            });
            flexdestroy('.inno_banner');
            am_inno_banner(false);
			
				
        }else if ( w<700 ){
            flexdestroy('.inno_banner');
            am_inno_banner(true);
            $('.inno_items').flexslider({
                animation: "slide",
                //easing: "easeInOutExpo",
                animationSpeed: 400,
                slideshowSpeed: 4000,
                directionNav: false,
                controlNav: true,
                slideshow: false
            });
            flexdestroy('.home_inno_items');
            $('.home_inno_items').flexslider({
                animation: "slide",
                //easing: "easeInOutExpo",
                animationSpeed: 400,
                slideshowSpeed: 4000,
                directionNav: true,
                controlNav: false,
                slideshow: false,
                smoothHeight: true,
                after: function(slider) {
                    $('.inno_now span').text(slider.currentSlide+1);
                },
                start: function(slider) {
                    $('.inno_now strong').text(slider.count);
                }
            } );
        }else{
            flexdestroy('.inno_items');
            flexdestroy('.home_inno_items');
            if($('.home_inno_items .slides li').length<5)
                var item_width = 320;
            else
                var item_width = 320;
            $('.home_inno_items').flexslider({
                animation: "slide",
                //easing: "easeInOutExpo",
                animationSpeed: 400,
                slideshowSpeed: 4000,
                directionNav: true,
                controlNav: true,
                slideshow: false,
                smoothHeight: true,
                itemWidth: item_width
            } );
			
            $('.floating_icons div').mouseover( function(){
                $(this).addClass('on');
                return false;
            });
            $('.floating_icons div').mouseout( function(){
                $(this).removeClass('on');
                return false;
            });
            flexdestroy('.inno_banner');
            am_inno_banner(false);
        //			
			
				
        }
    }
	
    /*$(window).resize(function() {
		setTimeout(function(){items_slider()}, 400);
	});*/
    //  $(window).on('resize', function(e) {
    //    items_slider()
    //}, 200);
    $(window).load(items_slider);
    //$(window).scroll(items_slider).resize(items_slider).load(items_slider);

	
	
    //----------------1.0.2-Suppliers----------------------------
    //hero slideshow
    $('.hero_slider').flexslider({
        animation: "slide",
        //easing: "easeInOutExpo",
        animationSpeed: 400,
        slideshowSpeed: 4000,
        directionNav: false,
        controlNav: true,
        slideshow: true,
        smoothHeight: true
    } );
	
	
	
    //----------------index page----------------------------
    //hero slideshow
    $('.home_slider').flexslider({
        animation: "slide",
        //easing: "easeInOutExpo",
        animationSpeed: 400,
        slideshowSpeed: 4000,
        directionNav: true,
        controlNav: true,
        slideshow: false,
        smoothHeight: true
    } );
	


    //----------------1.3-The_Team----------------------------
    //more and less
    $('.a_more').click( function(){
        $(this).parent().next().show();
        $(this).parent().hide();
        return false;
    });
    $('.a_less').click( function(){
        $(this).parent().prev().show();
        $(this).parent().hide();
        return false;
    });
	
	
    //----------------3.1-Spec_Library----------------------------
    var $select_dropdowns=$('.simu_select ul');
	
    $('body').click(function(e){
        $select_dropdowns.parent().removeClass('open');
    });
	
    $('.simu_select span').click( function(e){
        e.stopPropagation();
        $(this).parent().toggleClass('open');
        return false;
    });
	
    $('.simu_select li').on('click', function(e){
        e.stopPropagation();
        var selected=$(this).html();
        var itm_val=$(this).attr('value');
        var for_itm=$(this).attr('for');
        $('#'+for_itm).val(itm_val);
        $(this).parent().prev().html(selected);
        $(this).parent().parent().toggleClass('open');
        
        // Subcat ajax load
        if(for_itm == 'cat'){
            specification_subcatload_ajax($('#'+for_itm).val());
        }
        
        return false;
    });
    
    $('.results_list li:odd').addClass('li_even');
	
    $('.result_title span').click( function(){
        if($(this).parent('div').hasClass('tit8') || $(this).parent('div').hasClass('tit3')){
            return false; 
        }
        
        if( $(this).hasClass('selected')==true ){
            $(this).removeClass('selected');
        }else{
            $('.result_title span').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // spec_versions hover selected
    var current_spec_version_item = '';
    if($('.spec_versions ul.results_list li.li_over').length > 0) 
        current_spec_version_item = $('.spec_versions ul.results_list li.li_over');
        
    $('.spec_versions ul.results_list').mouseout(function(){
        $(current_spec_version_item).addClass('li_over');
        $(current_spec_version_item).css('cursor','pointer');
    });
    
    $('.spec_versions ul.results_list').mouseover(function(){
        $(current_spec_version_item).removeClass('li_over');
        $(current_spec_version_item).css('cursor','');
    });
    $('.results_list li').hover(function() {
        //        $('.results_list li').each(function(){
        //            $(this).removeClass('li_over');
        //            $(this).css('cursor','');
        //        });
        $(this).addClass('li_over');
        $(this).css('cursor','pointer');
    }, function() {
        $(this).removeClass('li_over');
        $(this).css('cursor','');
    });
    // End spec_versions	
	
    //----------------5.1-Why_CableLabs----------------------------
    //img_slider
    $('.img_slider').flexslider({
        animation: "slide",
        //easing: "easeInOutExpo",
        animationSpeed: 400,
        slideshowSpeed: 4000,
        directionNav: true,
        controlNav: true,
        slideshow: false,
        smoothHeight: true
    } );
	
	
    //----------------6.0-Resources----------------------------
    $('.posts_list').each( function(){
        $(this).find('li:odd').addClass('li_even');	
    });
	
	
	
	
    $('ul.board_cat_nav li a').on('click', function(event){
        event.preventDefault();
        if($(this).parent('li').hasClass('on')) return false;
        var clickedItem = $(this);
        var board_category = $(this).attr('rel');
        var page_id = $('input#board_cat_page').val();
        $.ajax({
            type : "post",
            dataType : "json",
            url : ajaxurl,
            data : {
                action : "get_board_category_action", 
                board_category : board_category , 
                page_id : page_id
            },
            beforeSend: function(){

            },
            success: function( response ) {                                 
                if ( response.type == "success" ) {
                    $('ul.brands_list').html(response.content)
                }
                $('ul.board_cat_nav li.on').addClass('off').removeClass('on');
                $(clickedItem).parent('li').addClass('on').removeClass('off');
            }
        });
    });
	
    //	$('.interesting-facts').flexslider({
    //                animation: "slide",
    //                animationLoop: true
    //      });
	
    //Showcase UI TAB
    $( "#tabs" ).tabs();

});

//  (function ($) {
//    var methods = {
//        on: $.fn.on, 
//        bind: $.fn.bind
//    };
//    $.each(methods, function(k){
//        $.fn[k] = function () {
//            var args = [].slice.call(arguments),
//            delay = args.pop(),
//            fn = args.pop(),
//            timer;
//
//            args.push(function () {
//                var self = this,
//                arg = arguments;
//                clearTimeout(timer);
//                timer = setTimeout(function(){
//                    fn.apply(self, [].slice.call(arg));
//                }, delay);
//            });
//
//            return methods[k].apply(this, isNaN(delay) ? arguments : args);
//          };
//     });
//  }(jQuery));

$(document).ready(function(){
    $(".authors-widget .clr").bxSlider({
        mode: "vertical",
        slideMargin: 10,
        pager: false,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
        adaptiveHeight: false
    });
    $('form #specification_cat').on('change', function(){
        specification_subcatload_ajax($(this).val());
    });
    
    $('form #search_arch, form #search_arch1, form #specification_subcat, form #specification_type').on('change', function(){
        
        var query = ' ';
        if($('form input#q').val() != '' && $('form input#q').val() != 'Enter Search Term...')
            query = $('form input#q').val();
        
        var specification_cat = $('form #specification_cat').val();
        var search_arch = 0;
        if ($('form input#search_arch').is(':checked')) {
            search_arch = 1;
        }
        var search_arch1 = 0;
        if ($('form input#search_arch1').is(':checked')) {
            search_arch1 = 1;
        }
        if($(this).attr('id') != 'specification_cat')
            var specification_subcat = $('form #specification_subcat').val();
        else
            var specification_subcat = '';
        
        var specification_type = $('form #specification_type').val();
        
        $.ajax({
            type : "post",
            dataType : "json",
            url : ajaxurl,
            data : {
                action : "specification_filter_action", 
                query : query,
                paged : 1,
                specification_cat : specification_cat,
                specification_subcat: specification_subcat,
                specification_type: specification_type,
                search_arch: search_arch,
                search_arch1: search_arch1
            },
            beforeSend: function(){
                boxloader = new ajaxLoader($('div.specification_results_list_wrapper'));
            },
            success: function( response ) {
                $('ul.results_list').html(response.data);
                $('div.pagination_wrapper').html(response.pagi);
                
                $('.results_list li:odd').addClass('li_even');
                
                $('.results_list li').hover(function() {
                    $(this).addClass('li_over');
                    $(this).css('cursor','pointer');
                }, function() {
                    $(this).removeClass('li_over');
                    $(this).css('cursor','');
                });
                
                if($('.result_num').length > 0){
                    var result_num = 'Page ' + response.current_page + ' of ' + response.total_pages + ' (' + response.total_items + ' results)';
                    $('.result_num').html(result_num);
                }
                
                if (boxloader) boxloader.remove();
                createCookie('spec_search_copy_url', response.copy_url, 1);
                ;
                
                validate_copy_link();
            }
        });
    });
    
    //submit event
    $('form.search_form').on('submit', function(event){
        event.preventDefault();
        var paged = GetURLParameter('pagedt');
        if(paged == '')
            paged = 1;
        //var sort_order = 'sort_title';
        var sort_order = 'sort_published';
        var order = 'SORT_DESC';
        if($('.result_title span.selected').length > 0){
            sort_order = $('.result_title span.selected').attr('id');
            order = 'SORT_ASC';
        }
        
        var query = ' ';
        if($('form input#q').val() != '' && $('form input#q').val() != 'Enter Search Term...')
            query = $('form input#q').val();
        
        var specification_cat = $('form #specification_cat').val();
        var search_arch = 0;
        if ($('form input#search_arch').is(':checked')) {
            search_arch = 1;
        }
        var search_arch1 = 0;
        if ($('form input#search_arch1').is(':checked')) {
            search_arch1 = 1;
        }
        if($(this).attr('id') != 'specification_cat')
            var specification_subcat = $('form #specification_subcat').val();
        else
            specification_subcat = '';
        
        var specification_type = $('form #specification_type').val();        
        
        $.ajax({
            type : "post",
            dataType : "JSON",
            url : ajaxurl,
            data : {
                action : "specification_filter_action", 
                query : query,
                paged : paged,
                specification_cat : specification_cat,
                specification_subcat: specification_subcat,
                specification_type: specification_type,
                search_arch: search_arch,
                search_arch1: search_arch1,
                sort_order: sort_order,
                order: order
            },
            beforeSend: function(){
                boxloader = new ajaxLoader($('div.specification_results_list_wrapper'));
            },
            success: function( response ) {            
                $('ul.results_list').html(response.data);
                $('div.pagination_wrapper').html(response.pagi);
                
                $('.results_list li:odd').addClass('li_even');
                
                $('.results_list li').hover(function() {
                    $(this).addClass('li_over');
                    $(this).css('cursor','pointer');
                }, function() {
                    $(this).removeClass('li_over');
                    $(this).css('cursor','');
                });
                
                if($('.result_num').length > 0){
                    var result_num = 'Page ' + response.current_page + ' of ' + response.total_pages + ' (' + response.total_items + ' results)';
                    $('.result_num').html(result_num);
                }
                
                if (boxloader) boxloader.remove();
                
                createCookie('spec_search_copy_url', response.copy_url, 1);
                
                validate_copy_link();
            }
        });
    });
});
function specification_subcatload_ajax(parent_cat, child_cat){
    //    if(parent_cat != ''){
    $.ajax({
        type : "post",
        dataType : "json",
        url : ajaxurl,
        data : {
            'action' : "get_subcat_dropdown_action", 
            'parnet_cat' : parent_cat, 
            'child_cat': child_cat
        },
        beforeSend: function(){

        },
        success: function( response ) {                                 
            if(response.status == 'success'){
                $('form #specification_subcat').html(response.data);
                $('form #specification_subcat').trigger('change');
            }
        //console.log(response);
        }
    });
    if(parent_cat == ''){
        $('form #specification_subcat').html('<option value="">SELECT SUBCATEGORY</option>');
    }
}

$(document).ready(function(){
    
    $('div.authors-widget div.photo img.wp-user-avatar').each(function(){
        $(this).removeClass('photo');
    });
    
    //onload subcat
    if($('.search_form #specification_cat').val() != ''){
        var subcat = $('.search_form #specification_subcat').val();
        specification_subcatload_ajax($('.search_form #specification_cat').val(), subcat);
    }
    
    // Onload specification result
    if($('ul.specification_results_list').length > 0){
        $('form.search_form').trigger('submit');
    }
    
    // Pagination
    $( "div.pagination_wrapper" ).on( "click", "div.specification_search a", function(e) {
        e.preventDefault();
        
        var sort_order = 'sort_published';
        var order = 'SORT_DESC';
        if($('.result_title span.selected').length > 0){
            sort_order = $('.result_title span.selected').attr('id');
            order = 'SORT_ASC';
        }
        
        var paged = $(this).attr('rel');
        if(paged == '' || parseInt(paged) < 1){
            return false;
        }
        
        var query = ' ';
        if($('form input#q').val() != '' && $('form input#q').val() != 'Enter Search Term...')
            query = $('form input#q').val();
        
        var specification_cat = $('form #specification_cat').val();
        var search_arch = 0;
        if ($('form input#search_arch').is(':checked')) {
            search_arch = 1;
        }
        
        var search_arch1 = 0;
        if ($('form input#search_arch1').is(':checked')) {
            search_arch1 = 1;
        }
        
        var specification_subcat = '';
        if($(this).attr('id') != 'specification_cat')
            specification_subcat = $('form #specification_subcat').val();
        
        var specification_type = $('form #specification_type').val();
        
        $.ajax({
            type : "post",
            dataType : "json",
            url : ajaxurl,
            data : {
                action : "specification_filter_action", 
                query : query,
                paged : 1,
                specification_cat : specification_cat,
                specification_subcat: specification_subcat,
                specification_type: specification_type,
                search_arch: search_arch,
                search_arch1: search_arch1,
                paged: paged,
                sort_order: sort_order,
                order: order
            },
            beforeSend: function(){
                boxloader = new ajaxLoader($('div.specification_results_list_wrapper'));
                
                $("html,body").animate({
                    scrollTop: ($('.result_title').position().top - 0)
                }, 1500);
            },
            success: function( response ) {                                 
                $('ul.results_list').html(response.data);
                $('div.pagination_wrapper').html(response.pagi);
                
                $('.results_list li:odd').addClass('li_even');
                
                $('.results_list li').hover(function() {
                    $(this).addClass('li_over');
                    $(this).css('cursor','pointer');
                }, function() {
                    $(this).removeClass('li_over');
                    $(this).css('cursor','');
                });
                
                if($('.result_num').length > 0){
                    var result_num = 'Page ' + response.current_page + ' of ' + response.total_pages + ' (' + response.total_items + ' results)';
                    $('.result_num').html(result_num);
                }
                
                if (boxloader) boxloader.remove();
                createCookie('spec_search_copy_url', response.copy_url, 1);
                validate_copy_link();
            }
        });
    });
    
    $('.result_title div span.sort').on('click', function(e){
        e.preventDefault();
        var sort_order = $(this).attr('id');
        var order = '';
        if($(this).hasClass('selected')){
            order = 'SORT_DESC';
        }else{
            order = 'SORT_ASC';
        }
        
        var query = ' ';
        if($('form input#q').val() != '' && $('form input#q').val() != 'Enter Search Term...')
            query = $('form input#q').val();
        
        var specification_cat = $('form #specification_cat').val();
        var search_arch = 0;
        if ($('form input#search_arch').is(':checked')) {
            search_arch = 1;
        }
        
        var search_arch1 = 0;
        if ($('form input#search_arch1').is(':checked')) {
            search_arch1 = 1;
        }

        var specification_subcat = $('form #specification_subcat').val();
        var specification_type = $('form #specification_type').val();
        
        $.ajax({
            type : "post",
            dataType : "json",
            url : ajaxurl,
            data : {
                action : "specification_filter_action", 
                query : query,
                paged : 1,
                specification_cat : specification_cat,
                specification_subcat: specification_subcat,
                specification_type: specification_type,
                search_arch: search_arch,
                search_arch1: search_arch1,
                sort_order: sort_order,
                order: order
            },
            beforeSend: function(){
                boxloader = new ajaxLoader($('div.specification_results_list_wrapper'));
            },
            success: function( response ) {                                 
                $('ul.results_list').html(response.data);
                $('div.pagination_wrapper').html(response.pagi);
                
                $('.results_list li:odd').addClass('li_even');
                
                $('.results_list li').hover(function() {
                    $(this).addClass('li_over');
                    $(this).css('cursor','pointer');
                }, function() {
                    $(this).removeClass('li_over');
                    $(this).css('cursor','');
                });
                
                if($('.result_num').length > 0){
                    var result_num = 'Page ' + response.current_page + ' of ' + response.total_pages + ' (' + response.total_items + ' results)';
                    $('.result_num').html(result_num);
                }
                
                if (boxloader) boxloader.remove();
                createCookie('spec_search_copy_url', response.copy_url, 1);
                
                validate_copy_link();
            }
        });
    });
    
    // Reset buttom
    $('a.specf_filter_frm_reset').on('click', function(e){
        e.preventDefault();
        $('form input#q').val('');
        $("form #specification_cat").prop('selectedIndex', 0);
        $('form #specification_cat').trigger('change');
        
        $("form #specification_subcat").prop('selectedIndex', 0);
        $('form #specification_subcat').trigger('change');
        
        $("form #specification_type").prop('selectedIndex', 0);
        $('form #specification_type').trigger('change');
        
        $('form input#search_arch').prop('checked', false);
        $('form input#search_arch').trigger('change');
        
        $('form input#search_arch1').prop('checked', false);
        $('form input#search_arch1').trigger('change');
        
        $('.search_form span.customSelect').addClass('field_gray').removeClass('field_black');
        $('.search_form #q').addClass('field_gray').removeClass('field_black').val('Enter Search Term...');
    });
    
    // Close tips
    $('span.close_tips').on('click', function(){
        createCookie('cablelabs_tips', 'opened', 7);
        $('div.tips').fadeOut('slow');
    });
    
    var tips_cookie = readCookie('cablelabs_tips');
    if(!tips_cookie){
        $('div.tips').fadeIn('slow');
    //createCookie('cablelabs_tips', 'opened', 7);
    }
    if($('.search_form a#copy_to_clipboard_filter').length > 0){
        $('.search_form a#copy_to_clipboard_filter').zclip({
            path: template_directory_uri + '/js/clipboard/ZeroClipboard.swf',
            copy: function(){
                return readCookie('spec_search_copy_url');
            },
            afterCopy:function(){
                $('form a#copy_to_clipboard_filter').html('<span class="ico-copy"></span>Copied');
            }
        });
        eraseCookie('spec_search_copy_url');
    }
});

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    
    if(name === 'spec_search_copy_url'){
        $('form a#copy_to_clipboard_filter').html('<span class="ico-copy"></span><span class="clip_button">Copy Search Link</span>');
    }
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function GetURLParameter(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
    return '';
}

function validate_copy_link(){
    var query = ' ';
    if($('form input#q').val() != '' && $('form input#q').val() != 'Enter Search Term...')
        query = $('form input#q').val();
        
    var specification_cat = $('form #specification_cat').val();
    var search_arch = 0;
    if ($('form input#search_arch').is(':checked')) {
        search_arch = 1;
    }
        
    var search_arch1 = 0;
    if ($('form input#search_arch1').is(':checked')) {
        search_arch1 = 1;
    }

    var specification_subcat = $('form #specification_subcat').val();
    var specification_type = $('form #specification_type').val();
    if($('ul.specification_results_list').html() != '<br><h2><center>No results found.</center></h2><br>'){
        if(query != ' ' || specification_cat || '' && search_arch != '' || search_arch1 != 0 || specification_subcat != '' || specification_type != ''){
            $('#copy_to_clipboard_filter').css('display', 'inline-block');
            $('#zclip-ZeroClipboardMovie_1').css('display', 'block');
            $('#zclip-ZeroClipboardMovie_1').css('line-height', '16px');
        }else{
            $('#copy_to_clipboard_filter').css('display', 'none');
            $('#zclip-ZeroClipboardMovie_1').css('display', 'none');
        }
    }else{
        $('#copy_to_clipboard_filter').css('display', 'none');
        $('#zclip-ZeroClipboardMovie_1').css('display', 'none');
    }
}

$(window).load(function() {
    if($(document).width() > 719){
        $("#holder header").sticky(); 
    }
    else {
       
    }
});