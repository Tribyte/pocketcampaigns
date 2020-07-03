$(document).ready(function(){
  //new tag
  $("#add_tag").click(function () {
    var form_data = new FormData();
    form_data.append('tag', $("#tag_input").val());
    form_data.append('parent', $("#card_parent").val());
    form_data.append('author', $("#card_author").val());
    form_data.append('cardid', $("#card_id").val());

    $.ajax({
      type: "POST",
      url: "/api/new_tag",
      data: form_data,
      contentType: false,
      processData: false,
      success: function (data) {
        $("#search_input").val("");
        location.reload();
        // $("#search_list").append("<li><div class='item' id='c" + data + "'><span class='checked'>&#10004;</span> " + text + "</div><button class='delete'>X</button></li>");
      },
    });
  });
  //new card
  $("#submit").click(function () {
    var form_data = new FormData($('form').get(0));
    if (document.getElementById("img").files.length == 0) {
      form_data.append('hasImg', "false")
    }
    else {
      form_data.append('hasImg', "true")
      var file_data = $('#img').prop('files')[0];
    }
    form_data.append('img', file_data);
    form_data.append('title', $("#title").val());
    form_data.append('description', $("#description").val());
    form_data.append('parent', $("#parent").val());
    form_data.append('author', $("#author").val());

    $.ajax({
      type: "POST",
      url: "/api/new_card",
      data: form_data,
      contentType: false,
      processData: false,
      success: function (data) {
        location.reload();
      },
    });
  });
  //csrf
  $.getScript('/static/frontend/js/csrfCookieToken.js', function () {});
});
