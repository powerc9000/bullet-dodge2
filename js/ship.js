define(["head-on", "entity", "cannon"], function($h, entity, cannon){
	var ship = $h.entity({
		update:update,
		render:render,
		cannons: [],
		init: init,
		direction: 1,
		v: $h.Vector(0,40)
	}, entity);

	return ship
	function update(delta){
		var cannon = this.cannons[this.currentCannon];
		var rando = $h.randInt(0,100);
		this.cannons.forEach(function(c){
			c.update(delta);
			
		});
		if(Date.now() - this.waitForNextFire > 300){
			if(!cannon.loading && !cannon.loaded){
				if(rando < 5){
					cannon.load("seeker")
				}else if(rando <= 10 && rando >= 5){
					cannon.load("bigBoy");
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
		this.direction = $h.player.position.sub(this.position).normalize().y;
		if(this.direction > 0){
			this.direction = 1;
		}
		else{
			this.direction = -1;
		}
		
		if(this.position.y >= 0 && (this.position.y + this.height) < $h.map.height ){
			this.position = this.position.add(this.v.mul(this.direction).mul(delta));
		}else if( this.position.y < 0){
			this.position.y = 0;
		}
		

	}

	function render(canvas){
		canvas.drawImage(this.image, this.position.x, this.position.y);
		// this.cannons.forEach(function(c){
		// 	c.render(canvas);
		// })
	}

	function init(){
		this.currentCannon = 0;
		this.waitForNextFire = Date.now();
		this.position = $h.Vector(600, 0);
		this.image = $h.images("ship");
		this.width = this.image.width;
		this.height = this.image.height;
		this.angle = 0;
		
		this.cannons.push(cannon(this, $h.Vector(70, 190)));
		this.cannons.push(cannon(this, $h.Vector(90, 190)));
		this.cannons.push(cannon(this, $h.Vector(110, 190)));
		this.cannons.push(cannon(this, $h.Vector(130, 190)));
		this.cannons.push(cannon(this, $h.Vector(150, 190)));
		this.cannons.push(cannon(this, $h.Vector(170, 190)));

	}
});