define(["head-on", "bullets", "entity"], function($h, bullets, entity){
	return function(ship, local){
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
			loadTime:loadTime
		}
		return $h.entity(cannon, entity);
	}
	function update(delta){
		var prevAngle = this.angle;
		this.position = this.ship.position.add(this.localPosition);
		this.heading = $h.player.position.sub(this.position);
		this.angle = Math.atan2(this.heading.y, this.heading.x);
		if(this.angle > 10*Math.PI/14 || this.angle < Math.PI/6){
			this.angle = prevAngle;
			this.canFire = false;
		}
		else{
			this.canFire = true;
		}
		this.calcMidPoint();
	}

	function fire(){
		if(this.canFire){
			bullets.create(1, this.barrell, this.midPoint);
			this.loaded = false;
			this.loading = false;
		}
		
	}

	function load(type){
		var that = this;
		this.barrell = type;
		this.loading = true;
		if(type === "seeker"){
			this.loadTime = 4000
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

