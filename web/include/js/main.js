/*
	1.1 Header & Menu
	1.2 Hero Section & Nav
	1.3 Slider
	1.4 Contact Form
	1.5 Mobile Devices
	1.6 Modernizer/Thumbnails
*/

// 1.1 Header & Menu

function kickStart() {
	"use strict";
	(function () {
		function initiateNavigation() {
			var st = $(window).scrollTop(),
				logoHeight = $('.header-inner').outerHeight(),
				navButton = $('.menu-button, .menu-button-grid'),
				wh = $('.nav-trigger').outerHeight() - logoHeight,
				navButtonMargin = (logoHeight - 12) / 2;
			if (st > wh) {
				$('.header-inner').addClass('scrolled');
			} else {
				$('.header-inner').removeClass('scrolled');
			};
			navButton.css({
				"top":navButtonMargin + "px"
			});
		}
		$(document).on("ready", initiateNavigation);
		$(window).on("scroll", initiateNavigation);
		$(window).on("resize", initiateNavigation);
	})();

// 1.2 Hero Section & Nav

	(function () {
		function contentCenter() {
			var hero = $('.hero, .banner'),
				windowHeight = $(window).height(),
				heroHeight = windowHeight,
				navigation = $('.navigation'),
				navigationHeight = navigation.height(),
				parentHeight = $('.push-nav').height(),
				topMargin = (parentHeight - navigationHeight) / 2,
				heroContent = $('.hero-content'),
				contentHeight = heroContent.height(),
				topContentMargin = (heroHeight - contentHeight) / 2,
				fullScreenHeight = $('.full-screen').height(),
				fullScreenContent = $('.full-screen-content'),
				fullScreenContentHeight = fullScreenContent.height(),
				fullScreenContentMargin = (fullScreenHeight - fullScreenContentHeight) / 2;
			navigation.css({
				"margin-top":topMargin + "px"
			});
			hero.css({
				height:heroHeight + "px"
			});
			heroContent.css({
				"margin-top":topContentMargin + "px"
			});
			fullScreenContent.css({
				"margin-top":fullScreenContentMargin + "px"
			});
		}
		$(window).on("resize", contentCenter);
        //$(document).on("ready", contentCenter);
        $(window).on("load", contentCenter);
	})();

	jQuery('.banner').radiant({
		delay:16000,
		startheight:900, // Image height
		minHeight:400,
		keboardNavigation:"off",
		onHoverStop:"on",
		navigationType:"none",
		navigationArrows:"solo",
		navigationStyle:"preview4",
		touchenabled:"on",
		hideArrowsOnMobile:"off",
		swipe_velocity:0.6,
		swipe_min_touches:1,
		swipe_max_touches:1,
		drag_block_vertical:false,
		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"center",
		soloArrowLeftHOffset:20,
		soloArrowLeftVOffset:0,
		soloArrowRightHalign:"right",
		soloArrowRightValign:"center",
		soloArrowRightHOffset:20,
		soloArrowRightVOffset:0,
		hideTimerBar:"on",
		shadow:0,
		fullWidth:"on",
		autoHeight:"off",
		forceFullWidth:"off",
		dottedOverlay:"none",
		shuffle:"off",
		parallax:"mouse",
		parallaxLevels:[7, 4, 3, 2, 5, 4, 3, 2, 1, 0]
	});

	$('.hero, .navigation, .call-to-action').localScroll({
		offset:-$('header').height(),
		duration:1000
	});

	var coolfx = new WOW({
		mobile:false
	});
	coolfx.init();

// 1.3 Slider

	$(".rsDefault").radiantSlider({
		arrowsNav:false,
		fadeinLoadedSlide:true,
		controlNavigationSpacing:0,
		controlNavigation:'bullets',
		transitionType:'fade',
		loop:true,
		controlsInside:false,
		sliderDrag:false,
		navigateByClick:false,
		addActiveClass:true,
		autoHeight:true,
		transitionSpeed:200,
		block:{
			moveEffect:'none'
		}
	});

	$(".rsProgress").radiantSlider({
		slidesSpacing:1,
		autoHeight:true,
		fadeinLoadedSlide:false,
		arrowsNav:false,
		loop:false,
		controlNavigation:'tabs',
		navigateByClick:false,
		transitionType:'move'
	});

	$('#gallery1').radiantSlider({
		addActiveClass:true,
		arrowsNav:false,
		controlNavigation:'none',
		autoScaleSlider:true,
		autoScaleSliderWidth:1200,
		autoScaleSliderHeight:500,
		loop:true,
		fadeinLoadedSlide:false,
		globalCaption:true,
		keyboardNavEnabled:true,
		globalCaptionInside:false,
		visibleNearby:{
			enabled:true,
			centerArea:0.4,
			center:true,
			breakpoint:1199,
			breakpointCenterArea:0.6,
			navigateByCenterClick:true
		}
	});

	$('.thumbnail').hover(function () {
		$(this).children('.project-client-info').toggleClass("visible");
	});

// 1.4 Contact Form

	$(function() {
		// Contact form validation
		$('.contact-us').submit(function(e) {
			e.preventDefault();

			$.ajax({
				url: 'include/form/contact.php',
				data: 'name='+ escape($('#contactName').val()) +'&email=' + escape($('#contactEmail').val()) + '&phone=' + escape($('#contactPhone').val()) + '&message='+escape($('#contactMessage').val()),
				dataType: 'json',
				success:function(resp) {
					$('#contactName, #contactEmail, #contactMessage').removeClass('error');

					if(resp.success == 1){
						if ($('#alert:first').is (':hidden')) {
							$('#alert').slideDown('slow');
						}
						else {
							$('#alert').hide();
						}
						
						$('#contactName, #contactEmail, #contactMessage, #contactPhone').val('');
					}
					else {
						if(resp.errorCode == 1){
							$('#contactName').addClass('error').focus();
						}
						else if(resp.errorCode == 2){
							$('#contactEmail').addClass('error').focus();
						}
						else if(resp.errorCode == 3){
							$('#contactMessage').addClass('error').focus();
						}	
					}					
				}
			});
		
			return false;
		});
	});

// 1.5 Mobile Devices
	// This function resizes devices if you want to place mobile devices in the project details page as a section.
	(function () {
		function devicesResizing() {
			var devicesContainer = $('.mobile-devices-container'),
				devicesContainerHeight = $('.mobile-devices-container').outerHeight() - 250,
				devices = $('.mobile-devices');
			devices.css({
				"top":devicesContainerHeight + "px"
			});
			devicesContainer.css({
				"margin-bottom":devices.outerHeight() - 250 + "px"
			});
		}
		$(window).on("load", devicesResizing);
		$(window).on("resize", devicesResizing);
	})();

jQuery(".container").fitVids();
};

	$(document).ready(function () {
		kickStart();
	});

// 1.6 Modernizer/Thumbnails

	$(window).load(function () {
		if (Modernizr.touch) {
			skrollr.init().destroy();
		} 
		else {
			skrollr.init({
				forceHeight:false
			});
		}

		var $container = $('.thumbnails').isotope({
		itemSelector:'.thumbnail'
	});

	$('.filters').on('click', 'li', function () {
		var filterValue = $(this).attr('data-filter');
		$container.isotope({
			filter:filterValue
		});
	});
	
	$('.filters').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'li', function () {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});
});
