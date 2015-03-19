#!/bin/bash

# Builds a release for the project and deploys it to staging or production.
#
# NOTE: Trailing directory slashes are very important in this script due to the
# frequent use of rsync

# Fail script if any command fails
set -e

# Go to root of repo
cd $(dirname $0)/../..

source ./scripts/release/release-variables.sh

if [ ! -x sculpin.phar ];then
	echo "Please install sculpin.phar in the repo root and make it executable (see readme.md)"
	exit 1
fi

if ! hash npm 2> /dev/null;then
	echo "Need npm to be installed"
	exit 1
fi

if ! hash grunt 2> /dev/null;then
	echo "Need grunt to be installed"
	exit 1
fi

npm install # Let's make sure we have this done
grunt $GRUNT_TARGET

artifact_dir=output_prod

# Make us an rsyncable directory
echo "== Creating release directory"
ssh $SERVER <<EOT
mkdir -p "$release_dir" || exit 1

if [ -L "$CURRENT_RELEASE_LINK" ];then
	# Copy current release to new one
	current_release=\$(readlink -f "$CURRENT_RELEASE_LINK")
	if [ "\$current_release" != "$release_dir" ];then
		rsync -r "\$current_release/" "$release_dir" || exit 1
	fi
fi
EOT

echo "== Copying up release"
rsync -rlvc --delete "$artifact_dir/" $SERVER:"$release_dir"

echo "== Linking up release"
ssh $SERVER <<EOT
cd "$release_dir"

# See release-variables.sh
$RELEASE_POSTPROCESSING

# Correct permissions
chown -R $PERMS $release_dir || exit 1

rm $PUBLIC_DEST && ln -s $release_dir $PUBLIC_DEST || exit 1

# Rotate out the relases
if [ -L "$OLD_RELEASE_LINK" ];then
	old_release=\$(readlink -f "$OLD_RELEASE_LINK")
	current_release=\$(readlink -f "$release_dir")
	if [ "\$old_release" != "\$current_release" ];then
		rm -fr "\$old_release" || exit 1
	fi
	rm "$OLD_RELEASE_LINK" || exit 1
fi

if [ -L $CURRENT_RELEASE_LINK ];then
	current_release=\$(readlink -f "$CURRENT_RELEASE_LINK")
	ln -s \$current_release $OLD_RELEASE_LINK || exit 1
	rm $CURRENT_RELEASE_LINK || exit 1
fi
ln -s "$release_dir" $CURRENT_RELEASE_LINK || exit 1
EOT

rm -fr $artifact_dir
