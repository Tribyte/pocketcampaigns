$(document).ready(function () {
    $("footer-fix").on('dragover', false);
    $("footer-fix").on('drop', function (e) {
        console.log(e);
    });
});