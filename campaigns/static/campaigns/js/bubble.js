function upload_img(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#campaign_img_label').css("background-image", "url(" + e.target.result + ")");
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function () {
    $('#button-menu').click(function () {
        if ($('.speech_bubble').hasClass('speech_bubble_expand')) {
            $('.speech_bubble').toggleClass('speech_bubble_expand');
        }
        $('#bottom-nav').toggleClass('open');
    });
    $('.speech_button').click(function () {
        $('.speech_bubble').toggleClass('speech_bubble_expand');
    });
});