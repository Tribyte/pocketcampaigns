function loginInit(){
    $("#login_btn").click(function () {
        var form_data = new FormData();
        form_data.append('username', $("#login_username").val());
        form_data.append('password', $("#login_password").val());

        sendXHR("/api/login", "POST", form_data, function(data){
            if (data['data'] == "success"){ window.location = "/"; }
            else { alert("//Todo: fix error display.\n\n" + JSON.stringify(data)); }
        });
    });
}