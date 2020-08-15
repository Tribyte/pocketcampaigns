function snackbar(text){
    $(".snackbar").children("h1").text(text);
    $(".snackbar").addClass("active");
    setTimeout(function () {
        $(".snackbar").removeClass("active");
    }, 3000);
}