function registerInit(){
    $("#register_btn").click(function () {
        var form_data = new FormData();
        form_data.append('username', $("#register_username").val());
        form_data.append('password', $("#register_password").val());
        form_data.append('check_pass', $("#register_check_pass").val());

        sendXHR("/api/register", "POST", form_data, function(data){
            if (data['data'] === "success") { window.location = "/"; }
            else { alert("//Todo: fix error display.\n\n" + JSON.stringify(data)); }
        });
    });
}