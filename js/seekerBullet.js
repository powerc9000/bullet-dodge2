define(["head-on"], function($h, ba){

	return {
		update: seekerUpdate,
		init: init,
		destroy: destroy,
		type:"seeker"
	}
	function seekerUpdate(delta){
		var angleDelta;
		this.TTL -= delta * 1000;
		if(this.TTL <= 0){
			this.explode();
		}
		if(!this.exploding){
			if(Date.now() - this.created > 500){
				angleDelta = Math.atan2($h.player.midPoint.y - this.position.y, $h.player.midPoint.x - this.position.x) - this.angle;
				this.angle += angleDelta * .05
				this.position.x += this.speed * delta * Math.cos(this.angle);
				this.position.y += this.speed * delta * Math.sin(this.angle);
			}
			else{
				this.position = this.position.add(this.v.mul(delta));
			}
			this.calcMidPoint();
			if(this.collides($h.player)){
				this.destroy("collide", $h.player);
				$h.player.hit(this);
			}
			if($h.collides(this, {angle:0, position: {y:$h.map.height, x:0},width:$h.map.width, height:5})){
				this.explode();
			}
		}
		
	}
	function init(position){
		var that = this;
		this.speed = 400;
		this.position = position || $h.Vector($h.map.width +100, $h.map.height /2);
		this.heading = $h.player.position.sub(this.position).normalize();
		this.v = this.heading.mul(400);
		this.angle =  Math.atan2(this.heading.y, this.heading.x);
		this.image = $h.images("seekerBullet");
		this.width = this.image.width;
		this.height = this.image.height;
		this.TTL = 5 * 1000;
		this.created = Date.now();
	}
	

	function destroy(reason, entity){
		if(reason === "collide" && entity.type === "player"){
			this.explode();
		}
		if(reason === "exploded"){
			this.destroyed = true;
		}
	}
	
	
})