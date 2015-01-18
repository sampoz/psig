var currentImage =  {"id":"mainImage", "class":"image", "name":getUrlParameter("image")};  
var nextImage = {"id":"nextImage", "class":"image-preload", "name":getImage(currentImage.name, "next")};
var previousImage = {"id":"previousImage", "class":"image-preload", "name":getImage(currentImage.name, "previous")}; 
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
    fillImage(currentImage);
    if(nextImage.name) fillImage(nextImage);
    if(previousImage.name) fillImage(previousImage);
}
function fillImage(image) {
    if(checkIfVideo(image.name)){
        fillVideo(image);
    } else {
        $('<img id="' + image.id + '" class="' + image.class + '" src="images/'+ image.name +'">').load(function() {
        $(this).appendTo('#imgtable'); 
        });
    }    
}

function fillVideo(video) {
      $('<video id="' + video.id + '" width="1280" height="720" class="' + video.class + '" controls > <source src="images/'+ video.name +'" type="video/webm"> Your browser does not support the video tag. </video>').appendTo("#imgtable");
}

function updateVideo(video) {
      $("#"+video.id).replaceWith('<video id="' + video.id + '" width="320" height="240" class="' + video.class + '" controls > <source src="images/'+ video.name +'" type="video/webm"> Your browser does not support the video tag. </video>'); 
}

function updateImages() {
// Load News ones
    updateImage(currentImage);
    if(nextImage.name) updateImage(nextImage);
    if(previousImage.name) updateImage(previousImage);
}

function updateImage(image) {
    if(checkIfVideo(image.name)){
        updateVideo(image);
    } else {
        $('<img id="' + image.id + '" class="' + image.class + '" src="images/'+ image.name +'">').load(function() {
          $("#"+image.id).replaceWith(this); 
        });
    }
}

function getImage(current, direction) {
    var currentId = window.images.indexOf(current);
    if (currentId != -1) {
        if (direction == "next"){
            if(window.images.length - currentId > 1) { // There is a next image 
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
    var tmp         = getImage(previousImage.name, "previous");
    nextImage.name      = currentImage.name; 
    currentImage.name   = previousImage.name;
    previousImage.name  = tmp;
    if(!currentImage.name) alert("First Image");
        }
function next() {
    var tmp         = getImage(nextImage.name, "next");
    previousImage.name   = currentImage.name;
    currentImage.name    = nextImage.name;
    nextImage.name       = tmp; 
    if (!currentImage.name) alert("Last Image");
}
function checkIfVideo(name){
    if (name.indexOf(".AVI") != -1 || name.indexOf(".avi") != -1) {
        return true;
    }
    return false;
}