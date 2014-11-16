#! /bin/bash
echo "create right dirs"
mkdir images
mkdir thumbnails
#rename all to lowercase TODO
echo "move images to images folder"
mv *.JPG images/
cd images
echo "Rotating images according to exif-data"
exiftran -ia *
echo "create thumbnails from original images"
for file in *.JPG;do
	echo "converting file " $file
	convert $file -resize 7% -quality 85 ../thumbnails/$file; 
done
cd ..
bash gifs.sh
