define(["head-on"], function($h){

	return{
		x:0,
		y:0,
		vy:0,
		vx:0,
		angle:0,
		width:50,
		height:50,
		ax: 200,
		ay: 400,
		health:100,
		maxHealth: 100,
		update: updatePlayer,
		type:"player",
		hit: bulletCollision,
		render: renderPlayer,
	}
	function updatePlayer(delta){
		this.vy += 30 * delta;
		this.y += this.vy * delta;
		if($h.keys.up){
			this.vy -= this.ay * delta;
		}
		if($h.keys.down){
			if(this.vy < 0){
				this.vy += 1000 * delta;
			}
			this.vy += this.ay * delta;
		}
		
		if($h.keys.right){
			this.vx += this.ax * delta;
		}
		if($h.keys.left){
			this.vx -= this.ax * delta;
		}
		
		if(this.y >= $h.map.height - this.height){
			this.vx *= Math.pow(.2, delta);
		}
		else{
			this.vx *= Math.pow(.9, delta);
		}
		
		this.x += this.vx * delta;

		if(this.y >= $h.map.height - this.height && this.vy >= 0){
			this.y = $h.map.height - this.height;
			this.vy = 0;
		}
		else if(this.y <= 0){
			this.y = 0;
			this.vy = 0;
		}
		if(this.x >= $h.map.width - this.width){
			this.vx = 0;
			this.x = $h.map.width - this.width;
		}
		else if(this.x <= 0){
			this.vx = 0;
			this.x = 0;
		}
	}
	function bulletCollision(bullet){
		if(bullet.type === "normal"){
			this.health -= 10;
		}
		if(bullet.type === "seeker"){
			this.health -= 30
		}
	}
	function renderPlayer(canvas){
		var color;
		canvas.drawRect(this.width,this.height, this.x, this.y, "black", false, this.angle);
	}
});