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
    var form_data = new FormData($('form').get(0));
    if (document.getElementById("campaign_img").files.length == 0) {
      form_data.append('hasImg', "false")
    }
    else {
      form_data.append('hasImg', "true")
      var file_data = $('#campaign_img').prop('files')[0];
    }
    form_data.append('img', file_data);
    form_data.append('title', $("#campaign_title").val());
    form_data.append('description', $("#campaign_description").val());
    form_data.append('author', $("#campaign_author").val());

    $.ajax({
      type: "POST",
      url: "/api/new_campaign",
      data: form_data,
      contentType: false,
      processData: false,
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
