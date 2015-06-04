// 1.4 Magnific Popup
	//Popup for images, video, etc. in the portfolio detail page

(function($){
	
	"use strict";

	// Image popup
	$('.popup').magnificPopup({ 
		type: 'image',
		fixedContentPos:false,
		fixedBgPos:false,
		removalDelay:300,
		mainClass: 'mfp-fade'
	});

	// YouTube, Vimeo, Google Maps popup
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn:700,
		type: 'iframe',
		fixedContentPos:false,
		fixedBgPos:false,
		removalDelay:300,
		mainClass: 'mfp-fade',
		preloader:false
	});

	// Gallery popup (for images)
	$('.popup-gallery').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		},
		fixedContentPos:false,
		fixedBgPos:false,
		removalDelay:300,
		mainClass: 'mfp-fade'
	});

	// Gallery link - Use gallery-link to create a link to a gallery
	$('.gallery-link').on('click', function () {
		$(this).next().magnificPopup('open');
	});

	// Gallery - Add all of the images you want to display in a popup inside a div with the gallery class
	$('.gallery-project').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {
				enabled:true,
				navigateByImgClick:true
			},
			fixedContentPos:false,
			fixedBgPos:false,
			removalDelay:300,
			mainClass: 'mfp-fade'
		});
	});

	// Soundcloud popup - for displaying the Soundcloud player
	$('.popup-soundcloud').magnificPopup({ 
		type: 'iframe',
		mainClass: 'soundcloud-popup'
	});

})(jQuery);