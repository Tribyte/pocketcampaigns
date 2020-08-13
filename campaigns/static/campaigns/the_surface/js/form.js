$.getScript('/static/frontend/js/xhrRequest.js', function () { });

$(document).ready(function () {
    $(".title").keyup(function () {
        if($(this).val().length > 0){
            $(".description").addClass("active");
            $(".create_campaign").addClass("active");
            $(".advanced_options").addClass("active");
        }
        else {
            $(".description").removeClass("active");
            $(".create_campaign").removeClass("active");
            $(".advanced_options").removeClass("active");
        }
    });
    $(".advanced_options").click(function () {
        $(".create_campaign").removeClass("active");
        $(".advanced_options").removeClass("active");
        $(".theme").addClass("active");
    });
    $(".create_campaign").click(function () {
        var form_data = new FormData();

        form_data.append('title', $(".title").val());
        form_data.append('description', $(".description").val());
        // form_data.append('private', $("#checkbox").prop('checked') ? 'True' : 'False');

        sendXHR("/api/campaigns/", "POST", form_data, function (data) {
            $(".new-campaign").before("\
                <div class=\"element\" draggable=\"true\">\
                    <a class=\"campaign\">\
                        <input type=\"hidden\" class=\"campaign-id\" value=" + data["id"] + ">\
                        <h2>" + data["title"] + "</h2>\
                    </a>\
                    <span>" + $(".lock-open-ico").html() + "</span>\
                    <div class=\"dropdown\">\
                    </div>\
                </div>\
            ");
            $(".title").val("");
            $(".description").val("");
        });
    });
});

    //     if (document.getElementById("img").files.length > 0) {
    //         var file_data = $('#img').prop('files')[0];
    //         form_data.append('img', file_data);
    //     }