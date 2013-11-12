define(["head-on"], function($h){
	return{
		update:update,
		render:render,
		lastSpawn: 0,
		spawnPowerup: spawnPowerup,
		powerups: [],
		powerup:powerup,
	}

	function update(delta){
		var that = this;
		if($h.gameTime - this.lastSpawn > 10000){
			this.spawnPowerup();
			this.lastSpawn = $h.gameTime;
		}
		this.powerups.forEach(function(p,i){
			if(p.destroy){
				that.powerups.splice(i,1);
				return;
			}
			p.TTL -= delta * 1000;
			if(p.TTL <=0){
				p.destroy = true;
				return;
			}

			if($h.collides(p, $h.player)){
				$h.player.powerup(p);
				p.destroy = true;
			}
		})
	}

	function render(canvas){
		this.powerups.forEach(function(p){
			canvas.drawRect(p.width, p.height, p.position.x, p.position.y, p.color);
		})
	}

	function spawnPowerup(){
		var rand = $h.randInt(0,100);
		//10% chance
		if(rand ){
			this.powerups.push(this.powerup("knockback"));
		}
	}

	function powerup(type){
		var base = {};
		base.type = type;
		base.width = 20;
		base.height = 20;
		base.angle = 0;
		base.position = $h.Vector($h.randInt(0,$h.map.width), $h.randInt(0,$h.map.height));
		switch(type){
			case "knockback":
				base.TTL = 3000;
				base.color = "blue";
				base.effectLength = 10000;
				break;
		}

		return base;
	}


});