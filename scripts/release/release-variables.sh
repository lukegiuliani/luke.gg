#!/bin/bash

# Contains the project specific stuff for perform-release.sh
PERMS="squareweave:users"
if [ "x$1" = 'xproduction' ];then
	echo "We need to make some changes to the prod htaccess first"
	exit 1
	# SERVER="squadron"
	# OLD_RELEASE_LINK="/home/squareweave/Sites/squareweave/production/releases/old-release"
	# CURRENT_RELEASE_LINK="/home/squareweave/Sites/squareweave/production/releases/last-release"
	# rev_name=$(git log --oneline | awk '{print $1}' | head -n 1)
	# release_dir="/home/squareweave/Sites/squareweave/production/releases/release-$rev_name"
	# PUBLIC_DEST="/home/squareweave/public_html/squareweave"
	# GRUNT_TARGET=production
elif [ "x$1" = 'xstaging' ];then
	SERVER="squadron"
	OLD_RELEASE_LINK="/home/squareweave/Sites/squareweave/staging/releases/old-release"
	CURRENT_RELEASE_LINK="/home/squareweave/Sites/squareweave/staging/releases/last-release"
	release_dir="/home/squareweave/Sites/squareweave/staging/releases/release-staging"
	PUBLIC_DEST="/home/squareweave/public_html/staging"
	GRUNT_TARGET=staging
else
   echo "Usage: perform-release.sh <staging|production>" 
   exit 1
fi

# Stuff that needs to be run on the remote server from within the relase dir
RELEASE_POSTPROCESSING="
ln -s ../../htaccess .htaccess || exit 1;
"
