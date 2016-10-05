function getPage(url, needsAuthentication){
	var token = window.localStorage.getItem('token');
	alert("Token is: " + token);
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend: function(request)
		{
			request.setRequestHeader("Authorization", token);
		},
		success: function(data){

			alert("Log in was successfull");
			var newDoc = document.open("text/html", "replace");
			newDoc.write(data);
			newDoc.close();
		},
		error: function(xhr){
			alert("Error occured " + xhr.statusText + xhr.responseText);  
		},
		complete: function(){
			alert("Process completed");
		}      

	});
};

//TODO: how to get correct page if authentication worked out