function CreateTask(echo){
	var taskitem ;
	borderSpace = 10;
	Ti.include('helpers/customTimePicker.js');
	var taskitem = Array();
	var popupWin = Titanium.UI.createWindow({
    backgroundColor: '#FFFFFF', 
    width:'80%',            
    top: '10%',
    left: '10%',
    right:'10%',
    opacity: 1,
    zIndex: 2,
    layout:'vertical'        
	});
	 
	 var nameLabel = Ti.UI.createLabel({
	 	text: 'Name:',
	 	color:'black'
	 })
	 var name = Ti.UI.createTextField({
		width : '50%'
	 });
	
	var descLabel = Ti.UI.createLabel({
		text:'Description',
		color:'black'				
	});
	
	 var desc = Ti.UI.createTextArea({
		width : '100%'	
	 });
	
	var timeLabel = Ti.UI.createLabel({
		text:'Pick a Time for the Task',
		color:'black'
	}) ;
	 var picker = Ti.UI.createPicker({
	 	useSpinner: true,	 		 		 	
	 });
	
	 var hrs = CustomTimePicker(0,48);	
	 picker.add(hrs);	 
	 var mins = CustomTimePicker(0,59);
	 picker.add(mins);
	 var secs = CustomTimePicker(0,59);
	 picker.add(secs);
	
	 var createButton = Ti.UI.createButton({
	 	title:'Create'
	 });
	 createButton.addEventListener('click',function(){
	 	 	
	 	taskitem.push(name.value);
	 	taskitem.push(desc.value);
	 	taskitem.push(parseInt(picker.getSelectedRow(0).title));
	 	taskitem.push(parseInt(picker.getSelectedRow(1).title));
	 	taskitem.push(parseInt(picker.getSelectedRow(2).title));	 	
	 	popupWin.close();
	 	echo(taskitem);
	 	}	
	 );

	 
	 popupWin.add(nameLabel);
	 popupWin.add(name);
	 popupWin.add(descLabel);
	 popupWin.add(desc);
	 popupWin.add(timeLabel);
	 popupWin.add(picker);
	 popupWin.add(createButton);
	 popupWin.open({modal:true});
	
}

function GetTime(hr,min,sec){
	return hr+':'+min+':'+sec;
}


