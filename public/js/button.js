$(document).ready(function(){
	
	var isHiddenClass ="isHidden";

	$("#submit").addClass(isHiddenClass);


	$("#neuanlage").on("click", function(){
		$("#inputDiv").removeClass(isHiddenClass);
		$("#neuanlage").addClass(isHiddenClass);
		$("#submit").removeClass(isHiddenClass);		
	});

		$("#submit").on("click", function(){
		$("#inputDiv").addClass(isHiddenClass);
		$("#neuanlage").removeClass(isHiddenClass);	
		$("#submit").addClass(isHiddenClass);
	});
});
