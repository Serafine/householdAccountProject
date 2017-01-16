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
			startFooTable();
		}
		
 	})
	.done(function(newTable){
		if(newTable.length != 0){
			$("#divTableContent").remove("table");
			$("#divTableContent").append(newTable);
		}
	})
	
};
function startFooTable(){
	var $modal = $('#editor-modal'),
	$editor = $('#editor'),
	$editorTitle = $('#editor-title'),
	ft = FooTable.init('#mainTable', {
		editing: {
			enabled: true,
			addRow: function(){
				$modal.removeData('row');
				$editor[0].reset();
				$editorTitle.text('Add a new row');
				$modal.modal('show');
			},
			editRow: function(row){
				var values = row.val();
				$editor.find('#id').val(values.id);
				$editor.find('#description').val(values.description);
				$editor.find('#amount').val(values.amount);
				$editor.find('#datum').val(values.datum);							
				$editor.find('#user').val(values.user);
				$editor.find('#category').val(values.category);
				$modal.data('row', row);
				$editorTitle.text('Edit row #' + values.id);
				$modal.modal('show');
			},
			deleteRow: function(row){
				if (confirm('Are you sure you want to delete the row?')){
					row.delete();
				}
			}
		}
	}),
	uid = 10;

$editor.on('submit', function(e){
	if (this.checkValidity && !this.checkValidity()) return;
	e.preventDefault();
	var row = $modal.data('row'),
		values = {
			id: $editor.find('#id').val(),
			description: $editor.find('#description').val(),
			amount: $editor.find('#amount').val(),
			datum: $editor.find('#datum').val(),
			user: $editor.find('#user').val(),
			category: $editor.find('#category').val()
		};

	if (row instanceof FooTable.Row){
		row.val(values);
	} else {
		values.id = uid++;
		ft.rows.add(values);
	}
	$modal.modal('hide');
});
}