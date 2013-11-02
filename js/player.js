define(["head-on", "constants"], function($h, constants){
	
	var health = 100,
		maxHealth = 100;
	return{
		position: $h.Vector(0,0),
		v: $h.Vector(0,0),
		angle:0,
		width:50,
		height:50,
		ax: $h.Vector(200,0),
		ay: $h.Vector(0, 400),
		getHealth: getHealth,
		setHealth: setHealth,
		getMaxHealth: getMaxHealth,
		setMaxHealth: setMaxHealth,
		update: updatePlayer,
		type:"player",
		hit: bulletCollision,
		render: renderPlayer,
	}
	function getHealth(){
		return health
	}
	function setHealth(h){
		health = h;
	}
	function getMaxHealth(){
		return maxHealth;
	}
	function setMaxHealth(h){
		health = h * (health/maxHealth);
		maxHealth = h;

	}
	function updatePlayer(delta){
		this.v = this.v.add(constants.gravity.mul(delta));
		if($h.keys.up){
			this.v = this.v.sub(this.ay.mul(delta));
		}
		if($h.keys.down){
			if(this.v.y < 0){
				this.v = this.v.add($h.Vector(0,1000).mul(delta));
			}
			this.v = this.v.add(this.ay.mul(delta));
		}
		
		if($h.keys.right){
			this.v = this.v.add(this.ax.mul(delta));
		}
		if($h.keys.left){
			this.v = this.v.sub(this.ax.mul(delta));
		}
		
		if(this.position.y >= $h.map.height - this.height){
			this.v.x *= Math.pow(.2, delta)
		}
		else{
			this.v.x *= Math.pow(.9, delta);
		}
		this.position = this.position.add(this.v.mul(delta));

		if(this.position.y >= $h.map.height - this.height && this.v.y >= 0){
			this.position.y = $h.map.height - this.height;
			this.v.y = 0;
		}
		else if(this.position.y <= 0){
			this.position.y = 0;
			this.v.y = 0;
		}
		if(this.position.x >= $h.map.width - this.width){
			this.v.x = 0;
			this.position.x = $h.map.width - this.width;
		}
		else if(this.position.x <= 0){
			this.v.x = 0;
			this.position.x = 0;
		}
	}
	function bulletCollision(bullet){
		var angle;
		var knockback;
		angle = this.position.sub(bullet.position).normalize();
		if(bullet.type === "normal"){
			knockback = 150;
			health -= 10;
		}
		if(bullet.type === "seeker"){
			knockback = 300;
			health -= 30;
		}
		if(bullet.type === "bigBoy"){
			health -=50;
			knockback = 500;
		}
		this.v = angle.mul(knockback);
	}
	function renderPlayer(canvas){
		var color;
		canvas.drawRect(this.width,this.height, this.position.x, this.position.y, "green", false, this.angle);
	}
	
	
	
});