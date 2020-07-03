function upload_img(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img_label').css("background-image", "url(" + e.target.result + ")");
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function () {
    $('#button-menu').click(function () {
        if ($('.speech_bubble').hasClass('speech_bubble_expand')) {
            $('.speech_bubble').toggleClass('speech_bubble_expand');
        }
    });
    $('.btn-add').click(function () {
        $('.speech_bubble').toggleClass('speech_bubble_expand');
    });
    $('.control').click(function () {
        if($('#checkbox').prop('checked')){
            $('.checkbox_label').text($('#hidden_unchecked').text());
        }
        else {
            $('.checkbox_label').text($('#hidden_checked').text());
        }
    });
    $(".item").click(function() {
        $(this).find('span').toggleClass('checked');
    });
    $('#search_input_btn').click(function () {
        console.log("tag=" + $('#search_input').val() + "&author=" + $('#author').val() + "&parent=" + $('#parent').val());
        $.ajax({
            type: "POST",
            url: "/api/new_tag",
            data: "tag=" + $('#search_input').val() + "&author=" + $('#author').val() + "&parent=" + $('#parent').val(),
            success: function (data) {
                if(data == "invalid credentials") {
                    location.reload();
                }
                else {
                    $('#tags_ul').append('<li id="tag' + data.substring(0, data.indexOf(":")) + '"><div class="item"><span class="checked">&#10004;</span>' + data.substring(data.indexOf(":") + 1) + '</div><button class="delete">X</button></li>');
                }
            },
        });
    });
    $.getScript('/static/frontend/js/csrfCookieToken.js', function () { });
});