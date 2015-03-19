Squareweave Website
===================

Compiled with [Sculpin](http://sculpin.io).


Downloading Sculpin
-------------------

From the project's home directory, execute the following to retrieve the latest version of Sculpin:

    curl -O https://download.sculpin.io/sculpin.phar

When this completes, set it to be executable:

    chmod 755 sculpin.phar

Develop Locally
---------------

    npm install
    grunt develop

Your newly generated documentation is now accessible at `http://localhost:8000/`.
All the less files are watched for change, and the browser will update on any template change.

###Bower component installation

1. Quit the grunt process. (`ctrl-c`)
2. Install the given bower component. (`bower install COMPONENTNAME --save-dev --save`)
3. Re-run the grunt task, this will move the bower files to the necessary place after running a sculpin generate.

Preview Production Builds in your browser
----------------------------------------

It may be that you want to test your site's frontend code in the browser prior to deployment.
You can do so by running the following:

    npm install
    grunt preview

Your production site build is ready to be explored @ `http://localhost:8000`

####How it works

1. A production build is made into the `/output_prod` folder.
2. The production build is moved into the `/output_dev` folder.
3. The sculpin-serve task (which runs the `output_dev` folder as site root) is run which allows the production site to be seen @ `http://localhost:8000`
 
Generating Publishable Production Builds
----------------------------------------

When you want to create a publishable production build based on the `www.squareweave.com.au` domain. Run the `grunt production` task from the root.
This will generate a complete publishable, optimised static site inside `/output_prod`. 


###Performing releases

To perform a staging or production release you can use the ./scripts/release/perform-release.sh script after performing the :

	./scripts/release/perform-release.sh <staging|production>
