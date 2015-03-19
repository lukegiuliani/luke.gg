var timer = require("grunt-timer");

module.exports = function (grunt) {

	timer.init(grunt, {
		deferLogs: false,
		friendlyTime: false,
		color: "blue"
	});

	require('jit-grunt')(grunt, {
		"sculpin-generate": 'grunt-sculpin',
		"sculpin-serve": 'grunt-sculpin',
		"sculpin-watch": 'grunt-sculpin',
		"jshint": 'grunt-contrib-jshint',
		"useminPrepare": 'grunt-usemin'
	});

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			develop: {
				options: {
					outputStyle: 'expanded',
					sourceMap: true
				},
				files: {
					"source/design/css/global.css": "source/design/scss/global.scss"
				}
			},
			build: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					"source/design/css/global.css": "source/design/scss/global.scss"
				}
			}
		},

		"bower-install-simple": {
			options: {
				color: true,
				directory: "bower_components"
			},

			"develop": {
				options: {
					production: false
				}
			},

			"build": {
				options: {
					production: true
				}
			}
		},

		usemin: {
			html: ['output_prod/**/*.html',
				'!output_prod/design/**/*.html']
		},

		'useminPrepare': {
			html: 'output_prod/index.html',
			options: {
				root: 'output_prod',
				dest: 'output_prod'
			}
		},

		uglify: {
			options: {
				compress: {
					drop_console: true
				},
				mangle: {
					except: [
						'jQuery',
						'Backbone',
						'Spinner',
						'$',
						'enquire',
						'respond',
						'Bootstrap',
						'Maplace',
						'app',
						'Modernizr'
					]
				}
			}
		},

		cmq: {
			build: {
				files: {
					'source/design/css/global.css':'source/design/css/global.css'
				}
			}
		},
		cssmin: {
			build: {
				files: {
					'output_prod/design/css/global.css':'output_prod/design/css/global.css'
				}
			}
		},

		//* =============================================
		//Section: WATCH
		//================================================ */
		watch: {
			options: {
				livereload: true,
				options: {
					nospawn: true
				}
			},
			less: {
				options: {
					livereload: false
				},
				files: [
					'source/design/scss/**/*.scss'
				],
				tasks: ['sass:develop']
			},
			grunt: {
				files: ['output_dev/design/css/global.css']
			},
			output: {
				files: ['output_dev/**/*.html', '!output_dev/design/**/*.html'],
				tasks: []
			},
			tpl: {
				files: [ 'Gruntfile.js', 'package.json'],
				tasks: []

			},
			js: {
				files: ['source/design/scripts/*.js'],
				tasks: ['copy:js','jshint']
			}
		},
			//the order of the built and copied LESS LOL.
		bless: {
			css: {
				options: {
					cacheBuster: true,
					compress: true
				},
				files: {
					'source/design/css/fya-header-footer.css': 'source/design/css/fya-header-footer.css'
				}
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					FB: true,
					twttr: true,
					enquire: true
				}
			},
			defaults: ['source/design/scripts/**/*.js', '!source/design/scripts/site-compiled.js' ]
		},

		imagemin: {
			dynamic: {  // Another target
				files: [{
					expand: true,  // Enable dynamic expansion
					cwd: 'source/design/images/',// Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'source/design/images/' // Destination path prefix
				}]
			}
		},
		copy: {
			js: {
				files: [
					{
						expand: true,
						cwd: 'source/design/scripts',
						src: ['**'],
						dest: 'output_dev/design/scripts/',
						filter: 'isFile'
					}
				]
			},
			bower_develop: {
				files: [
					{
						expand: true,
						cwd: 'bower_components/',
						src: ['**'],
						dest: 'output_dev/design/vendor/bower',
						filter: 'isFile'
					}
				]
			},
			bower_build: {
				files: [
					{
						expand: true,
						cwd: 'bower_components',
						src: ['**'],
						dest: 'output_prod/design/vendor/bower'
					}
				]
			},
			build_to_dev: {
				files: [
					{
						expand: true,
						cwd: 'output_prod/',
						src: ['**'],
						dest: 'output_dev/'
					}
				]
			},
			staging_to_prod: {
				files: [
					{
						expand: true,
						cwd: 'output_staging/',
						src: ['**'],
						dest: 'output_prod/'
					}
				]
			}
		},
		filesize: {
			compiled_js_size: [
				'source/design/scripts/site-compiled.js'
			],
			compiled_css_size: [
				'source/design/css/global.css'
			]
		},
		
		uncss: {
			dist: {
				options: {

					//stylesheets:['/design/css/global.css'],
					htmlroot: 'output_prod',
					ignore: [
						/(\S*\-active)/g,
						/^#active/g,
						/(parsley\-errors\-list)/g,
						/(\S*js-\S*)/g,
						/(\S*\-responder\-\S*)/g,
						'.site-header--nav-active .site-header__drop',
						'.site-header--nav-active .site-header__link',
						'.image-scaled',
						'.site-header--up',
						'.blog-detail .fb_iframe_widget span',
						'.fb-comments',
						'.site-loading-spinner:after',
						'.site-loading-spinner:before',
						'.blog-detail__social span',
						'.blog-detail__social iframe',
						'.blog-detail__social .IN-widget'
					]
				},
				files:{
					'output_prod/design/css/global.css': ['output_prod/**/*.html', '!output_prod/design/**/*.html']
				}
			}
		},

		'sculpin-serve': {
			options: {
				bin: 'php sculpin.phar'
			},

			develop: {}

		},
		'sculpin-generate': {
			options: {
				bin: 'php sculpin.phar'
			},
			develop: {

			},
			staging: {
				args: {
					env: 'staging',
					url: 'http://staging.luke.gg'
				}
			},
			production: {
				args: {
					env: 'prod',
					url: 'https://luke.gg'
				}
			}
		},
		'sculpin-watch': {
			options: {
				bin: 'php sculpin.phar'
			},
			develop: {
				args: {
					server: true,
					url: 'http://localhost:8000'
				}
			}
		},
		concurrent: {
			watchers: {
				tasks: ['sculpin-watch','watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},

			production: {
				files: [
						{
						expand: true,
						cwd: 'output_prod/',
						src: ['**/*.html', '!design/**/*.html' ],
						dest: 'output_prod/'
					}
				]
			}
		},
		concat:{},
		shell: {
			remove_output_prod: {
				command: 'rm -rf output_prod'
			},
			remove_bower: {
				command: 'cd output_prod/design/vendor; rm -rf bower'
			},
			remove_output_staging: {
				command: 'rm -rf output_staging'
			}
		}


	});

	grunt.registerTask('message:welcome', [], function () {
		grunt.log.writeln([
			'\n*************\n'['rainbow'].bold +
			'Now open your browser and http://localhost:8000 and have a nice time. '['green'].bold +
			'*************'['rainbow'].bold
		]);
	});

	grunt.registerTask('message:preview', [], function () {
		grunt.log.writeln([
			'\n*************\n'['green'].bold +
			'The production version of the site is available at http://localhost:8000 \n'['green'].bold +
			'*************'['green'].bold
		]);
	});

	grunt.registerTask('message:build_done', [], function () {
		grunt.log.writeln([
			'\n*************\n'['green'].bold +
			'Your theme has now been built for production!\n'['green'].bold +
			'*************'['green'].bold
		]);
	});

	grunt.event.on('watch', function (action, filepath) {
		grunt.log.writeln([action]);
		grunt.log.writeln([filepath]);
		grunt.config(['jshint', 'defaults'], filepath);
	});

	/*
	 ==================
	 * Here are the important tasks!
	 ==================
	 * */

	/*
	 * `grunt develop`: this task runs the watch so your assets update live, your site will be accessible at http://localhost:8000.
	 * */
	grunt.registerTask('default', [], function () {
		grunt.log.subhead('That isn\'t a valid task. Run one of these instead:\n'['red'].bold);
		grunt.log.writeln(['~~~~~~~\n'['rainbow'] +
			'grunt develop:'['green']+'Starts livereload watcher for scss, html and js in /source, builds static site in /output_dev then starts static server and then opens in default browser. \n' +
			'grunt staging:'['green']+' Builds complete static site to /output_prod folder with the base url of http://staging.luke.gg \n'+
			'grunt production:'['green']+' Builds complete static site to /output_prod folder with the base url of http://luke.gg \n'+
			'grunt preview:'['green']+' Builds complete static site (staging version) to /output_prod, copies to /output_dev then starts static web server to preview build site.\n' +
			'~~~~~~~'['rainbow']
		]);
	});

	/*
	 * `grunt staging` outputs to output_dev
	 * */
	grunt.registerTask('develop', [], function () {
		grunt.task.run('bower-install-simple:develop', 'sass:develop', 'copy:bower_develop','message:welcome', 'concurrent:watchers');
	});

	grunt.registerTask('pre-sculpin', [], function () {
		grunt.task.run(
			'bower-install-simple:build',
			'sass:build',
			'shell:remove_output_prod'
		);
	});

	grunt.registerTask('post-sculpin', [], function () {
		grunt.task.run(
			'copy:bower_build',
			'useminPrepare',
			'usemin',
			'concat',
			'uglify',
			'uncss',
			'cssmin',
			'htmlmin',
			'shell:remove_bower'
		);
	});

	/*
	 * `grunt staging` outputs to output_prod
	 * */
 	grunt.registerTask('staging', [], function () {
		// Sculpin outputs to output_staging, but usemin
		// needs it to be in output_prod. We move the 
		// Sculpin output to output_prod and remove the
		// output_staging dir
		grunt.task.run(
			'pre-sculpin',
			'sculpin-generate:staging',
			'copy:staging_to_prod',
			'shell:remove_output_staging',
			'post-sculpin'
		);
	});

	/*
	 * `grunt production` outputs to output_prod
	 * */
	grunt.registerTask('production', [], function () {
		grunt.task.run(
			'pre-sculpin',
			'sculpin-generate:production',
			'post-sculpin'
		);
	});

	/*
	 * `grunt preview`: this task creates a production ready build and then allows it to be seen @ http://localhost:8000
	 * */
	grunt.registerTask('preview', [], function () {
		grunt.task.run('staging', 'copy:build_to_dev','message:preview','sculpin-serve');
	});

};
