define(["head-on", "entity", "cannon"], function($h, entity, cannon){
	var ship = $h.entity({
		update:update,
		render:render,
		cannons: [],
		init: init
	}, entity);

	return ship
	function update(delta){
		this.cannons.forEach(function(c){
			c.update(delta);
			if(!c.loading && !c.loaded){
				if($h.randInt(0,100) < 10){
					c.load("seeker")
				}
				else{
					c.load("normal");
				}
				
			}
			else if(c.loaded){
				c.fire();
			}
		});
	}

	function render(canvas){
		canvas.drawRect(this.width, this.height, this.position.x, this.position.y, "black");
		this.cannons.forEach(function(c){
			c.render(canvas);
		})
	}

	function init(){
		this.position = $h.Vector(500, 250);
		this.width = 200;
		this.height = 200;
		this.angle = 0;
		this.cannons.push(cannon(this, $h.Vector(-20,20)));
		this.cannons.push(cannon(this, $h.Vector(-20, 60)));

	}
});