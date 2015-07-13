#! /bin/bash
# Image and movie filetypes
filetypes=('*.jpg' '*.JPG' '*.webm')
movietypes=('*.avi' '*.AVI' '*.MOV')
echo "create right dirs"
mkdir images
mkdir thumbnails

echo "Create a title image from movies"
for movietype in ${movietypes[*]};do
	avconv -i $movietype -f image2 -vframes 1 $movietype.png
	convert $movietype.png -resize 30% -quality 90 $movietype.png;
	composite -compose atop -gravity center ./video_watermark.png $movietype.png ./thumbnails/$movietype.png
	rm image_$movietype.png
done
echo "Encode movies to webM"
for movietype in ${movietypes[*]};do 
	avconv -i $movietype -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis $movietype.webm
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
