var loginID = document.getElementById('id01');
var registerID = document.getElementById('id02');

var login = function(){
    registerID.style.display = "none";
    loginID.style.display = "block";
}

var registeruser = function(){
    loginID.style.display = "none";
    registerID.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == loginID) {
        loginID.style.display = "none";
    }
    if(event.target == registerID){
        registerID.style.display = "none";
    }
}

$(document).ready(function () {
    //login
    $("#login").click(function () {
        var username = $("#login_username").val();
        var password = $("#login_password").val();
        $.ajax({
            type: "POST",
            url: "api/login",
            data: "username=" + username + "&password=" + password,
            success: function (data) {
                if(data === "logged in"){
                    location.reload();
                }
                else{
                    alert("//Todo: fix error display.\n\n Error: " + data);
                }
            },
        });
    });
    //register
    $("#register").click(function () {
        var username = $("#register_username").val();
        var password = $("#register_password").val();
        var check_pass = $("#register_check_pass").val();
        $.ajax({
            type: "POST",
            url: "api/register",
            data: "username=" + username + "&password=" + password + "&check_pass=" + check_pass,
            success: function (data) {
                if (data === "logged in") {
                    location.reload();
                }
                else {
                    alert("//Todo: fix error display.\n\n Error: " + data);
                }
            },
        });
    });
    //csrf
    $.getScript('/static/frontend/js/csrfCookieToken.js', function () { });
});