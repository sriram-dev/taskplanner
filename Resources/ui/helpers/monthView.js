function MonthView(yeararray) {
	var popupWin = Titanium.UI.createWindow({
		backgroundColor : '#FFFFFF',
		width : '80%',
		top : '10%',
		left : '10%',
		right : '10%',
		opacity : 1,
		zIndex : 2,
		layout : 'vertical'
	});
	Ti.include('helpers/weekView.js');
	
	var toplabel = Ti.UI.createLabel({
		height:'85',
		bottom:'10',
		text:yeararray[0].year,
		color:'white',
		backgroundColor:'black',
		width:'100%'
	});
	
	var tableView = Ti.UI.createTableView();
	var montharr = GetTasksofMonth(yeararray);
	//alert(montharr[6].length);
	for(var i = 0; i < montharr.length; i++) {
		var tablerow = Ti.UI.createTableViewRow({
			height:'75',
			backgroundColor:'#F8F8FF',
			color:'black',
			layout:'horizontal'			
		});
		var id = Ti.UI.createLabel({
			text: i,
			visible: 'false'
		});	
		var title = Ti.UI.createLabel({
			text: GetTitle(Number(i)),
			color:'black'
		});
		var number = Ti.UI.createLabel({
			text:'['+montharr[i].length+']',
			color :'black',
			left:'150'
		});
		tablerow.add(id);
		tablerow.add(title);
		tablerow.add(number);		
		tablerow.rightImage = '../images/arrow_btn1.png';
		tableView.appendRow(tablerow);
	}
	tableView.addEventListener('click',function(e){
		//alert(e.row.children[0].text);
		var id =Number(e.row.children[0].text);
		if(montharr[id].length>0)
		WeekView(montharr[id]);
	});
	popupWin.add(toplabel);
	popupWin.add(tableView);
	popupWin.open({modal:true});
}

function GetTasksofMonth(yeararray) {
	var montharr = Array();
	for(var i = 0; i < 12; i++) {
		montharr[i] = Array();
	}
	for(var i = 0; i < yeararray.length; i++) {
		montharr[yeararray[Number(i)].month].push(yeararray[Number(i)]);
	}
	return montharr;
}

function GetTitle(monthid) {
	switch(monthid) {
		case 0:
			return "Jan ";
		case 1:
			return "Feb ";
		case 2:
			return "Mar ";
		case 3:
			return "Apr ";
		case 4:
			return "May ";
		case 5:
			return "June";
		case 6:
			return "July";
		case 7:
			return "Aug ";
		case 8:
			return "Sep ";
		case 9:
			return "Oct ";
		case 10:
			return "Nov ";
		case 11:
			return "Dec ";
	}
}