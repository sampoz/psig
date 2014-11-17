#! /bin/bash

# Used to generate gif from all the images, the init script does this too, but in older versions it is faster to run this one.

echo "window.thumbnails = [ " > thumbnails.js
ls -1 thumbnails | awk '{printf("%s%s%s,\n","\"",$0,"\"")}' >> thumbnails.js
echo "];" >> thumbnails.js
# create a list of images
echo "window.images = [ " > images.js
ls -1 images | awk '{printf("%s%s%s,\n","\"",$0,"\"")}' >> images.js
echo "];" >> images.js
echo "Creating gif from all the images"
cd thumbnails
convert -delay 20 *.JPG -loop 0 all.gif
cd ..

