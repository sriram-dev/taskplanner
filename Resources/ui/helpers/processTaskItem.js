function ProcessTaskItem(taskitem){
	//Taskitem Array 
	// id , name , desc , timealloted , timetaken
	var itemview = Ti.UI.createTableViewRow({
		layout:'vertical',		
		top:'2%',	
        borderWidth: 3,
        backgroundColor:'#F0FFFF', //#FEEED4
        rightImage:'../images/arrow_btn1.png',
       // color:'black'				
	});
	var idlabel = Ti.UI.createLabel({
		text:taskitem[0],
		visible:false,
        color:'black'
	});
	
	var nameView = Ti.UI.createView({
		layout:'horizontal',
		left : '5%'
	});
	
		
	var namelabel = Ti.UI.createLabel({
		text:taskitem[1],
		font:{fontSize:'15',fontWeight:'bold'},
        color:'black'
	});
	itemview.add(idlabel);
	nameView.add(namelabel);
	if(taskitem[2]){
	var desc = taskitem[2].length>100 ? taskitem[2].substring(0,100): taskitem[2]; 
	var descLabel = Ti.UI.createLabel({
		text: desc,
		font:{fontSize:'15'},
		left : '5%',
		color:'black'
	});
	
	var time = taskitem[3];
	var timeLabel = Ti.UI.createLabel({
		text:'Time Alloted:'+ time,
		font:{fontSize:15},
		left:'5%',
		color:'black'
	});
	
	if(taskitem[4]){
		/*var completedIndicatorLabel = Ti.UI.createLabel({
			text:'Completed',
			right: '10%',
			left :'50%',
			font:{fontSize:'10'},
			color:'black'
		});*/
		var completedImage = Ti.UI.createImageView({
			image:'../images/tick_blue.png',			
			left:'40%'
		});
		nameView.add(completedImage);
		//nameView.add(completedIndicatorLabel);		
				
		var timetakenLabel = Ti.UI.createLabel({
			text:'Time Taken :'+ taskitem[4],
			left:'5%',
			font:{fontSize:'15'},
			color:'black'
		});
		itemview.add(timetakenLabel);
	}
	itemview.add(nameView);	
	itemview.add(descLabel);
	itemview.add(timeLabel);
	
	}
	
	return itemview;
}

function FormTaskItem(id,name,desc,time){
	var item = Array();
	item.push(id);
	item.push(name);
	item.push(desc);
	item.push(time);
	return item;	
}
