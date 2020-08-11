// $("#login_html").hide();
var $container = $("#container_html");
var history_log = [""];

function pushWindow(url, htmlID, title_extension=""){
    if(window.location.pathname != url){
        $container.html($(htmlID).html());
        history.pushState({ content: $(htmlID).html() }, "Pocket Campaigns" + title_extension, url);
    }
}

$(document).ready(function () {
    if(window.location.pathname == "/login"){
        $container.html($("#login_template").html());
    }
    else if(window.location.pathname == "/register"){
        $container.html($("#register_template").html());
    }
    else {
        $container.html($("#landing_template").html());
    }

    $("#logo_landing").click(function () { pushWindow("/", "#landing_template"); });
    $("#button_landing").click(function () { pushWindow("/", "#landing_template"); });

    $("#login").click(function () { pushWindow("/login", "#login_template", "- Login"); });
    $("#register_to_login").click(function () { pushWindow("/login", "#login_template", "- Login"); });
    $("#landing_to_login").click(function () { pushWindow("/login", "#login_template", "- Login"); });

    $("#register").click(function () { pushWindow("/register", "#register_template", "- Register"); });
    $("#landing_to_register").click(function () { pushWindow("/register", "#register_template", "- Register"); });
    $("#sign_up").click(function () { pushWindow("/register", "#register_template", "- Register"); });

    window.onpopstate = function (ev) {
        var state_obj = ev.state;
        if(window.location.pathname == "/login"){
            $container.html($("#login_template").html());
        }
        else if(window.location.pathname == "/register"){
            $container.html($("#register_template").html());
        }
        else {
            $container.html($("#landing_template").html());
        }
    }
    // $("#landing_html").hide();
    // $("#login_html").show();
});
