define(["head-on", "constants", "entity", "shield"], function($h, constants, entity, shield){
	
	var health = 100,
		maxHealth = 100,
		player = $h.entity({
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
			move: move,
			keepInBounds: keepInBounds,
			gravity: gravity,
			shield: shield,
			powerup: powerup,
			powerups: [],
			removePowerup: removePowerup,
			init: init,
			setImage: setImage
		}, entity);
	return player;


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
		var correction;
		var that = this;
		
		this.keepInBounds(delta);
		
		this.move(delta);
		
		this.gravity(delta);
		this.position = this.position.add(this.v.mul(delta));
		this.setImage();
		this.calcMidPoint();
		this.shield.update(delta);
		this.powerups.forEach(function(p, i){
			p.effectLength -= delta * 1000;
			if(p.effectLength <= 0){
				that.removePowerup(p, i);
			}
		})
	}
	function init(){
		this.image = $h.images("dudeLeanRight");
		this.width = this.image.width;
		this.height = this.image.height;
	}
	function removePowerup(p, idx){
		switch(p.type){
			case "knockback":
				this.noKnockback = false;
				this.powerups.splice(idx,1);
		}
	}

	function move(delta){
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
	}

	function setImage(){
		if(this.hitTime){
			if(Date.now() - this.hitTime > 500){
				this.hitTime = false;
			}
		}else if(this.v.x > 0){
			this.image = $h.images("dudeLeanRight");
		}
		else if(this.v.x < 0){
			this.image = $h.images("dudeLeanLeft");
		}
		this.width = this.image.width;
		this.height = this.image.height;
	}
	function gravity(delta){
		this.v = this.v.add(constants.gravity.mul(delta));
	}


	function keepInBounds(delta){
		if(this.position.y >= $h.map.height - this.height){
			this.v.x *= Math.pow(.2, delta)
		}else{
			this.v.x *= Math.pow(.9, delta);
		}

		if(this.position.y >= $h.map.height - this.height && this.v.y >= 0){
			this.position.y = $h.map.height - this.height;
			this.v.y = 0;
		}else if(this.position.y <= 0){
			this.position.y = 0;
			this.v.y = 0;
		}

		if(this.position.x >= $h.map.width - this.width){
			this.v.x = 0;
			this.position.x = $h.map.width - this.width;
		}else if(this.position.x <= 0){
			this.v.x = 0;
			this.position.x = 0;
		}

		if(correction = this.collides($h.ship)){
			if(correction.normal.x){
				this.v.x = 0;
			}
			if(correction.normal.y){
				this.v.y = 0;
			}
			this.position = this.position.sub($h.Vector(correction.normal.x, correction.normal.y).mul(correction.overlap));
		}
	}
	function bulletCollision(bullet){
		var angle;
		var knockback;
		angle = this.position.sub(bullet.position).normalize();
		if(bullet.type === "normal"){
			knockback = 150;
			health -= this.shield.damage(10);
		}
		if(bullet.type === "seeker"){
			knockback = 300;
			health -= this.shield.damage(30);
		}
		if(bullet.type === "bigBoy"){
			health -= this.shield.damage(50);
			knockback = 500;
		}
		if(!this.noKnockback){
			this.v = angle.mul(knockback);
			this.image = $h.images("dudeHit");
			this.hitTime = Date.now();
		}
		
	}
	function powerup(p){
		if(p.type === "knockback"){
			this.noKnockback = true;
			this.powerups.push(p);
		}
	}
	function renderPlayer(canvas){
		var color;
		canvas.drawImage(this.image, this.position.x, this.position.y);
	}
});