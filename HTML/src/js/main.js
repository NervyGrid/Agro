/// <reference path='../libs/aos/aos.js' />
/// <reference path='../libs/countTo/jquery.countTo.js' />
/// <reference path='../libs/fancybox/jquery.fancybox.js' />
/// <reference path='../libs/ion.rangeSlider/js/ion.rangeSlider.js' />
/// <reference path='../libs/isotope/isotope.pkgd.js' />
/// <reference path='../libs/jarallax/jarallax.js' />
/// <reference path='../libs/jarallax/jarallax-element.js' />
/// <reference path='../libs/nice-select/jquery.nice-select.js' />
/// <reference path='../libs/slick/slick.js' />

(function($) {

	/*-- Strict mode enabled --*/
	'use strict';

	/*-- Global variables --*/
	var nHtmlNode = document.documentElement,
		nBodyNode = document.body || document.getElementsByTagName('body')[0],
		nAppNode  = document.getElementById('app'),

		jWindow   = $(window),
		jBodyNode = $(nBodyNode),
		jAppNode  = $(nAppNode),

		rAF = window.requestAnimationFrame ||
			  window.mozRequestAnimationFrame ||
			  window.webkitRequestAnimationFrame ||
			  window.msRequestAnimationFrame||
			  function (callback) {
				  setTimeout(callback, 1000 / 60);
			  };

	/* LazyLoad
	================================================== */
	// var myLazyLoad = new LazyLoad({
	// 	elements_selector: ".lazy",
	// 	data_src: 'src',
	// 	data_srcset: 'srcset',
	// 	threshold: 500,
	// 	callback_enter: function (element) {

	// 	},
	// 	callback_load: function (element) {
	// 		element.removeAttribute('data-src');

	// 		oTimeout = setTimeout(function ()
	// 		{
	// 			clearTimeout(oTimeout);

	// 			AOS.refresh();

	// 			console.log('refresh')
	// 		}, 1000);
	// 	},
	// 	callback_set: function (element) {
			
	// 	},
	// 	callback_error: function(element) {
	// 		element.src = "https://placeholdit.imgix.net/~text?txtsize=21&txt=Image%20not%20load&w=200&h=200";
	// 	}
	// });

	/* scroll animate
	================================================== */
	AOS.init({
		offset: 120,
		delay: 100,
		duration: 450, // or 200, 250, 300, 350.....
		easing: 'ease-in-out-quad',
		once: true,
		disable: 'mobile'
	});

	var AGRO = {
		onReady: function ()
		{
			this.header();
			this.jarallax();
			this.slick();
			this.fancybox();
			this.ionRangeSlider();
			this.niceSelect();
			this.gallerySorting();
			this.quantityCounter();
			this.goodsFilterToggle();
			this.accordion();
			this.tabs();
			this.counters();
			this.scrollTop();
			this.contactForm();
		},
		onLoad: function ()
		{
			this.googleMap();
		},
		header: function ()
		{
			var nHeader        = document.getElementById('top-bar'),
				nMenu          = document.getElementById('top-bar__navigation'),
				nMenuToggler   = document.getElementById('top-bar__navigation-toggler'),

				jHeader        = $(nHeader),
				jMenu          = $(nMenu),
				jMenuToggler   = $(nMenuToggler),

				jSubmenu       = jMenu.find('.submenu'),
				hideMobileMenu = function ()
				{
					if ( window.innerWidth >= 991 )
					{

						jHeader.removeClass('is-expanded');
						jMenuToggler.removeClass('is-active');
						jSubmenu.removeAttr('style');
						nHtmlNode.style.overflow = '';
					}
				};

			if ( jSubmenu.length > 0 )
			{
				var jMenuItem = jSubmenu.parent('li').addClass('has-submenu');
			};

			jMenuToggler.on('touchend click', function (e) {
				e.preventDefault();

				var $this = $(this);

				$this.toggleClass('is-active');
				jHeader.toggleClass('is-expanded');

				if ( $this.hasClass('is-active') )
				{
					nHtmlNode.style.overflow = 'hidden';
				}
				else
				{
					nHtmlNode.style.overflow = '';
				}

				return false;
			});

			jMenuItem.on('click', function (e) {
				var $this = $(this),
					$children = $this.children('.submenu');

				if ( jMenuToggler.is(':visible') )
				{
					if ( $children.is(':visible') )
					{
						$this.removeClass('drop_active');
						$children.slideUp('fast');
					}
					else
					{
						$this.siblings().removeClass('drop_active').find('.submenu').slideUp('fast');

						$this.addClass('drop_active');
						$children.slideDown('fast');
					}
				}
			});

			jWindow.on('resize', debounce(hideMobileMenu, 100));
		},
		jarallax: function ()
		{
			if ( 'function' !== typeof jarallax ) return console.error( "Error: jarallax is not a function. Be sure to include 'jarallax.js'");

			var nJarallax = document.querySelectorAll('.jarallax');

			if ( device.desktop() && nJarallax.length > 0 )
			{
				jarallax(nJarallax, {
					type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
					zIndex: -20
				});
			};
		},
		slick: function ()
		{
			if ( !$.fn.slick ) return console.error( "Error: slick is not a function. Be sure to include 'slick.js'");

			var jSlider = $('.js-slick');

			if ( !jSlider.length > 0 ) return;

			jSlider.each(function ( i, slider ) {

				$(slider).on('init', function(event, slick){

				}).slick({
					autoplay: true,
					autoplaySpeed: 3000,
					adaptiveHeight: true,
					dots: true,
					arrows: false,
					speed: 800,
					mobileFirst: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					touchThreshold: 15,
					prevArrow: '<i class="fontello-left-open slick-prev"></i>',
					nextArrow: '<i class="fontello-right-open slick-next"></i>'
				});
			});
		},
		fancybox: function ()
		{
			if ( !$.fn.fancybox ) return console.error( "Error: fancybox is not a function. Be sure to include 'fancybox.js'");

			var galleryElement = $("[data-fancybox]");

			if ( !galleryElement.length > 0 ) return;

			galleryElement.fancybox({
				buttons : [
					'slideShow',
					'fullScreen',
					'thumbs',
					// 'share',
					//'download',
					//'zoom',
					'close'
				],
				loop : true,
				protect: true,
				wheel : false,
				transitionEffect : "tube"
			});
		},
		ionRangeSlider: function ()
		{
			if ( !$.fn.ionRangeSlider ) return console.error( "Error: ionRangeSlider is not a function. Be sure to include 'ion.rangeSlider.js'");

			var jRangeSlider = $('.js-range-slider');

			if ( !jRangeSlider.length > 0 ) return;

			var min = $('.range-slider-min-value'),
				max = $('.range-slider-max-value');

			jRangeSlider.ionRangeSlider({
				onStart: function (data) {
					// fired then range slider is ready
				},
				onChange: function (data) {
					// fired on every range slider update

					min.val(data.from);
					max.val(data.to);
				},
				onFinish: function (data) {
					// fired on pointer release
				},
				onUpdate: function (data) {
					// fired on changing slider with Update method
				}
			});
		},
		niceSelect: function ()
		{
			if ( !$.fn.niceSelect ) return console.error( "Error: niceSelect is not a function. Be sure to include 'nice-select.js'");

			var jSelect = $('.js-select');

			if ( !jSelect.length > 0 ) return;

			jSelect.niceSelect();
		},
		gallerySorting: function ()
		{
			var nOptionSets = document.getElementById('gallery-set'),
				jOptionSets = $(nOptionSets);

			if ( !jOptionSets.length > 0 ) return;

			var jIsoContainer = $('.js-isotope'),
				jOptionLinks = jOptionSets.find('a');

			jOptionLinks.on('click', function(e) {
				var $this = $(this),
					currentOption = $this.data('cat');

				jOptionSets.find('.selected').removeClass('selected');
				$this.addClass('selected');

				if (currentOption !== '*') {
					currentOption = '.' + currentOption;
				}

				jIsoContainer.isotope({filter : currentOption});

				return false;
			});
		},
		quantityCounter: function ()
		{
			var jCounter = $('.js-quantity-counter');

			if ( !jCounter.length > 0 ) return;

			jCounter.each(function (i, counter) {
				var $this     = $( counter ),
					input     = $this.children('.__q-input'),
					minus_btn = $this.children('.__btn--minus'),
					plus_btn  = $this.children('.__btn--plus'),
					count = 0;

				minus_btn.on('click touchend', function (e)
				{
					e.preventDefault();
					e.stopPropagation();
					count = parseInt(input.val()) - 1;
					count = count < 1 ? 1 : count;
					input.val(count);
					input.change();
					return false;
				});

				plus_btn.on('click touchend', function (e)
				{
					e.preventDefault();
					e.stopPropagation();
					input.val(parseInt(input.val()) + 1);
					input.change();
					return false;
				});
			});
		},
		goodsFilterToggle: function ()
		{
			var jGoodsFilter = $('.goods-filter');

			if ( !jGoodsFilter.length > 0 ) return;

			var jBtnToggler = $('.js-toggle-filter'),
				isActive    = false;

			jBtnToggler.on('click', function ()
			{
				isActive = !isActive;

				if ( isActive )
				{
					jGoodsFilter.addClass('is-active');
					nHtmlNode.style.overflow = 'hidden';
				}
				else
				{
					jGoodsFilter.removeClass('is-active');
					nHtmlNode.style.overflow = '';
				};

				if ( (window.pageYOffset || document.documentElement.scrollTop) >= 90 ) // 90 topbar height
				{
					jGoodsFilter.addClass('scrolled')
				}

				return false;
			});
		},
		accordion: function ()
		{
			var oAccordion = $('.accordion-container');

			if ( !oAccordion.length > 0 ) return;

			var oAccItem    = oAccordion.find('.accordion-item'),
				oAccTrigger = oAccordion.find('.accordion-toggler');

			oAccordion.each(function () {
				$(this).find('.accordion-item:eq(0)').addClass('active');
			});

			oAccTrigger.on('click', function (j) {
				j.preventDefault();

				var $this = $(this),
					parent = $this.parent(),
					dropDown = $this.next('article');

				parent.toggleClass('active').siblings(oAccItem).removeClass('active').find('article').not(dropDown).slideUp();

				dropDown.stop(false, true).slideToggle();

				return false;
			});
		},
		tabs: function ()
		{
			var oTab = $('.tab-container');

			if ( !oTab.length > 0 ) return;

			var oTabTrigger = oTab.find('nav a');

			oTab.each(function () {

				$(this)
					.find('nav a:eq(0)').addClass('active').end()
					.find('.tab-content__item:eq(0)').addClass('is-visible');
			});

			oTabTrigger.on('click', function (g) {
				g.preventDefault();

				var $this = $(this),
					index = $this.index(),
					parent = $this.closest('.tab-container');

				$this.addClass('active').siblings(oTabTrigger).removeClass('active');

				parent
					.find('.tab-content__item.is-visible').removeClass('is-visible').end()
					.find('.tab-content__item:eq(' + index + ')').addClass('is-visible');

				return false;
			});
		},
		counters: function ()
		{
			var counter = $('.js-count');

			function _countInit() {
				counter.each(function() {
					var $this = $(this);

					if( $this.is_on_screen() && !$this.hasClass('animate') )
					{
						$this
							.addClass('animate')
							.countTo({
								from: 0,
								speed: 2000,
								refreshInterval: 100
							});
					};
				});
			};

			if ( !counter.length > 0 ) return;

			_countInit();

			jWindow.on('scroll', function(e) {

				// _countInit();

				if( rAF ) {
					rAF(function(){
						_countInit();
					});
				} else {
					_countInit();
				}
			});
		},
		googleMap: function ()
		{
			var maps = $('.g_map');

			if ( !maps.length > 0 ) return;

			var apiKey = maps.attr('data-api-key'),
				apiURL;

			if (apiKey)
			{
				apiURL = 'http://maps.google.com/maps/api/js?key='+ apiKey +'&sensor=false';
			}
			else
			{
				apiURL = 'http://maps.google.com/maps/api/js?sensor=false';
			}

			$.getScript( apiURL , function( data, textStatus, jqxhr ) {

				maps.each(function() {
					var current_map = $(this),
						latlng = new google.maps.LatLng(current_map.attr('data-longitude'), current_map.attr('data-latitude')),
						point = current_map.attr('data-marker'),

						myOptions = {
							zoom: 14,
							center: latlng,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							mapTypeControl: false,
							scrollwheel: false,
							draggable: true,
							panControl: false,
							zoomControl: false,
							disableDefaultUI: true
						},

						stylez = [
							{
								featureType: "all",
								elementType: "all",
								stylers: [
									{ saturation: -100 } // <-- THIS
								]
							}
						];

					var map = new google.maps.Map(current_map[0], myOptions);

					var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
					map.mapTypes.set('Grayscale', mapType);
					map.setMapTypeId('Grayscale');

					var marker = new google.maps.Marker({
						map: map,
						icon: {
							size: new google.maps.Size(59,69),
							origin: new google.maps.Point(0,0),
							anchor: new google.maps.Point(0,69),
							url: point
						},
						position: latlng
					});

					google.maps.event.addDomListener(window, "resize", function() {
						var center = map.getCenter();
						google.maps.event.trigger(map, "resize");
						map.setCenter(center);
					});
				});
			});
		},
		scrollTo: function ()
		{
			var jLink = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');

			jLink.on('touchend click', function (e) {
				var $this = $(this),
					_offset = 135;

				if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname )
				{
					var target = $(this.hash);

					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

					if ( target.length )
					{
						$('html,body').stop().animate({
							scrollTop: target.offset().top - _offset
						}, 1000);
					}

					return false;
				};
			});
		},
		scrollTop: function ()
		{
			var	nBtnToTopWrap = document.getElementById('btn-to-top-wrap'),
				jBtnToTopWrap = $(nBtnToTopWrap);

			if ( !jBtnToTopWrap.length > 0 ) return;

			var nBtnToTop = document.getElementById('btn-to-top'),
				jBtnToTop = $(nBtnToTop),
				iOffset   = jBtnToTop.data('visible-offset');

			jBtnToTop.on('click', function (e) {
				e.preventDefault();

				$('body,html').stop().animate({ scrollTop: 0 } , 1500);

				return false;
			});

			jWindow.on('scroll', throttle(function(e) {

				if ( jWindow.scrollTop() > iOffset )
				{
					if ( jBtnToTopWrap.is(":hidden") )
					{
						jBtnToTopWrap.fadeIn();
					};

				}
				else
				{
					if ( jBtnToTopWrap.is(":visible") )
					{
						jBtnToTopWrap.fadeOut();
					};
				};

			}, 400)).scroll();
		},
		contactForm: function ()
		{
			var jForm = $('.js-contact-form');

			if ( !jForm.length > 0 ) return;

			jForm.each(function ( i, form ) {

				$( form ).on('submit', function() {
					var $this = $(this),
						str = $this.serialize(),
						note = $this.find('.form__note');

					$.ajax({
						type: "POST",
						url: "send_mail/contact_process.php",
						data: str,
						success: function(msg) {

							var result = '<span style="color: green"><br/>Your message has been sent. Thank you!</span>';

							note.html(result);

							$this.get(0).reset();

							setTimeout(function() { note.html('') }, 3000);
						},
						error: function(err) {
							var result = '<span style="color: red"><br/>Your message not sent! Error: "'+err.responseJSON.message+'"</span>';

							note.html(result);
						},
						complete: function() {
						}
					});

					return false;
				});
			});
		},

	};

	$(document).ready(function ()
	{
		AGRO.onReady();
	});

	jWindow.on('load', function ()
	{
		AGRO.onLoad();

		var jIsotope = $('.js-isotope');

		if ( jIsotope.length > 0 && $.fn.isotope )
		{
			jIsotope.isotope('layout');
		};
	});

	/* helper functions
	================================================== */

	$.fn.is_on_screen = function ()
	{
		var viewport = {
			top: jWindow.scrollTop(),
			left: jWindow.scrollLeft()
		};
		viewport.right = viewport.left + jWindow.width();
		viewport.bottom = viewport.top + jWindow.height();

		var bounds = this.offset();
		bounds.right = bounds.left + this.outerWidth();
		bounds.bottom = bounds.top + this.outerHeight();

		return ( !( viewport.right < bounds.left ||
					viewport.left > bounds.right ||
					viewport.bottom < bounds.top ||
					viewport.top > bounds.bottom
				));
	};

	// Create a safe reference to the Underscore object for use below.
	function now ()
	{
		return new Date().getTime();
	};

	function throttle (func, wait, options)
	{
		var timeout, context, args, result;
		var previous = 0;

		if (!options) options = {};

		var later = function later()
		{
			previous = options.leading === false ? 0 : now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};

		var throttled = function throttled()
		{
			var at = now();
			if (!previous && options.leading === false) previous = at;
			var remaining = wait - (at - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait)
			{
				if (timeout)
				{
						clearTimeout(timeout);
						timeout = null;
				}
				previous = at;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			}
			else if (!timeout && options.trailing !== false)
			{
				timeout = setTimeout(later, remaining);
			}
			return result;
		};

		throttled.cancel = function ()
		{
			clearTimeout(timeout);
			previous = 0;
			timeout = context = args = null;
		};

		return throttled;
	};

	// Pure js debounce function to optimize resize method
	function debounce (func, wait, immediate)
	{
		var timeout;

		return function()
		{
			var context = this,
				args = arguments;

			clearTimeout(timeout);

			timeout = setTimeout(function() {
				timeout = null;

				if (!immediate) func.apply(context, args);
			}, wait);

			if (immediate && !timeout) func.apply(context, args);
		};
	};
}(jQuery));