define(["head-on", "constants", "entity", "shield", "jetpack"], function($h, constants, entity, shield, jetpack){
	
	var health = 1,
		maxHealth = 100,
		player = $h.entity({
			hitCount:0,
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
			powerups: {
				knockback:{},
				infiniteFuel:{}
			},
			removePowerup: removePowerup,
			init: init,
			setImage: setImage,
			speedLimit: speedLimit,
			updatePowerups: updatePowerups,
			keys: keys,
			turbo: turbo
		}, entity);
	return player;


	function getHealth(){
		return health
	}

	function setHealth(h){
		if(h > maxHealth){
			health = maxHealth;
		}
		else{
			health = h;
		}
		if(health < 0){
			health = 0;
		}
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
		if(this.jetpack.getFuel() <= 0){
			this.turbo(true);
		}
		this.gravity(delta);
		this.position = this.position.add(this.v.mul(delta));
		this.setImage();
		this.calcMidPoint();
		this.shield.update(delta);
		this.updatePowerups(delta);


	}
	function updatePowerups(delta){
		var pUp;
		for(key in this.powerups){
			if(this.powerups.hasOwnProperty(key)){
				pUp = this.powerups[key];
				if(pUp.active){
					pUp.effectLength -= delta * 1000;
					if(pUp.effectLength <= 0){
						this.removePowerup(pUp);
					}
				}
			}
		}
		
	}
	function init(){
		this.jetpack = jetpack(this);
		this.image = $h.images("dudeSitRight");
		this.width = this.image.width;
		this.height = this.image.height;
		this.setHealth(this.getMaxHealth());
		this.jetpack.setMaxFuel(700);
		this.jetpack.setFuel(700);
		this.jetpack.setFuelPerSecond(7);
		this.jetpack.setRefuelPerSecond(150);
		this.shield.setMaxHealth(50);
		this.shield.setHealth(1);
		this.position= $h.Vector(30,$h.map.height - this.height);
		this.v = $h.Vector(0,0);
		this.angle = 0;
		this.ax = $h.Vector(400,0);
		this.ay = $h.Vector(0, 400);
		this.maxV = 700;
		this.shieldHitSound = new Audio("audio/shield_hit.ogg");
		this.shieldHitSound.volume = .3;
		this.gruntSound = new Audio("audio/grunt.ogg");
		this.gruntSound.volume = .5;
		$h.events.listen("keypress", function(key){
			this.keys(key);
		}.bind(this))
	}

	function keys(key){
		if(key === 82){
			this.turbo();
		}
	}
	function turbo(off){
		if(this.turboActive || off){
			this.turboActive = false;
			!this.powerups.infiniteFuel.active && this.jetpack.setFuelPerSecond(7);
			this.ax = $h.Vector(400,0);
			this.ay = $h.Vector(0, 400);
		}else{
			this.turboActive = true;
			!this.powerups.infiniteFuel.active && this.jetpack.setFuelPerSecond(50);
			this.ay = $h.Vector(0,1000);
			this.ax = $h.Vector(1000, 0);
		}
	}
	function removePowerup(p, idx){
		p.active = false;
		if(p.type === "infiniteFuel"){
			if(this.turboActive){
				this.jetpack.setFuelPerSecond(50);
			}else{
				this.jetpack.setFuelPerSecond(7);
			}
		}
	}
	function speedLimit(){
		if(this.v.length() > this.maxV){
			this.v = this.v.normalize().mul(this.maxV);
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
		this.speedLimit();
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
		var prevHealth = health;
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
		if(health <0){
			health = 0;
		}
		if(!this.powerups.knockback.active){
			this.v = angle.mul(knockback);
			this.image = $h.images("dudeHit");
			this.hitTime = Date.now();
		}
		if(health <= 0.9){
			$h.startGameButton.activate(true);
			$h.game.gameOver = true;
			$h.game.started = false;
		}
		if(health === prevHealth){
			this.shieldHitSound.currentTime = 0;
			this.shieldHitSound.play();
		}else{
			this.gruntSound.currentTime = 0;
			this.gruntSound.play();
		}
		
		this.hitCount += 1;
		$h.events.trigger("playerHit");
	}

	function powerup(p){
		switch(p.type){
			case "knockback":
				this.powerups.knockback = p;
				this.powerups.knockback.active = true;
				break;
			case "health":
				this.setHealth(this.getHealth()+50);
				break;
			case "infiniteFuel":
				this.jetpack.setFuelPerSecond(0);
				this.jetpack.setFuel(this.jetpack.getFuel()+10);
				p.active = true;
				this.powerups.infiniteFuel = p;
				break;

		}
	}
	
	function renderPlayer(canvas){
		var color;
		canvas.drawImage(this.image, this.position.x, this.position.y);
		if(this.turboActive){
			canvas.drawText("TURBO!", 10,30, "20px", "red");
		}
	}
});