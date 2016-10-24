function getPage(url, needsAuthentication){
	var token = window.localStorage.getItem('token');
	var newTable;
	$.ajax({
		type: 'GET',
		url: url,
		headers:{'authorization': token},

		success: function(data){
			newTable = data;
		},
		error: function(xhr){
			alert("Error occured " + xhr.statusText + xhr.responseText);  
		},
		complete: function(){				
			$('#mainTable').footable();
		}
 	})
	.done(function(newTable){
		if(newTable.length != 0){
			$("#divTableContent").remove("table");
			$("#divTableContent").append(newTable);
		}
	})
	
};

//TODO: how to get correct page if authentication worked out