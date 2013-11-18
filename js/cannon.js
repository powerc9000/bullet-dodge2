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
			sound: new Audio("audio/cannon.ogg")
		}
		if(startingLoad){
			cannon.loaded = true;
			cannon.barrell = startingLoad;
		}
		return $h.entity(cannon, entity);
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
		canvas.drawRect(this.width, this.height, this.position.x, this.position.y, "black", false, this.angle);
	}
});

