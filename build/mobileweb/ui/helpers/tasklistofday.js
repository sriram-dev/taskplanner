function ListTasksForDay(tasks){
	var tableView = Ti.UI.createTableView();	
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
	
	for(var i=0;i<tasks.length;i++){
		var tablerow = Ti.UI.createTableViewRow({
			height:'75',
			layout:'vertical',
			backgroundColor:'pink'
		});
		
		var nameLabel = Ti.UI.createLabel({
			text:tasks[i].name,
			color:'black'
		});
		
		var descLabel = Ti.UI.createLabel({
			text: tasks[i].desc,
			color: 'black'
		});
		
		var timeTaken = Ti.UI.createLabel({
			text:tasks[i].timetaken,
			color:'black'
		});
		
		tablerow.add(nameLabel);
		tablerow.add(descLabel);
		tablerow.add(timeTaken);
		tableView.appendRow(tablerow);
	}
	popupWin.add(tableView);
	popupWin.open({modal:true});	
}
