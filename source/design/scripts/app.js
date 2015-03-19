var app = {
	available_in_dom: function ($element) {
		return ($element.length > 0);
	}
};

jQuery(document).ready(function($) {

	/*
	* IE transforms.
	* */
	if (!Modernizr.csstransforms) {
		app.transforms.init();
	}

	/*
	* Small snippets necessary on a global or page level.
	* */
	app.toys.init();

	/*
	* History based navigation sitewide
	* */
	app.navigation.init();

	/*
	 * sneaky blog functionality
	 * */
	app.blog.init();
});