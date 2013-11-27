define(["head-on"], function($h){
	var sound = new Audio("audio/powerup.ogg");
	sound.volume = .5;
	return{
		update:update,
		render:render,
		lastSpawn: 0,
		spawnPowerup: spawnPowerup,
		powerups: [],
		powerup:powerup,
		announcePowerup: announcePowerup,
		sound: sound
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
				that.announcePowerup(p);
				p.destroy = true;
				$h.events.trigger("powerup");
				sound.currentTime = 0;
				sound.play();
			}
		})
	}

	function announcePowerup(p){
		var baseFontSize = 12,
			iterations = 70,
			i = 0;
			clearInterval(this.announcementInterval);
			this.announcement = {};
			this.announcement.text = p.description;
			this.announcement.fontSize = baseFontSize +"px";

			this.announcementInterval = setInterval(function(){
				if(iterations === i+1){
					clearInterval(this.announcementInterval);
					this.announcement = false;
					return;
				}else{
					this.announcement.fontSize = (baseFontSize+i) + "px";
					console.log((iterations / (iterations - i)))
					this.announcement.color = "rgba(0,0,0,"+((iterations - i) / iterations)+")";
				}
				i += 1;
			}.bind(this), 15)
	}

	function render(canvas){
		this.powerups.forEach(function(p){
			if(p.image){
				canvas.drawImage(p.image, p.position.x, p.position.y);
			}else{
				canvas.drawRect(p.width, p.height, p.position.x, p.position.y, p.color);
			}
			
		});
			if(this.announcement){
				console.log("it is")
				//textString, x, y, fontStyle, color, alignment, baseline
				canvas.drawText(this.announcement.text, $h.map.width/2, 100, this.announcement.fontSize, this.announcement.color, "center");
			}
	}

	function spawnPowerup(){
		var rand = $h.randInt(0,100);
		//10% chance
		if(rand <= 50){
			this.powerups.push(this.powerup("knockback"));
		}else {
			this.powerups.push(this.powerup("health"));
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
				base.TTL = 12000;
				base.color = "blue";
				base.effectLength = 10000;
				base.description = "No knockback";
				base.image = $h.images("knockback");
				break;
			case "health":
				base.TTL = 120000;
				base.color = "green";
				base.description = "50 Health!";
				base.image = $h.images("healthPack");
				break;
		}

		return base;
	}


});