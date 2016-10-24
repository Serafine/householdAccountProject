/**
 * This function performs a user authentication by creating a HTTP request via Ajax
 * @return {[type]} [description]
 */
 function userAuthentication(){
    var username = $("#username").val();
    var password = $("#password").val();
    var data = { "username" : username, "password" : password};
    $.ajax({
        type: 'POST',
        url: '/users/login',
        data: data,
        success: function(data){
            
            // if login was successfull server sends a JWT token
            if(data.token){
                // save token as user login 
                alert("Log in was successfull");
                window.localStorage.setItem('token', data.token);
            }
            else{
                alert(data.msg);
            }

        },       
        error: function(xhr){
            alert("Error occured " + xhr.statusText + xhr.responseText);  
        }
            
    });
}

function addNewUser(){
    var username = $("#username").val();
    var password = $("#password").val();
    var reqData = { "username" : username, "password" : password };

    $.ajax({
        type: 'POST',
        url: '/users/register',
        /*beforeSend: function (xhr) {
            xhr.setRequestHeader('name', username);
            xhr.setRequestHeader('password', password);
        }*/
        data: reqData,
        success: function(resData){
            alert(resData.msg);

        },       
        error: function(xhr){
            alert("Error occured " + xhr.statusText + xhr.responseText);  
        }
    });
}