define(["head-on", "constants"], function($h, c){
	return {
		render: render,
		init: init,
		update: bigBoyUpdate,
		type:"bigBoy",
		destroy: destroy,
		width: 100,
		height: 50,
		explosionIterations:200,
		speed: 150,
		TTL: 5*1000,
		explosionLength: 200
	}

	function render(canvas){
		var color
		if(!this.exploding){
			this.image = (Math.sin(this.TTL/Math.pow(this.TTL/400, 2))> 0) ? $h.images("bigBoy1") : $h.images("bigBoy2")
			this.super.render.call(this, canvas);
		}
		else{
			canvas.drawCircle(this.midPoint.x, this.midPoint.y, this.iteration , "transparent", {color:"red", width:"2px"});
		}
	}

	function init(position){
		this.position = position
		this.heading = $h.player.midPoint.sub(this.position).normalize();
		this.angle = Math.atan2(this.heading.y, this.heading.x);
		this.v = this.heading.mul(this.speed);
		this.image = $h.images("bigBoy1");
		this.width = this.image.width;
		this.height = this.image.height;
		this.sound = new Audio("audio/bullets/big_boy_countdown.ogg");
		this.explodeSound = new Audio("audio/bullets/big_boy_explosion.ogg");
		this.sound.volume = .3;
		this.explodeSound.volume = .2;
		this.sound.play();
	}

	function destroy(reason, obj){
		obj = obj || {};
		if(reason === "timeout"){
			
			this.explode();
		}
		else if(reason === "collide" && obj.type === "player"){
			this.explode();
		}
		if(reason === "exploded"){
			this.destroyed = "true";
		}
	}

	function bigBoyUpdate(delta){
		var that = this;
		this.TTL -= delta * 1000;
		if(this.TTL <= 0){
			this.destroy("timeout");
		}
		if(!this.exploding){
			this.position = this.position.add(this.v.mul(delta));
			this.calcMidPoint();
			if(this.collides($h.player)){
				this.playerHit = true;
				$h.player.hit(this);
				this.destroy("collide", $h.player);
			}
		}
		else{
			if(!this.playerHit){
				$h.getPoints($h.player).some(function(p){
					if(inCircle(that.midPoint.x, that.midPoint.y, that.iteration, p[0], p[1])){
						$h.player.hit(that);
						that.playerHit = true;
						return true;
					}
				});
			}
		}
	}

	function inCircle(cX, cY, radius, x,y){
		return Math.pow((cX -x),2) + Math.pow((cY - y),2) < Math.pow(radius, 2);
	}

})