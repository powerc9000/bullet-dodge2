define(["head-on", "entity", "cannon"], function($h, entity, cannon){
	var ship = $h.entity({
		update:update,
		render:render,
		cannons: [],
		init: init
	}, entity);

	return ship
	function update(delta){
		var cannon = this.cannons[this.currentCannon];
		this.cannons.forEach(function(c){
			c.update(delta);
			
		});
		if(Date.now() - this.waitForNextFire > 300){
			if(!cannon.loading && !cannon.loaded){
				if($h.randInt(0,100) < 10){
					cannon.load("seeker")
				}
				else{
					cannon.load("normal");
				}
			}
			else if(cannon.loaded){
				cannon.fire();
			}
			this.currentCannon = (this.currentCannon+1) % this.cannons.length;
			this.waitForNextFire = Date.now();
		}
		

	}

	function render(canvas){
		canvas.drawRect(this.width, this.height, this.position.x, this.position.y, "black");
		this.cannons.forEach(function(c){
			c.render(canvas);
		})
	}

	function init(){
		this.currentCannon = 0;
		this.waitForNextFire = Date.now();
		this.position = $h.Vector(600, 0);
		this.width = 200;
		this.height = 200;
		this.angle = 0;
		this.cannons.push(cannon(this, $h.Vector(20,200)));
		this.cannons.push(cannon(this, $h.Vector(60, 200)));
		this.cannons.push(cannon(this, $h.Vector(100, 200)));

	}
});