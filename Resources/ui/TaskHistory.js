exports.TaskHistory = function(){	
	Ti.include('../controller/parsers.js');
	Ti.include('../controller/dboperations.js');
	Ti.include('helpers/monthView.js');	
	var win1 = Titanium.UI.createWindow({
		layout:'vertical'
	});
	
	//tasks is array of objects each of them is a task represented in array
	GetTasks();
	
	
	function GetTasks(){	 	
	 	GetAllTasks(ParseTasks,ProcessParsedTasks);
	}
	
	function ProcessParsedTasks(taskarray){	
		var tableView = Ti.UI.createTableView();
		var years = Array();
		for(var j=0;j<taskarray.length;j++){
			if(!CheckIfExists(years,taskarray[j].year)){
				years.push(taskarray[j].year);
			}
		}
		for(var i=0;i<years.length;i++){			
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
			text: years[i],
			color:'black',
			});
			
			var number = Ti.UI.createLabel({
			text:'['+years[i].length+']',
			color :'black',
			left:'150'
			});
			
			tablerow.add(id);
			tablerow.add(title);
			tablerow.add(number);
			tablerow.rightImage = '../images/arrow_btn1.png';						
			tableView.appendRow(tablerow);			
		}
		tableView.addEventListener('click', function(e){
			var tasksoftheyear = GetTasksForYear(Number(e.row.children[1].text),taskarray);
			MonthView(tasksoftheyear);
			//var id =Number(e.row.children[1].text);
			//if(montharr[id].length>0)
			//WeekView(montharr[id]);
			
		});
		
		win1.add(tableView);				
	}	
	
	function GetTasksForYear(year, taskarray){
		var yearArray = Array();
		for(i=0;i<taskarray.length;i++){
			if(taskarray[i].year == year){
				yearArray.push(taskarray[i]);
			}	
		}
		return yearArray;	
	}	
	
	function CheckIfExists(array, item){
		for( i=0;i< array.length;i++){
			if(array[i] == item)
				return true;				
		}
		return false;
	}	
	
	function GetYearArray(taskarray){
		
	}
		
	//Create a Table View with all the Years of Tasks 
	//Create a Table view with Months 	
		
	return win1;
};
//Get the Data from Db
//Process the data and store in a DS 


// Algorithm to Dynamically Arrange the Tasks
/* if no. of tasks are in mroe than 1 Yr ,
 * 	create a table view for years and event listeners which gets years 
 * else
 * 	create a view with 12 months and event listeners which sends d0 w0 m1 y0 with month number
 * 	
 * 
 * 
 * 
 */

// Page which takes 0000 and a number which can display contents appropriate and all data

