define(["head-on"], function($h){

	return {
		update: seekerUpdate,
		init: init,
		render: render,
		destroy: destroy,
		type:"seeker"
	}

	function seekerUpdate(delta){
		var angleDelta = Math.atan2($h.player.y - this.y, $h.player.x - this.x) - this.angle;
		
		this.x += vx* delta * Math.cos(this.angle);
		this.y += vy* delta * Math.sin(this.angle);
	}
	function init(){
		this.angle =  Math.atan2($h.player.y - this.y, $h.player.x - this.x);
		this.vy = 200;
		this.vx = 200;
		this.x = 600;
		this.y = 250;
	}
	function render(canvas){
		canvas.drawRect(this.width, this.height, this.x, this.y, "red", false, this.angle);
	}

	function destroy(){

	}
	
	
})