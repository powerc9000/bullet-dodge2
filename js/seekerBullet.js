define(["head-on"], function($h, ba){

	return {
		update: seekerUpdate,
		init: init,
		destroy: destroy,
		type:"seeker"
	}

	function seekerUpdate(delta){
		if(!this.exploding){
			var angleDelta;
			angleDelta = Math.atan2($h.player.y + $h.player.height/2 - this.y, $h.player.x + $h.player.width/2 - this.x) - this.angle;
			this.angle += angleDelta * .05
			this.x += this.vx * delta * Math.cos(this.angle);
			this.y += this.vy * delta * Math.sin(this.angle);
			if(this.collides($h.player)){
				this.destroy("collide", $h.player);
				$h.player.hit(this);
			}
			if(this.y >= $h.map.height - this.height){
				this.explode();
			}
		}
		
	}
	function init(){
		var that = this;
		this.angle =  Math.atan2($h.player.y + $h.player.height/2 - this.y, $h.player.x + $h.player.width/2 - this.x);
		this.vy = 300;
		this.vx = 300;
		this.x = 600;
		this.y = 250;
		this.image = $h.images("seekerBullet");
		this.width = this.image.width;
		this.height = this.image.height;
		setTimeout(function(){
			that.explode("timeout");
		}, 10*1000);
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