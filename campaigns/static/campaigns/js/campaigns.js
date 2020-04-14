function upload_img(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#campaign_img_label').css("background-image", "url("+e.target.result+")");
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function(){
  //navigation
  $('#button-menu').click(function(){
    if($('.speech_bubble').hasClass('speech_bubble_expand')){
      $('.speech_bubble').toggleClass('speech_bubble_expand');
    }
    $('#bottom-nav').toggleClass('open');
  });
  //new campaign button
  $('.speech_button').click(function () {
    $('.speech_bubble').toggleClass('speech_bubble_expand');
  });
  //new campaign
  $("#create_card").click(function () {
    var title = $("#campaign_title").val();
    var description = $("#campaign_description").val();
    var author = $("#campaign_author").val();
    $.ajax({
      type: "POST",
      url: "/api/new_campaign",
      data: "title=" + title + "&description=" + description + "&author=" + author,
      success: function (data) {
        if(data != "invalid credentials"){
          location.reload();
        }
      },
    });
  });
  //csrf
  $.ajaxSetup({
    beforeSend: function (xhr, settings) {
      function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        // Only send the token to relative URLs i.e. locally.
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      }
    }
  });
});
