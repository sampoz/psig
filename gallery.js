var currentImage = getUrlParameter("image");
var nextImage = getImage(currentImage, "next");
var previousImage = getImage(currentImage, "previous"); 
fillImages();
$( "body" ).keydown(function(e) {
            if(e.keyCode == 37) { // left
                previous();
                updateImages();
            }
              else if(e.keyCode == 39) { // right
                next();
                updateImages();
            }
        });

function fillImages() {
// Fill in the current image and preload the next and previous
    $('<img id="mainImage" class="image" src="images/'+ currentImage +'">').load(function() {
      $(this).appendTo('#imgtable'); 
    });
    $('<img id="nextImage" class="image-preload" src="images/"'+ nextImage +'">').load(function() {
      $(this).appendTo('#imgtable'); 
    });
    $('<img id="previousImage" class="image-preload" src="images/"'+ previousImage +'">').load(function() {
        $(this).appendTo('#imgtable'); 
    });
}

function updateImages() {
// Load News ones
    $('<img id="mainImage" class="image" src="images/'+ currentImage +'">').load(function() {
      $("#mainImage").replaceWith(this); 
    });
    $('<img id="nextImage" class="image-preload" src="images/'+ nextImage +'">').load(function() {
      $("#nextImage").replaceWith(this); 
    });
    $('<img id="previousImage" class="image-preload" src="images/'+ previousImage +'">').load(function() {
      $("#previousImage").replaceWith(this); 
    });
    // $('<img id="nextImage" class="image-preload" src="images/'+ nextImage +'">').load(function() {
    //   $(this).appendTo('#imgtable'); 
    // });
    // $('<img id="previousImage" class="image-preload" src="images/'+ previousImage +'">').load(function() {
    //     $(this).appendTo('#imgtable'); 
    // });
}
function getImage(current, direction) {
    var currentId = window.images.indexOf(current);
    if (currentId != -1) {
        if (direction == "next"){
            if(window.images.length - currentId > 1) { // There can be a next image 
                return window.images[currentId+1];   
            } 

        } else if (direction == "previous"){
            if( window.images.length - currentId < window.images.length ) { // there are images left 
                return window.images[currentId-1];   
            } 
        }
    } 
}       
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}  
function previous() {
    var tmp         = getImage(currentImage, "previous");
    if (!tmp) alert("First Image");
    nextImage       = currentImage; 
    currentImage    = previousImage;
    previousImage   = tmp;
        }
function next() {
    var tmp         = getImage(currentImage, "next");
    if (!tmp) alert("Last Image");
    previousImage   = currentImage;
    currentImage    = nextImage;
    nextImage       = tmp; 
}