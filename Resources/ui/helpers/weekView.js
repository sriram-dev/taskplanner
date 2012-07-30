function WeekView(montharray) {
	Ti.include('helpers/dayView.js');
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
		text: GetTitle(Number(montharray[0].month)) + '-' + montharray[0].year,
		color:'white',
		backgroundColor:'black',
		width:'100%'
	});


var tableView = Ti.UI.createTableView();
var weekarr = GetWeekArray(montharray);
for(var i=0;i<5;i++){
	var tablerow = Ti.UI.createTableViewRow({
			height:'75',
			backgroundColor:'#F8F8FF',
			color:'black',
			layout:'horizontal'			
		});
		var id = Ti.UI.createLabel({
			text: Number(i),
			visible: 'false'
		});	
		var title = Ti.UI.createLabel({
			text: 'Week'+ (Number(i)+1),
			color:'black',
			top:'10'
		});
		var number = Ti.UI.createLabel({
			text:'['+weekarr[i].length+']',
			color :'black',
			left:'150',
			top:'10'			
		})
	tablerow.add(id);	
	tablerow.add(title);
	tablerow.add(number);
	tablerow.rightImage = '../images/arrow_btn1.png';	
	tableView.appendRow(tablerow);		
}

tableView.addEventListener('click',function(e){
		//alert(e.row.children[0].text);
		var id =Number(e.row.children[0].text);
		if(weekarr[id].length>0)
		DayView(weekarr[id]);
	});
popupWin.add(toplabel);
popupWin.add(tableView);
popupWin.open({modal:true});
}

function GetWeekArray(montharr){
	var weekarray = Array();
	for(var i=0;i<5;i++){
		weekarray[i] = Array();	
	}	
	for(var j=0;j<montharr.length;j++){
		weekarray[GetWeekId(montharr[Number(j)].day)].push(montharr[Number(j)]);
	}
	return weekarray;
		
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

function GetTitle(monthid) {
	switch(monthid) {
		case 0:
			return "Jan";
		case 1:
			return "Feb";
		case 2:
			return "Mar";
		case 3:
			return "Apr";
		case 4:
			return "May";
		case 5:
			return "June";
		case 6:
			return "July";
		case 7:
			return "Aug";
		case 8:
			return "Sep";
		case 9:
			return "Oct";
		case 10:
			return "Nov";
		case 11:
			return "Dec";
	}
}


