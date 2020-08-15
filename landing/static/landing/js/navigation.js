var $container = $("#container_html");
var empty_form_data = new FormData();

function pushWindow(url, dataURL, initFunc, title_extension = ""){
    if(window.location.pathname != url){
        sendXHR_NoParse(dataURL, "POST", empty_form_data, function (data) {
            $container.html(data);
            history.pushState({ content: data }, "Pocket Campaigns" + title_extension, url);
            initFunc();
        });
    }
}

function pushWindowURL_Match(url, initFunc, title_extension = "") {
    if (window.location.pathname != url) {
        sendXHR_NoParse(url, "POST", empty_form_data, function (data) {
            $container.html(data);
            history.pushState({ content: data }, "Pocket Campaigns" + title_extension, url);
            initFunc();
        });
    }
}

function landingNavigationInit(){
    $("#landing_to_login").click(function () { pushWindowURL_Match("/login", loginNavigationInit, "- Login"); });
    $("#landing_to_register").click(function () { pushWindowURL_Match("/register", registerNavigationInit, "- Register"); });
}

function loginNavigationInit(){
    $(".login_form").on("click", "#sign_up", function () { pushWindowURL_Match("/register", registerNavigationInit, "- Register"); });
    loginInit();
}

function registerNavigationInit(){
    $(".register_form").on("click", "#register_to_login", function () { pushWindowURL_Match("/login", loginNavigationInit, "- Login"); });
    registerInit();
}

function loadNavigation(){
    if(window.location.pathname == "/login"){
        sendXHR_NoParse("/login", "POST", empty_form_data, function (data) {
            $container.html(data);
            loginNavigationInit();
        });
    }
    else if(window.location.pathname == "/register"){
        sendXHR_NoParse("/register", "POST", empty_form_data, function (data) {
            $container.html(data);
            registerNavigationInit();
        });
    }
    else {
        sendXHR_NoParse("/landing", "POST", empty_form_data, function (data) {
            $container.html(data);
            landingNavigationInit();
        });
    }

    $("#logo_landing").click(function () { pushWindow("/", "/landing", landingNavigationInit); });
    $("#button_landing").click(function () { pushWindow("/", "/landing", landingNavigationInit); });
    $("#login").click(function () { pushWindowURL_Match("/login", loginNavigationInit, "- Login"); });
    $("#register").click(function () { pushWindowURL_Match("/register", registerNavigationInit, "- Register"); });

    //back or forward button clicked
    window.onpopstate = function (ev) {
        var state_obj = ev.state;
        if(window.location.pathname == "/login"){
            sendXHR_NoParse("/login", "POST", empty_form_data, function (data) {
                $container.html(data);
                loginNavigationInit();
            });
        }
        else if(window.location.pathname == "/register"){
            sendXHR_NoParse("/register", "POST", empty_form_data, function (data) {
                $container.html(data);
                registerNavigationInit();
            });
        }
        else {
            sendXHR_NoParse("/landing", "POST", empty_form_data, function (data) {
                $container.html(data);
                landingNavigationInit();
            });
        }
    }
}