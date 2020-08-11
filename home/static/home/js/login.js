$.getScript('/static/frontend/js/xhrRequest.js', function () { });

$(document).ready(function () {
    $("#login_btn").click(function () {
        var form_data = new FormData();
        form_data.append('username', $("#login_username").val());
        form_data.append('password', $("#login_password").val());

        sendXHR("/api/login", "POST", form_data, function(data){
            if (data['data'] == "success"){ location.reload(); }
            else { alert("//Todo: fix error display.\n\n" + JSON.stringify(data)); }
        });
    });
});