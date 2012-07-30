exports.TaskList = function() {
	var win2 = Titanium.UI.createWindow({
		layout : 'vertical'			
	});
	win2.setBackgroundImage('images/bg.jpg');
	//List of tasks which ll be added to screen
	//A way to Create a new Task
	Ti.include('helpers/AddtoList.js');
	Ti.include('helpers/createTask.js');
	Ti.include('helpers/processTaskItem.js');
	Ti.include('helpers/taskItemManager.js');
	Ti.include('../controller/dboperations.js');
	Ti.include('../controller/parsers.js');
	Ti.include('CurrentTask.js');

	
	var TaskList = Array();
	//TaskList.push(new Array('1','1','4','6','7'));
	//alert(TaskList.length);
	var createButton = Ti.UI.createButton({
		title : 'Create Task',
		backgroundImage:'../images/button_black.jpg',
		color:'white',
		height:'55',
		width:'105'
	});

	createButton.addEventListener('click', function() {
		CreateTask(PopulateArray);
	});

	win2.add(createButton);

	function PopulateArray(val) {
		//Add Task To Db
		id = AddTask(val[0], val[1], GetTime(val[2], val[3], val[4]));		
		RefreshList();
	}

	//Create a List to populate Each Task Item
	/*var TaskListView = Ti.UI.createScrollView({
		layout : 'vertical',
		backgroundColor:'transparent',
		left:'6%',
		right: '6%',
	});*/
	
	var TaskListView = Ti.UI.createTableView({
		top:'20'
	});
	
	RefreshList();
	//List the Tasks
	function RefreshList() {		
		var rd = []; 
		TaskListView.data = rd;
		/*while( TaskListView.children.length!=0) {
		   var len = TaskListView.children.length;
		    TaskListView.remove( TaskListView.children[len -1 ] );
		}*/
		//alert(section.children.length);
		GetTasksOfDay(ParseTask);
		
		function ParseTask(tasks) {
			while(tasks.isValidRow()) {				
				ParseTaskRow(tasks, DisplayTask);
				tasks.next();
			}
		}

		function DisplayTask(item) {			
			var view = ProcessTaskItem(item);
			view.addEventListener('click', function() {
				TaskItemManager(view,RefreshList);				
			});
			TaskListView.appendRow(view);
		}
	}
//alert(ProcessTaskItem(TaskList[0]));
win2.add(TaskListView);
Ti.App.addEventListener('appRefreshList',RefreshList);
return win2;
};