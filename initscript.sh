#! /bin/bash
echo "make right dirs and make thumbnails"
mkdir images
mkdir thumbnails
#rename all to lowercase TODO
mv *.jpg images/
cd images
for file in *.jpg; do convert $file -resize 20% ../thumbnails/$file; done
cd ..
echo "window.thumbnails = [ " > thumbnails.js
ls -1 thumbnails | awk '{printf("%s%s%s,\n","\"",$0,"\"")}' >> thumbnails.js
echo "];" >> thumbnails.js
# create a list of images
echo "window.images = [ " > images.js
ls -1 images | awk '{printf("%s%s%s,\n","\"",$0,"\"")}' >> images.js
echo "];" >> images.js

