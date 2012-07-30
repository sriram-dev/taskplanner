function DayView(weekarray){
	Ti.include('helpers/tasklistofday.js');
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

var toplabel = Ti.UI.createLabel({
		height:'85',
		bottom:'10',
		text: 'Week' + (GetWeekId(weekarray[0].day)+1),
		color:'white',
		backgroundColor:'black',
		width:'100%'
	});

var tableView = Ti.UI.createTableView();
var dayarr = GetDayArray(weekarray);
for(var i=0;i<=dayarr.length;i++){
	var tablerow = Ti.UI.createTableViewRow({
			height:'75',
			backgroundColor:'#F8F8FF',
			color:'black'			
		});
		var id = Ti.UI.createLabel({
			text: Number(i),
			visible: 'false'
		});	
		var title = Ti.UI.createLabel({
			text: 'Day'+ Number(i+1),
			color:'black'
		});
	tablerow.add(id);
	tablerow.add(title);
	tablerow.rightImage = '../images/arrow_btn1.png';	
	tableView.appendRow(tablerow);		
}
tableView.addEventListener('click',function(e){		
		var id =Number(e.row.children[0].text);
		ListTasksForDay(dayarr[id]);
		});
popupWin.add(toplabel);
popupWin.add(tableView);
popupWin.open({modal:true});
}


function GetDayArray(weekarr){
	var dayarr = Array();
	for(var i=0;i<7;i++){
		dayarr[i] = Array();
	}
	for(var i=0;i<weekarr.length;i++){
		dayarr[GetDayId(weekarr[Number(i)].day)].push(weekarr[Number(i)]);
	}
	return dayarr;
}

function GetDayId(day){
	var val = day%7;
	if(val==0)
		return 6;
	else 
		return (val-1);	
}

function GetWeekId(day){
	switch(Number(day)){
		case 1,2,3,4,5,6,7 :
			return 0;
		case 8,9,10,11,12,13,14:
			return 1;
		case 15,16,17,18,19,20,21:
			return 2;
		case 22,23,24,25,26,27,28:
			return 3;
		default :
			return 4;	 
	}
	
}


