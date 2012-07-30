function countUpTimer(onTick){
	return {
		uptimer : this.uptimer,
		total_sec : 0,		
		start: function(){
			var self = this;	
			this.time = {h:0,m:0,s:0};		
			this.uptimer = setInterval(function(){
				self.total_sec++;
				var min;				
				min = parseInt((self.total_sec%3600)/60);
				self.time = {h: parseInt(self.total_sec/3600), m : min, s: (self.total_sec%60) };
				onTick();
			},1000);
			return this;
		},
		stop: function(){
			clearInterval(this.uptimer);
			onTick();
		}
	}
}
