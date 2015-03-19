$.extend(true, app, { toys: {

	init: function () {
		//these run on every page. Use with caution!
		this.global();


		if (app.available_in_dom($('.body-url-home'))) {
			this.home();
		}
	},


	global: function () {

		/*
		 * Show the mobile navigation when the menu button is clicked
		 * */
		$(".js-site-header__toggle-menu").click(function () {
			$(".js-site-header").toggleClass("site-header--nav-active");
		});

		/*
		 * On scroll down, remove the nav from view.
		 * On scroll up, show the nav, just like on iOS safari 7+
		 * */
		var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

		$(window).bind(mousewheelevt, function (e) {
			var evt = window.event || e; //equalize event object
			evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
			var delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta;//check for detail first, because it is used by Opera and FF

			if (delta > 0) {
				//scroll up
				$('.js-site-header').addClass('site-header--up');
			} else {
				//scroll down
				$('.js-site-header').removeClass('site-header--down');
			}

			/* if it hits the top, stop doing freaky up/downs */
			if ($(window).scrollTop() < 10) {
				$('.js-site-header').removeClass('site-header--down').removeClass('site-header--up');
			}
		});

		/*
		* Because of ajax navigation, we need to instantiate page
		* specific click listeners more generally.
		* */

		$(".page-wrapper").on('click', '.js-quickfind__close', function (e) {
			e.preventDefault();
			$(".js-quickfind").slideUp(function () {
				app.navigation.resize_page_container();
			});
		});

	},

	home: function () {
		/*
		 * Restart the homepage video when it ends.
		 * */
		$("#homeofficevideo").bind("ended", function () {
			$("#homeofficevideo").load();
		});

	}

}});