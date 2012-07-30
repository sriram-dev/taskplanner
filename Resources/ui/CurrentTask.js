exports.CurrentTask = function() {
	Ti.include('helpers/countDownTimer.js');
	Ti.include('helpers/countUpTimer.js');
	Ti.include('helpers/processTaskItem.js');
	Ti.include('../controller/dbcreate.js');
	Ti.include('../controller/dboperations.js');
	Ti.include('../controller/parsers.js');	

	var isFirst = true;
	var win = Titanium.UI.createWindow({			
			title:'curTitle',
			top : '5%',
			layout : 'vertical',
			backgroundColor:'black'
		});
		var currentTaskView = Ti.UI.createView({
			layout:'vertical'
		});
		
		/*var showtask = Ti.UI.createButton({
			title:'Show current task'
		});
		showtask.addEventListener('click', function(){
			
		});
		win.add(showtask);*/
		RefreshCurrentTask();
		Ti.App.addEventListener('appRefreshCurrentTask',RefreshCurrentTask);
	
	
	function RefreshCurrentTask(){
		
		GetCurrentTask(ReceiveCurrentTask);
	}		
	
	function ReceiveCurrentTask(currenttask){		
		ParseTaskRow(currenttask,DisplayCurrentTask);
	}	
	
	function DisplayCurrentTask(parsedrow){	
		
		//Clear the window and remove all views from it first 	
		
				
		if(currentTaskView.children) {
			while(currentTaskView.children.length!=0){
				var len = currentTaskView.children.length;
				currentTaskView.remove(currentTaskView.children[len-1]);
			}
		}
				
		
		var taskitem = parsedrow;
		var id = taskitem[0];
		var name = taskitem[1];
		var desc = taskitem[2];
		var time = Array();
		time = String(taskitem[3]).split(":");		
		
		//Task info view
		
		var taskinfoView = Ti.UI.createView({
			layout:'vertical',
			backgroundColor:'#F0FFFF',
			top:'20px',
			color:'black'								
		});
		
		var nameLabel = Ti.UI.createLabel({
			text:name,
			font:{fontSize:'20'},
			color:'black'
		});
		
		var descLabel = Ti.UI.createLabel({
			text:desc,
			font:{fontSize:'15'},
			color:'black'
		});
		var timecontent = 'Time Alloted:'+ time[0] + ':' + time[1] + ':' + time[2];
		var timeLabel = Ti.UI.createLabel({
			text : timecontent,
			color:'black'
		});
		
		taskinfoView.add(nameLabel);
		taskinfoView.add(descLabel);
		taskinfoView.add(timeLabel);
		
		
		// COunt Down View
		var countDownView = Ti.UI.createView({
			layout : 'vertical',
			top:'20px'
		});

		var timerLabel = Ti.UI.createLabel({
			height : '40%',
			backgroundColor :'#00FFFF',
			width : '80%',
			font : {
				fontSize : '60',
				fontFamily : 'Helvetica Neuve Medium',
				fontWeight : 'Bold'
			},
			color:'black'
		});

		var uptimerLabel = Ti.UI.createLabel({
			height : '10%',
			width : '80%',
			backgroundColor : '#F0FFFF',
			font : {
				fontSize : '30'
			},
			color : 'black'

		});

		var timer = new countDownTimer(parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), function() {			
			timerLabel.text = timer.time.h + ':' + timer.time.m + ':' + timer.time.s;
		}, function() {

		});		

		var uptimer = new countUpTimer(function() {
			uptimerLabel.text = uptimer.time.h + ':' + uptimer.time.m + ':' + uptimer.time.s;
		});

		countDownView.add(timerLabel);
		countDownView.add(uptimerLabel);

		//BUTTON VIEW

		var buttonView = Ti.UI.createView({
			layout : 'horizontal',			
			top:'20',
			left:'10%'
		});

		var startStopButton = Ti.UI.createButton({
			title : 'Start',
			backgroundImage:'../images/button_blue.jpg',
			height:'50',
			width:'90',
		});

		var doneButton = Ti.UI.createButton({
			title : 'Done',
			backgroundImage:'../images/button_blue.jpg',
			height:'50',
			width:'90',	
			left:'10%'				
		});
		startStopButton.addEventListener('click', function() {
			if(isFirst) {
				uptimer.start();
				uptimerLabel.text = uptimer.time.h;
				isFirst = false;
			}
			if(timer.hasStarted()) {
				timer.pause();
				startStopButton.title = "Start";
			} else {
				timer.start();
				startStopButton.title = "Pause";
			}
		});

		doneButton.addEventListener('click', function() {
			timer.end();
			uptimer.stop();
			var time = uptimer.time.h + ':' + uptimer.time.m + ':' + uptimer.time.s;
			alert("time taken"+ time + "id:" + id);
			MarkTaskAsComplete(id,time);			
			Ti.App.fireEvent('appRefreshList');
		});

		buttonView.add(startStopButton);
		buttonView.add(doneButton);
		
		currentTaskView.add(taskinfoView);
		currentTaskView.add(countDownView);
		currentTaskView.add(buttonView);	
		win.add(currentTaskView);
			
		
	}	
		return win;	
	};
	

