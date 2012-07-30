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
	
	var topDetails = Ti.UI.createLabel({
		text: tasks[0].day + '-' + tasks[0].month + '-' + tasks[0].year,
		color:'white',
		height:'100',
		bottom:'25',
		backgroundColor : 'black',
		width:'100%'
		});
	
	
	for(var i=0;i<tasks.length;i++){
		var tablerow = Ti.UI.createTableViewRow({
			height:'75',
			layout:'vertical',
			backgroundColor:'#F8F8FF'
		});
		
		var nameLabel = Ti.UI.createLabel({
			text:tasks[i].name,
			color:'black',
			left:'0'
		});
		
		var descLabel = Ti.UI.createLabel({
			text: tasks[i].desc,
			color: 'black',
			left:'0'
		});
		
		var timeTaken = Ti.UI.createLabel({
			text:'TimeTaken: ' +tasks[i].timetaken,
			color:'black',
			left:'0'
		});
		
		var timealloted = Ti.UI.createLabel({
			text: 'Time Alloted: ' + tasks[i].timealloted,
			color:'black',
			left:'0'
		});
		
		tablerow.add(nameLabel);
		tablerow.add(descLabel);
		tablerow.add(timealloted);
		tablerow.add(timeTaken);		
		tableView.appendRow(tablerow);
	}
	popupWin.add(topDetails);
	popupWin.add(tableView);
	popupWin.open({modal:true});	
}
