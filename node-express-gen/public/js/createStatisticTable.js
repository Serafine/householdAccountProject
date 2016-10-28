

exports.createStatisticsTable = function(dataForTable){

	var tableElement ='';

	tableElement += '<table id="mainTable" class="table footable" data-paging="true" data-sorting="true" data-filtering="true">';
	tableElement +='<thead>';
	tableElement +='<tr>';
	tableElement +='<th data-name="description">Beschreibung </th>';
	tableElement +='<th  data-name="amount"> Betrag </th>';
	tableElement +='<th data-name="date" data-breakpoints="xs" data-type="date" data-format-string="MMMM Do YYYY">Datum</th>';
	tableElement +='<th data-name="user" data-breakpoints="xs sm">Benutzer</th>';
	tableElement +='<th data-name="category" data-breakpoints="xs">Kategorie</th>';
	tableElement +='</tr>';
	tableElement +='</thead>';
	tableElement +='<tbody>';
	tableElement += createRows(dataForTable);
	tableElement +='</tbody>' ; 
	tableElement +='</table>';  
	return tableElement;
};

createRows = function(dataForTable){
	var rowData = '';
	for (var i = 0; i<dataForTable.length; i+= 1){
		rowData += createOneRow(dataForTable[i],i);
	}
	return rowData;
};

createOneRow = function(dataForOneRow,index){
	htmlForOneRow = '';
	if (index===0){
			htmlForOneRow += '<tr data-expanded="true">';
	}
	else{
		htmlForOneRow += '<tr>';
	}
	htmlForOneRow += '<td>' + dataForOneRow.description + '</td>';
	htmlForOneRow += '<td>' + dataForOneRow.amount + '</td>';
	htmlForOneRow += getDateInformation(dataForOneRow.date);
	htmlForOneRow += '<td>' + dataForOneRow.user + '</td>';
	htmlForOneRow += '<td>' + dataForOneRow.category + '</td>';
	htmlForOneRow += '</tr>'
	return htmlForOneRow;
};

		//split date information here
getDateInformation = function(dateInformationAsObject){
	dateString = '<td>';	
	date = dateInformationAsObject.getDate();	
	if (date < 10){
		date = '0'+date;
	}
	month = dateInformationAsObject.getMonth();
	year = dateInformationAsObject.getFullYear();
	dateString += date + '.' + month+1 + '.' + year;
	dateString += '</td>';
	return dateString;	
};