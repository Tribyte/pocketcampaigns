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
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });
});