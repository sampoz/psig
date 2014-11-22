#! /bin/bash
# Image and movie filetypes
filetypes=('*.jpg' '*.JPG' '*.avi' '*.AVI')
movietypes=('*.avi' '*.JPG')
echo "create right dirs"
mkdir images
mkdir thumbnails

echo "Create a title image from movies"
for movietype in ${movietypes[*]};do
	avconv -i $movietype -f image2 -vframes 1 image_$movietype
        mv $movietypes images/ 
done

echo "move images to images folder"
for filetype in ${filetypes[*]};do
        mv $filetype images/ 
done
cd images
echo "Rotating images according to exif-data"
exiftran -ia *
echo "create thumbnails from original images"
for file in ${filetypes[*]};do
	echo "converting file " $file
	convert $file -resize 9% -quality 90 ../thumbnails/$file; 
done
cd ..
bash gifs.sh
