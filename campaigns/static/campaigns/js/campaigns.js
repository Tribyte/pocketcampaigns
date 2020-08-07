$.getScript('/static/frontend/js/xhrRequest.js', function () { });

$(document).ready(function () {
  //new campaign
  $("#submit").click(function () {
    var form_data = new FormData();
    if (document.getElementById("img").files.length > 0) {
      var file_data = $('#img').prop('files')[0];
      form_data.append('img', file_data);
    }

    form_data.append('title', $("#title").val());
    form_data.append('description', $("#description").val());
    form_data.append('private', $("#checkbox").prop('checked') ? 'True' : 'False');

    sendXHR("/api/campaigns/", "POST", form_data, function (data){
      console.log(data);
    });
  });

  //delete campaign
  $("#delete_campaign").click(function () {
    var confirm_delete = confirm("Are you sure you want to delete this campaign?");
    if (confirm_delete) {
      var form_data = new FormData();
      form_data.append('campaignid', $("#id").val());
      form_data.append('author', $("#author").val());

      $.ajax({
        type: "POST",
        dataType: "json",
        url: "/api/delete_campaign",
        data: form_data,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data != "invalid credentials") {
            location.reload();
          }
        },
      });
    }
  });
});
