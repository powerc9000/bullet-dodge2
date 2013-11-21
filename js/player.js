define(["head-on", "constants", "entity", "shield", "jetpack"], function($h, constants, entity, shield, jetpack){
	
	var health = 100,
		maxHealth = 100,
		player = $h.entity({
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
			setImage: setImage,
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
		this.jetpack.update(delta);
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
		this.jetpack = jetpack(this);
		this.image = $h.images("dudeSitRight");
		this.width = this.image.width;
		this.height = this.image.height;
		this.setHealth(this.getMaxHealth());
		this.jetpack.setMaxFuel(100);
		this.jetpack.setFuel(10);
		this.jetpack.setFuelPerSecond(7);
		this.jetpack.setRefuelPerSecond(40);
		this.shield.setMaxHealth(50);
		this.shield.setHealth(50);
		this.position= $h.Vector(0,0);
		this.v = $h.Vector(0,0);
		this.angle = 0;
		this.ax = $h.Vector(200,0);
		this.ay = $h.Vector(0, 400);
	}

	function removePowerup(p, idx){
		switch(p.type){
			case "knockback":
				this.noKnockback = false;
				this.powerups.splice(idx,1);
		}
	}

	function move(delta){
		if($h.keys.up && this.jetpack.getFuel() > 0){
			this.v = this.v.sub(this.ay.mul(delta));
			this.jetpack.useFuel(delta);
		}
		if($h.keys.down && this.jetpack.getFuel() > 0 && !this.onGround){
			if(this.v.y < 0){
				this.v = this.v.add($h.Vector(0,1000).mul(delta));
			}
			this.v = this.v.add(this.ay.mul(delta));
			this.jetpack.useFuel(delta);
		}
		
		if($h.keys.right){
			if(!this.onGround && this.jetpack.getFuel() > 0){
				this.jetpack.useFuel(delta);
				this.v = this.v.add(this.ax.mul(delta));
			}else if(this.onGround){
				this.v = this.v.add(this.ax.mul(delta));
			}
			
		}

		if($h.keys.left){
			if(!this.onGround && this.jetpack.getFuel() > 0){
				this.jetpack.useFuel(delta);
				this.v = this.v.sub(this.ax.mul(delta));
			}else if(this.onGround){
				this.v = this.v.sub(this.ax.mul(delta));
			}
			
		}
	}

	function setImage(){

		if(this.hitTime){
			if(Date.now() - this.hitTime > 500){
				this.hitTime = false;
			}
		}else if(this.v.x > 0){
			this.image = $h.images("dudeLeanRight");
			this.facing = "right";
		}
		else if(this.v.x < 0){
			this.image = $h.images("dudeLeanLeft");
			this.facing = "left";
		}else if(this.v.x == 0){
			if(this.facing === "left"){
				this.image = $h.images("dudeSitLeft");
			}else{
				this.image = $h.images("dudeSitRight");
			}
		}
		if(this.jetpack.getFuel() <= 0 || this.jetpack.getFuel() <= this.jetpack.getMaxFuel/10 && this.ranOutOfFuel){
			this.ranOutOfFuel = true;
			if(this.facing === "left"){
				this.image = $h.images("outOfFuelLeft");
			}else{
				this.image = $h.images("outOfFuelRight");
			}
		}
		else{
			this.ranOutOfFuel = false;
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
			this.onGround = true;
		}else{
			this.onGround = false;
		} 

		if(this.position.y <= 0){
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
		if(health <= 0.9){
			$h.game.gameOver = true;
			$h.game.started = false;
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