function countDownTimer(h,m,s, onTick, onEnd ){
  return {
  	timer:this.timer,
  	total_sec: (h*60*60)+(m*60)+(s),
  	started : false,
	  set: function(h,m,s){
	  	this.totalsec = (h*60*60)+(m*60)+(s);
	  	this.time = {h:h,m:m,s:s}	;  	
	  	return this;
	  },
	  start:function(){
	  	var self = this;
	  	this.started = true;
			this.timer = setInterval( function() {
				if (self.total_sec) {
					self.total_sec--;
					self.time = {h: parseInt(self.total_sec/3600), m : min = parseInt((self.total_sec%3600)/60), s: (self.total_sec%60) };
					onTick();
				}
				else {
					self.stop();
					onEnd();
				}
				}, 1000 );
			return this;
	  },
	  end:function(){
	  	clearInterval(this.timer)
			this.time = {h:0,m:0,s:0};
			this.total_sec = 0;
			onEnd();			
			return this;
	  },
	  hasStarted :  function(){
	  	if(this.started)
	  		return true;
	  		else
	  		return false;
	  },
	  pause: function(){
	  	clearInterval(this.timer);
	  	this.started = false;
	  }
  }
}