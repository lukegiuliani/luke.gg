$.extend(true, app, { blog: {
	init: function () {
		var _self = this;

		if ($('.blog-detail').length < 1) {
			return;
		}

		_self.mql = window.matchMedia('screen and (min-width: 768px)');
		_self.image_scaled_class = 'image-scaled';
		_self.blog_images = $('.blog-detail p > img');
		_self.matchmedia();
	},

	matchmedia: function () {
		var _self = this;

		if (_self.mql.matches) {
			_self.listeners();
		}

		_self.mql.addListener(function (mql) {
			if (mql.matches) {
				_self.listeners();
			} else {
				_self.remove_listeners();
			}
		});
	},

	listeners: function () {
		var _self = this;

		$('.blog-detail').imagesLoaded( function() {
			$.each(_self.blog_images, function(i,el) {
				if ($(el).width() > 660) {
					$(el).addClass(_self.image_scaled_class);
					$(el).closest('p').height(el.getBoundingClientRect().height);
				}
			});
		});

	},

	remove_listeners: function () {
		var _self = this;
		_self.blog_images.removeClass('image-scaled');
		_self.blog_images.closest('p').removeAttr('style');
	}

}});