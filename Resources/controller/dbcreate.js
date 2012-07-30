function CreateDB() {
	var tasksdb = Ti.Database.install('tasks.sqlite', 'tasks');
	var db = Ti.Database.open('tasks');
	var task = db.execute('Create table if not exists task(id integer PRIMARY KEY AUTOINCREMENT,name TEXT,desc TEXT,timealloted TEXT,timetaken TEXT,isCurrent Integer, dateofaddition TEXT)');
}

function DisplayDB() {
	var db = Ti.Database.open('tasks');
	var add_sql = "insert into task(name,desc) VALUES('sriram','desc')";
	db.execute(add_sql);
	var sql = "select * FROM task where id =1";
	var rows = db.execute(sql);
	while(rows.isValidRow()) {
		alert(rows.fieldByName("name"));
		rows.next();
	}
}

//Table Task
//id 
//name
//time alloted
//time taken
//iscurrent
//date of addition 