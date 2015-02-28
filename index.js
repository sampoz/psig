window.startPhoto = 0;
window.pageSize = 2;
window.endPhoto = startPhoto + pageSize;
$(document).ready(function () {
	drawPage();
});
function nextPage(){
	window.startPhoto += pageSize;
	window.endPhoto += pageSize;
	drawPage();
}
function drawPage(){
	var lastPhoto;
	if (thumbnails.length < endPhoto) {
		lastPhoto = window.thumbnails.length   
	} else {
		lastPhoto = window.endPhoto
	}
	slicedThumbs = thumbnails.slice(window.startPhoto, lastPhoto)
	slicedImages = images.slice(window.startPhoto, lastPhoto)
	for (var thumbnail in slicedThumbs) {
            $( "#imgtable" ).append( " <a href=\"image.html?image=" + slicedImages[thumbnail] + "\" > <img class='thumb' alt=\"Image\"  src=\"thumbnails/" + window.slicedThumbs[thumbnail] + "\"> </a>" );
        }
}
