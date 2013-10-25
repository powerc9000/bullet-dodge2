define(["head-on"], function($h){

	return{
		x:0,
		y:0,
		vy:0,
		vx:0,
		width:50,
		height:50,
		update: updatePlayer
	}
	function updatePlayer(delta){
		this.vy += 30 * delta;
		this.y += this.vy * delta;
		if($h.keys.up){
			this.vy -= 200 * delta;
		}
		if($h.keys.down){
			if(this.vy < 0){
				this.vy += 1000 * delta;
			}
			this.vy += 100 * delta;
		}
		if($h.keys.right){
			this.vx += 100 * delta;
			
		}
		if($h.keys.left){
			this.vx -= 100 * delta
			
		}
		if(this.y >= 500-10){
			this.vx *= Math.pow(.2, delta);
		}
		else{
			this.vx *= Math.pow(.9, delta);
		}
		this.x += this.vx * delta;

		if(this.y >= 500 - 10 && !$h.keys.up){
			this.y = 500 - 10;
			this.vy = 0;
		}
		else if(this.y <= 0){
			this.y = 0;
			this.vy = 0;
		}
		if(this.x >= 500 -10){
			this.vx = 0;
			this.x = 500-10;
		}
		else if(this.x <= 0){
			this.vx = 0;
			this.x = 0;
		}
	}
});