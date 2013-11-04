define(["head-on"], function($h, ba){

	return {
		update: seekerUpdate,
		init: init,
		destroy: destroy,
		type:"seeker"
	}

	function seekerUpdate(delta){
		if(this.TTL <= 0){
			this.explode();
		}
		if(!this.exploding){
			var angleDelta;
			angleDelta = Math.atan2($h.player.position.y + $h.player.height/2 - this.position.y, $h.player.position.x + $h.player.width/2 - this.position.x) - this.angle;
			this.angle += angleDelta * .05
			this.position.x += this.speed * delta * Math.cos(this.angle);
			this.position.y += this.speed * delta * Math.sin(this.angle);
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
	function init(){
		var that = this;
		this.speed = 400;
		this.position = $h.Vector($h.map.width, $h.map.height /2 );
		this.heading = $h.player.position.sub(this.position).normalize();
		this.v = this.heading.mul(400);
		this.angle =  Math.atan2(this.heading.y, this.heading.x);
		this.image = $h.images("seekerBullet");
		this.width = this.image.width;
		this.height = this.image.height;
		this.TTL = 10 * 1000;
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