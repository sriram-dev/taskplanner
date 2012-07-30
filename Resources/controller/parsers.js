function ParseTaskRow(task, callback) {
	var taskitem = Array();
	if(parseInt(task.fieldCount) > 2) {
		taskitem.push(task.field(0, 0));
		taskitem.push(task.field(1, 0));
		taskitem.push(task.field(2, 0));
		taskitem.push(task.fieldByName('timealloted'));
		taskitem.push(task.fieldByName('timetaken'));
		taskitem.push(task.fieldByName('dateofaddition'));
	}
	if(callback)
		callback(taskitem);
}


function ParseTasks(taskssql,callback){
	
	var tasks = new Array();	
	while(taskssql.isValidRow()){
		var date = taskssql.fieldByName("dateofaddition");
		var datearray = String(date).split(":");
		var taskitem = new Object();
		taskitem.id= taskssql.fieldByName("id");
		taskitem.name = taskssql.fieldByName("name");
		taskitem.desc = taskssql.fieldByName("desc");
		taskitem.timealloted = taskssql.fieldByName("timealloted");
		taskitem.timetaken = taskssql.fieldByName("timetaken");
		taskitem.year = datearray[2];		
		taskitem.month = datearray[1];
		taskitem.day = datearray[0];		
		tasks.push(taskitem);
		taskssql.next();
	}
	if(tasks){
		callback(tasks);
	}
}
