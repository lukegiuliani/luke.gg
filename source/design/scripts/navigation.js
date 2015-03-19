$.extend(true, app, { navigation: {
	init: function () {

		var _self = this;
		_self.$mainContent = $(".page-wrapper");
		_self.$pageWrap = $(".site-wrapper");
		_self.baseHeight = 0;

		$(window).load(function () {
			_self.resize_page_container();
		});

		/*
		* We're not going to worry about the older browsers
		* */
		if (Modernizr.history) {
			_self.listeners();
		}

	},

	resize_page_container: function () {
		$(".site-wrapper").removeAttr('style');
		$(".site-wrapper").height($(".site-wrapper").height());
	},

	listeners: function () {

		var _self = this;
		$.event.special.debouncedresize.threshold = 250;

		// calculate wrapper heights to prevent jumping when loading new content
		_self.$pageWrap.height(_self.$pageWrap.height());
		_self.baseHeight = _self.$pageWrap.height() - _self.$mainContent.height();

		$(window).on("debouncedresize", function (event) {
			_self.resize_page_container();
		});

		$(".site-header").on("click", ".js-trigger-navigation", function (e) {
			e.preventDefault();
			e.stopPropagation();
			var _href = $(this).attr("href");
			// change the url without a page refresh and add a history entry.

			history.pushState({page: _href}, null, _href);

			// load the content
			_self.load_content(_href); // fear not! we're going to build this function in the next code block

			$(window).bind("popstate", function (event) {
				var state = event.originalEvent.state;
				var link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only
				if (state !== null) {
					_self.load_content(link);
				}
			});

		});
	},

	load_content: function (href) {
		var _self = this;
		$('.site-loading').fadeIn(100, function () {

			$('body').addClass('page-loading');

			_self.$mainContent.load(href + " .page-contents ", function () { // load the contents of whatever href is
				if ($(".js-site-header").hasClass("site-header--nav-active")) {
					$(".js-site-header").removeClass("site-header--nav-active");
				}

				$('body').animate({
					scrollTop: $(".page-contents").offset().top
				}, 200, function () {
					$('.site-header').removeClass('.site-header--up');
					$('.site-loading').fadeOut(100, function () {
						$('body').removeClass('page-loading');
						_self.$pageWrap.animate({
							height: _self.baseHeight + _self.$mainContent.height() + 'px'
						}, 200, 'linear', function () {
							if (typeof ga !== 'undefined') {
								ga('send', 'pageview', href);
							}
						});
					});
				});
			});
		});
	}
}});