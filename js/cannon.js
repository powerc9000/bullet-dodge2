define(["head-on", "bullets"], function($h, bullets){
	return function(ship, local){
		var loadTime = 3000,
			barrell,
			heading,
			global;
		global = ship.position.add(local);
		heading = $h.player.position.sub(global);
		return{
			update:update,
			render:render,
			fire: fire,
			load: load,
			globalPosition: global,
			loaded: false,
			loading: false,
			ship:ship,
			localPosition:local,
			heading: heading,
			loadTime:loadTime
		}
	}
	function update(delta){
		this.globalPosition = this.ship.position.add(this.localPosition);
		this.heading = $h.player.position.sub(this.globalPosition);
	}

	function fire(){
		bullets.create(1, this.barrell, this.globalPosition);
		this.loaded = false;
		this.loading = false;
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
		var angle = Math.atan2(this.heading.y, this.heading.x);
		canvas.drawRect(20, 20, this.globalPosition.x, this.globalPosition.y, "black", false, angle);
	}
})

