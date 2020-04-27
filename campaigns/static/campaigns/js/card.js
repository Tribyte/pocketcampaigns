$(document).ready(function () {
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
                location.reload();
            },
        });
    });
    //csrf
    $.getScript('/static/campaigns/js/csrfCookieToken.js', function () { });
});