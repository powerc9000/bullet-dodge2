define(["head-on", "bullets", "entity"], function($h, bullets, entity){
	return function(ship, local, startingLoad){
		var loadTime = 3000,
			barrell,
			heading,
			position,
			cannon;
		position = ship.position.add(local);
		heading = $h.player.position.sub(position);
		cannon = {
			update:update,
			render:render,
			fire: fire,
			load: load,
			//globalPosition: global,
			width:40,
			height:20,
			loaded: false,
			loading: false,
			ship:ship,
			localPosition:local,
			position: position,
			loadTime:loadTime, 
			sound: new Howl({
				urls: ["audio/cannon.ogg"],
				volume: .3,
				buffer:true,
			})
		}
		if(startingLoad){
			cannon.loaded = true;
			cannon.barrell = startingLoad;
		}
		cannon = $h.entity(cannon, entity);
		return cannon;
	}
	function update(delta){
		var prevAngle = this.angle;
		this.position = this.ship.position.add(this.localPosition);
		this.heading = $h.player.position.sub(this.position);
		this.angle = Math.atan2(this.heading.y, this.heading.x);
		this.calcMidPoint();
	}

	function fire(){
		bullets.create(1, this.barrell, this.position);
		this.loaded = false;
		this.loading = false;
		this.sound.volume = .7;
		this.sound.play();
		this.justFired = true;
		this.smokeImg = 1;
	}

	function load(type){
		var that = this;
		this.barrell = type;
		this.loading = true;
		if(type === "seeker"){
			this.loadTime = 4000
		}else if(type === "bigBoy"){
			this.loadTime = 5000;
		}
		else{
			this.loadTime = 3000 
		}
		setTimeout(function(){
			that.loaded = true;
		}, this.loadTime + $h.randInt(0,500));
	}

	function render(canvas){
		var img;
		if(this.justFired){
			this.justFired = false;
			this.smokeAnimation = true;
			this.animationPos = {};
			this.animationPos.x = this.position.x;
			this.animationPos.y = this.position.y;
			this.smokeInterval = setInterval(function(){
				if(this.smokeImg > 3){
					clearInterval(this.smokeInterval);
					this.smokeAnimation = false;
				}else{
					this.smokeImg += 1
				}
			}.bind(this), 100)
		}
		if(this.smokeAnimation){
			img = $h.images("cannonSmoke"+this.smokeImg)
			canvas.drawImage(img, this.animationPos.x - img.width, this.animationPos.y - this.height);
		}
	}
});

