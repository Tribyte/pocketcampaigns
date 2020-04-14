var modal1 = document.getElementById('id01');
var modal2 = document.getElementById('id02');

function closeModel(modalID){
  document.getElementById(modalID).style.display = "none";
}

function upload_img(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#img_id').css("background-image", "url("+e.target.result+")");
    }
    reader.readAsDataURL(input.files[0]);
  }
}

window.onclick = function(event) {
  if (event.target == modal1 || event.target == modal2) {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
}

$(document).ready(function(){
  $('#button-menu').click(function(){
    $('#bottom-nav').toggleClass('open');
  });
});
