$.extend(true, app, { transforms: {

	init: function () {
		$.each($('.transform-center'), function (i,el) {
			var $el = $(el);
			$el.css({
				'margin-left':-$el.width()/2,
				'margin-top':-$el.height()/2
			});

		});

	}

}});