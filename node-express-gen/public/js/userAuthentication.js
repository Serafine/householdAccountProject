/**
 * This function performs a user authentication by creating a HTTP request via Ajax
 * @return {[type]} [description]
 */
function userAuthentication(){
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        type: 'GET',
        url: '',
        dataType: 'json',
        //whatever you need
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', make_base_auth(username, password));
        },
        /*
        success: function () {
            console.log("Login worked")
        };
        */
    });

    function make_base_auth(username, password) {
        var tok = username + ':' + password;
        var hash = btoa(tok);
        return 'Basic ' + hash;
    }
}