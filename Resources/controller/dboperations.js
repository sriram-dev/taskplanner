function AddTask(tname, tdesc, time) {
	var db = Ti.Database.open('tasks');
	var date = GetDate();
	alert("Date : "+ date);
	var add_sql = "insert into task(name,desc,dateofaddition,timealloted,isCurrent) values(?,?,?,?,?)";
	db.execute(add_sql,tname,tdesc,date,time,0);
	return db.lastInsertRowId;
}

function DeleteTask(id) {
	var db = Ti.Database.open('tasks');
	var del_sql = "delete from task where id=?";
	db.execute(del_sql,id);
}

function SetAsCurrentTask(id) {
	var db = Ti.Database.open('tasks');
	var setIsCurrentToZero = "update task set isCurrent=0";
	var setCurrentTaskSql = "update task set isCurrent=1 where id=?";
	db.execute(setIsCurrentToZero);
	db.execute(setCurrentTaskSql,id);
}

//Get all the Tasks
function GetTasksOfDay(callback) {
	var db = Ti.Database.open('tasks');
	var date = GetDate();
	var resultset = db.execute("SELECT * FROM task where dateofaddition=?",date);		
	callback(resultset);
}

function GetCurrentTask(callback) {
	var db = Ti.Database.open('tasks');
	var ctask = "select * FROM task where isCurrent=1";
	var taskitem = db.execute(ctask);	
	if(taskitem.isValidRow()){
		callback(taskitem);	
	}
}

function MarkTaskAsComplete(id,timetaken){
	var db = Ti.Database.open('tasks');
	var sql1 ="update task set isCurrent=0 where id=?";
	var sql2 = "update task set timetaken = ? where id = ?";
	var rowsaffected1 = db.execute(sql1,id);
	var rowsaffec2 = db.execute(sql2,timetaken,id);
	if(rowsaffec2){
		Ti.App.fireEvent("appRefreshCurrentTask");
	}	
}

function isComplete(id){
	var db = Ti.Database.open('tasks');
	var sql = "SELECT timetaken FROM task where id=?";
	var ret = db.execute(sql,id);
	if(ret.isValidRow()){
		return true;		
	}
	else{
		return false;
	}
}

function GetAllTasks(callback,resend){
	var db = Ti.Database.open('tasks');
	var res = db.execute("SELECT * FROM task");	
	callback(res,resend);
}

//Helpers 

function GetDate(){
	var currentTime = new Date();
	return currentTime.getDate() + ':'+currentTime.getMonth() +':'+ currentTime.getFullYear();
}

function DropTable(){
	var db = Ti.Database.open('tasks');
	var drop_table = "delete from task";
	var seq = "UPDATE SQLITE_SEQUENCE SET seq =0 WHERE name = 'task'";
	db.execute(drop_table);	
	db.execute(seq);
}


