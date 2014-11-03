#! /bin/bash
echo "create right dirs"
mkdir images
mkdir thumbnails
#rename all to lowercase TODO
echo "move images to images folder"
mv *.jpg images/
cd images
echo "create thumbnails from original images"
for file in *.jpg; do convert $file -resize 20% ../thumbnails/$file; done
cd ..
echo "window.thumbnails = [ " > thumbnails.js
ls -1 thumbnails | awk '{printf("%s%s%s,\n","\"",$0,"\"")}' >> thumbnails.js
echo "];" >> thumbnails.js
# create a list of images
echo "window.images = [ " > images.js
ls -1 images | awk '{printf("%s%s%s,\n","\"",$0,"\"")}' >> images.js
echo "];" >> images.js

