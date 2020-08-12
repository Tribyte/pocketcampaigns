$.getScript('/static/frontend/js/xhrRequest.js', function () { });

$(document).ready(function () {
    $("#submit").click(function () {
        var form_data = new FormData();
        if (document.getElementById("img").files.length > 0) {
            var file_data = $('#img').prop('files')[0];
            form_data.append('img', file_data);
        }

        form_data.append('title', $("#title").val());
        form_data.append('description', $("#description").val());
        form_data.append('private', $("#checkbox").prop('checked') ? 'True' : 'False');

        sendXHR("/api/campaigns/", "POST", form_data, function (data) {
            console.log(data);
        });
    });
});