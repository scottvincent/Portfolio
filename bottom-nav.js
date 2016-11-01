var links = document.getElementsByClassName("bottom-click");
var linkClick = function() {
   document.getElementById('right-container').scrollTop = document.getElementById('top-scroll').offsetTop-10;
};

for(var i = 0; i < links.length; i++){
  links[i].onclick = linkClick;
}