define(["head-on"], function($h){
	return {
		update: normalUpdate,
		init: init,
		type: "normal",
		destroy: destroy,
		width:20,
		height:10,
		prevX:0,
		prevY:0,
	}

	function normalUpdate(delta){
		
		if(!this.exploding){
			this.vx += 50 * delta;
			this.vy += 50 * delta;
			this.x += this.vx * delta * Math.cos(this.angle);
			this.y += this.vy * delta * Math.sin(this.angle);

			if(this.x + this.width <= 0 || this.y +this.height <= 0){
				this.x = $h.map.width;
				this.y = 250;
				this.vy = $h.randInt(100, 200);
				this.vx = $h.randInt(100, 200);
				this.angle = calcAngle(this);
			}
			if($h.collides(this, {angle:0, y:$h.map.height, x:0, width:$h.map.width, height:5})){
				this.explode();
			}
			if(this.collides($h.player)){
				this.destroy("collide", $h.player);
				$h.player.hit(this);
			}
		}
		
	}
	function init(){
		this.x = $h.map.width +100;
		this.y = targetPlayer()
		this.vx = $h.randInt(100, 200);
		this.vy = $h.randInt(100, 200);
		this.angle = calcAngle(this);
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
		return Math.atan2($h.player.y - b.y, $h.player.x - b.x)
	}
})