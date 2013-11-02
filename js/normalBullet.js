define(["head-on", "constants"], function($h, constants){
	return {
		update: normalUpdate,
		init: init,
		type: "normal",
		destroy: destroy,
		width:20,
		height:10,
		prevX:0,
		prevY:0,
		heading: {},
	}

	function normalUpdate(delta){
		if(!this.exploding){
			//this.v = this.v.add(constants.gravity.mul(delta));
			this.position = this.position.add(this.v.mul(delta));
			this.calcMidPoint();
			if(this.position.x + this.width <= 0 || this.position.y +this.height <= 0){
					this.destroyed = true;
			}
			if($h.collides(this, {angle:0, position: {y:$h.map.height, x:0},width:$h.map.width, height:5})){

				this.explode();
			}
			if(this.collides($h.player)){
				this.destroy("collide", $h.player);
				$h.player.hit(this);
			}
		}
		
	}
	function init(){
		var totalV = $h.randInt(300, 500);
		this.position = $h.Vector($h.map.width +100, $h.map.height /2);
		this.heading = $h.player.position.sub(this.position).normalize();
		this.angle = calcAngle(this);
		this.v = this.heading.mul(totalV);
		this.image = $h.images("normalBullet")

	}
	function destroy(reason, entity){
		if(reason === "collide"){
			
			this.explode();
			
			
		}
		if(reason === "exploded"){
			this.destroyed = true;
		}
	}
	function targetPlayer(){
		return $h.randInt($h.player.y -20, $h.player.y+$h.player.height+20);
	}
	function calcAngle(b){
		return Math.atan2(b.heading.y, b.heading.x);
	}
})