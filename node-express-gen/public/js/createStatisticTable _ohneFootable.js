

exports.createStatisticsTable = function(dataForTable){

	var tableElement ='';

	//tableElement += '<table id="editing-example" class="table footable footable-1 footable-editing footable-editing-right footable-editing-no-view footable-filtering footable-filtering-right footable-paging footable-paging-center breakpoint breakpoint-md" data-sorting="true" data-filtering="true" data-paging="true" style="display: table;">';
	tableElement +='<div class="table-responsive">'
	tableElement += '<table class="table table-striped table-bordered table-hover">';
	tableElement +='<thead class="thead-default">';
	tableElement +='<tr>';
	tableElement +='<th>Beschreibung</th>';
	tableElement +='<th>Betrag</th>';
	tableElement +='<th data-breakpoints="xs" data-type="date" data-format-string="MMMM Do YYYY">Datum</th>';
	tableElement +='<th data-breakpoints="xs sm">Benutzer</th>';
	tableElement +='<th data-breakpoints="xs">Kategorie</th>';
	tableElement +='</tr>';
	tableElement +='</thead>';
	tableElement +='<tbody>';
	tableElement += createRows(dataForTable);
	tableElement +='</tbody>' ; 
	tableElement +='</table>';  
	tableElement +='</div>';
	//tableElement += getModalForEditing();      
	return tableElement;
};

createRows = function(dataForTable){
	var rowData = '';
	for (var i = 0; i<dataForTable.length; i+= 1){
		rowData += createOneRow(dataForTable[i]);
	}
	return rowData;
};

createOneRow = function(dataForOneRow){
	htmlForOneRow = '';
	htmlForOneRow += '<tr data-expanded="true">';
	htmlForOneRow += '<td style="display: table-cell;">' + dataForOneRow.description + '</td>';
	htmlForOneRow += '<td style="display: table-cell;">' + dataForOneRow.amount + '</td>';
	htmlForOneRow += '<td style="display: table-cell;">' + dataForOneRow.date + '</td>';
	htmlForOneRow += '<td style="display: table-cell;">' + dataForOneRow.user + '</td>';
	htmlForOneRow += '<td style="display: table-cell;">' + dataForOneRow.category + '</td>';
	htmlForOneRow += '</tr>'
	return htmlForOneRow;
}

getModalForEditing = function(){

	modal = '<div class="modal fade" id="editor-modal" tabindex="-1" role="dialog" aria-labelledby="editor-title">'
	modal +=						'<style scoped>'
       modal +=             '.form-group.required .control-label:after {'
modal +=                        'content:"*";'
 modal +=                       'color:red;'
 modal +=                       'margin-left: 4px;'
modal +=                    '}'
modal +=                '</style>'
modal +=                    '<form class="modal-content form-horizontal" id="editor">'
modal +=                        '<div class="modal-header">'
modal +=                                '<span aria-hidden="true">×</span>'
modal +=                            '</button>'
modal +=                            '<h4 class="modal-title" id="editor-title">Add Row</h4>'
modal +=                        '</div>'
modal +=                        '<div class="modal-body">'
modal +=                            '<input type="number" id="id" name="id" class="hidden"/>'
modal +=                            '<div class="form-group required">'
modal +=                                '<label for="firstName" class="col-sm-3 control-label">First Name</label>'
modal +=                                '<div class="col-sm-9">'
modal +=                                    '<input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" required>'
modal +=                                '</div>'
 modal +=                           '</div>'
  modal +=                          '<div class="form-group required">'
 modal +=                               '<label for="lastName" class="col-sm-3 control-label">Last Name</label>'
modal +=                                '<div class="col-sm-9">'
 modal +=                                   '<input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name" required>'
 modal +=                               '</div>'
 modal +=                           '</div>'
   modal +=                         '<div class="form-group">'
  modal +=                              '<label for="jobTitle" class="col-sm-3 control-label">Job Title</label>'
 modal +=                               '<div class="col-sm-9">'
  modal +=                                 ' <input type="text" class="form-control" id="jobTitle" name="jobTitle" placeholder="Job Title">'
 modal +=                               '</div>'
modal +=                            '</div>'
  modal +=                          '<div class="form-group required">'
  modal +=                              '<label for="startedOn" class="col-sm-3 control-label">Started On</label>'
 modal +=                               '<div class="col-sm-9">'
 modal +=                                   '<input type="date" class="form-control" id="startedOn" name="startedOn" placeholder="Started On" required>'
 modal +=                               '</div>'
 modal +=                           '</div>'
 modal +=                           '<div class="form-group">'
  modal +=                              '<label for="dob" class="col-sm-3 control-label">Date of Birth</label>'
modal +=                                '<div class="col-sm-9">'
 modal +=                                   '<input type="date" class="form-control" id="dob" name="dob" placeholder="Date of Birth">'
 modal +=                               '</div>'
 modal +=                           '</div>'
 modal +=                       '</div>'
  modal +=                      '<div class="modal-footer">'
 modal +=                           '<button type="submit" class="btn btn-primary">Save changes</button>'
  modal +=                          '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>'
 modal +=                       '</div>'
  modal +=                  '</form>'
modal +=                '</div>'
modal +=            '</div>'
           return modal;
}