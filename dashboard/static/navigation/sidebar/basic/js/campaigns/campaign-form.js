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
            if(data['id'] != null){
                var campaign_template_data = new FormData();
                campaign_template_data.append('id', data['id'].toString());
                sendXHR_NoParse("/api/nav/sidebar/basic/templates/element", "POST", campaign_template_data, function (data) {
                    $(".new-campaign").before(data);
                    initClickDelete();
                });
            }

            $(".title").val("");
            $(".description").val("");
            $(".new-campaign").removeClass("active");
            $(".campaign-form").removeClass("active");
        });
    });
});

    //     if (document.getElementById("img").files.length > 0) {
    //         var file_data = $('#img').prop('files')[0];
    //         form_data.append('img', file_data);
    //     }aa