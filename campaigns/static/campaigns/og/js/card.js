$(document).ready(function () {
    $('#submit').click(function() {
        var form_data = new FormData();
        form_data.append('identifier', $("#description").val());
        form_data.append('parent', $("#parent").val());
        form_data.append('author', $("#author").val());
        form_data.append('cardid', $("#cardid").val());
        form_data.append('private', $("#checkbox").prop('checked') ? 'True' : 'False');

        $.ajax({
            type: "POST",
            url: "/api/new_identifier",
            data: form_data,
            contentType: false,
            processData: false,
            success: function (data) {
                location.reload();
            },
        });
    });
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
    $.getScript('/static/frontend/js/csrfCookieToken.js', function () { });
});