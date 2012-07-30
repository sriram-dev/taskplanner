function AppTabGroup() {
	//declare module dependencies
	
	myFramework = {};
	myFramework.Current = {};
	myFramework.List = {};
	myFramework.Hist = {};
	myFramework.Current = require('CurrentTask');
	myFramework.List = require('TaskList');
	myFramework.Hist = require('TaskHistory');
	
		//myFramework.ui = require('ui'); 
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	//include('CurrentTask');
	//include('TaskHistory');
	//include('TaskList');
	var win1 = myFramework.Current.CurrentTask(),
		win2 = myFramework.List.TaskList(),
		win3 = myFramework.Hist.TaskHistory();		
	
	var tab1 = Ti.UI.createTab({
		title: 'CurrentTask',
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title:'Manage',
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: 'History',
		icon: '/images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	return self;
};

module.exports = AppTabGroup;
