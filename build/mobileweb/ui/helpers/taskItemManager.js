function TaskItemManager(currview,callback){
	
	Ti.include('../../controller/dboperations.js');
	
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
	
	var id = currview.children[0].text;	
	
	//Delete Task Button
	//Set as Current Task chkbox and Update Button
	//For Delete update server and send back info so tht its deleted from list
	//for set as current task is current task :true
	var toDelete = Ti.UI.createSwitch({
		style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,    
        ret:"Delete Task",
        left:0,
        title:'Delete Task',
        color:'black'
	});
	var isCurrent = Ti.UI.createSwitch({
		style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,    
        ret:'Set as Current Task',
        left:0,
        title:'Set as Current Task',
        color:'black'
	});
	var updateButton = Ti.UI.createButton({
		title:'UpdateChanges'
	});
	
	updateButton.addEventListener('click', function(){
		//alert(toDelete.value);
		//Update the server for Current Task and Task Deletion
		if(toDelete.value==true){
			DeleteTask(id);
		}
		if(isCurrent.value==true){
			SetAsCurrentTask(id);
		}
		popupWin.close();
		Ti.App.fireEvent('appRefreshCurrentTask');
		callback();		
		
	});
	
	popupWin.add(toDelete);
	popupWin.add(isCurrent);
	popupWin.add(updateButton);
	popupWin.open({modal:true});
}
