#! /bin/bash
echo "make right dirs and make thumbnails"
mkdir thumbnails
#rename all to lowercase TODO
cd images
for file in *.JPG; do convert $file -resize 20% ../thumbnails/$file; done
cd ..
echo "window.thumbnails = [ " > thumbnails.js
ls -1 thumbnails | awk '{printf("%s%s%s,\n","\"",$0,"\"")}' >> thumbnails.js
echo "];" >> thumbnails.js
