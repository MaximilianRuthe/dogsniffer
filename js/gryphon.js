// Avoid `console` errors in browsers that lack a console.
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
// async tracker
jQuery(document).bind("cbox_complete", function(){
    var href = jQuery.colorbox.element().attr("href");
    if (href) {
        _gaq.push(["_trackPageview", href]);
    }
});
// Place any jQuery/helper plugins in here.

jQuery.noConflict();
jQuery(document).ready(function(){
	jQuery('ul.hover').superfish({delay:400,animation:{opacity:'show',height:'show'},speed:'fast',autoArrows:true,dropShadows:true});	
	jQuery('.carousel').carousel({interval: 8000});
	jQuery('.dropdown-toggle').dropdown();
	jQuery('ul#secondary-menu a').smoothScroll({offset: -100});
	jQuery('.back-to-top a').smoothScroll();
	jQuery('a[href*=".png"], a[href*=".gif"], a[href*=".jpg"]').colorbox({
		transition:'fade',
		speed: 300,
		//title:true,	
		rel:'group',
		//scalePhotos:true,
		//scrolling:true,
		opacity:0.85,
		open: false,
		returnFocus: true,
		fastIframe:false,
		preloading: true,
		overlayClose: true,
		escKey: true,
		arrowKey: true,
		loop: true,
		data: false,
		/* Output */
		current: '<i class="glyphicons-icon picture"></i> <strong>{current}/{total}</strong> ',
		previous: '<i class="glyphicons-icon chevron-left"></i>',
		next: '<i class="glyphicons-icon chevron-right"></i>',
		close: '<i class="glyphicons-icon remove"></i>',
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",
		/* Content Type */
		iframe: false,
		inline: false,
		html: false,
		photo: false,
		/* Dimensions */
		width: '80%',
		height: false,	
		innerWidth: false,
		innerHeight: false,
		initialWidth: "600",
		initialHeight: "450",
		maxWidth:'90%',
		maxHeight:'90%',
		/* Slideshow */
		slideshow: false,	
		slideshowSpeed: 2500,
		slideshowAuto: true,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		/* Positioning */
		fixed: false,
		top: false,
		bottom: false,
		left: false,
		right: false,
		/* Callbacks*/
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false
	});
	jQuery('a.video').colorbox({transition:'fade',innerWidth:'50%',innerHeight:'70%',maxWidth:'800',maxHeight:'600',iframe:true});	
	jQuery('.mage-login-toolbar a').on('click',function(){
		jQuery('#user-login-modal').modal();
	});
	var eventCycle = jQuery('#cycle-opts').find('.btn input[type=radio]:checked').val();
	jQuery('#cycle-tabs').find('#opt-'+eventCycle).addClass('active');
});
jQuery('a.mage-edit').colorbox({
		transition:'fade',
		iframe:true,
		width:'90%', 
		height:'90%',
		maxWidth:'1000',
		maxHeight:'800',
		fastIframe:false
	});
jQuery('a.category, a.tag, ul.pager li, a.main-menu-link').tooltip();
jQuery('a.pop').popover({trigger:'hover'});
jQuery('article pre code').html(function(index, html) {
    return html.replace(/^(.*)$/mg, "<span class=\"line\">$1</span>")
});
jQuery(".search-select").select2().change(function() {
  var action = jQuery(this).val();
  jQuery("#searchform").attr("action",action);
}).trigger("change");
jQuery(".city-select").select2();
jQuery('div.rating-options .btn').click(function(){
  jQuery(this).find('input:radio').attr('checked', true);
});
jQuery('label.activator.btn input:checkbox').click(function(){
	if (jQuery(this).attr('checked')) {		
		jQuery(this).parent().addClass('active');	
	} else {
		jQuery(this).parent().removeClass('active');
	}
});

jQuery('#cycle-opts .btn').click(function(){
	var toggleOpt = jQuery(this).find('input:radio');
	if (toggleOpt.attr('checked')) {		
		var cycleOpt = toggleOpt.val();
		jQuery(this).parent().find('.active').removeClass('active');
		jQuery(this).addClass('active');	
		jQuery(this).parent().parent().find('.tab-pane').removeClass('active');
		jQuery(this).parent().parent().find('#opt-'+cycleOpt).addClass('active');
	} 
});
jQuery('.mage-form').on('submit', function(e){
	var form = jQuery(this);
	var hasError = false;
	form.find('.required').each(function() {
		var er =  jQuery(this);
		if(er.hasClass('error') ) {
			er.removeClass('error');
			hasError = false;
		} else if(er.hasClass('select2-offscreen')) {
			er.prev().removeClass('error required');
			hasError = false;
		}
    });
	form.find('.required').each(function() {
		var el = jQuery(this);
		if(el.is('input:text')) {
			if(el.val() == '') {
				el.addClass('error');
				hasError = true;
			}
		} else if(el.hasClass('email')) {
			var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(!emailReg.test(jQuery.trim(el.val()))) {
				el.addClass('error');
				hasError = true;
			}
		} else if(el.hasClass('select2-offscreen')) {
           if( el.val() == '-1' ) {
						var selectContainer =  el.prev();
						selectContainer.addClass('error required');
                        hasError = true;
                    }
                }
            });
			
            if( ! hasError ) {
                jQuery(this).find('#mage_submit').attr({
                    'value': scribe.postingMsg
                });
                return true;
		}
     e.preventDefault();
});