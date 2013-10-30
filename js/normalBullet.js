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
			this.vy += 9.8 * delta;
			this.x += this.vx * delta;
			this.y += this.vy * delta;

			if(this.x + this.width <= 0 || this.y +this.height <= 0){
				this.angle = calcAngle(this);
				this.x = $h.map.width;
				this.y = 250;
				this.vy = $h.randInt(100, 200) * Math.sin(this.angle);
				this.vx = $h.randInt(100, 200) * Math.cos(this.angle);
				
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
		var totalV = $h.randInt(300, 500);
		this.x = $h.map.width +100;
		this.y = $h.map.height /2;
		this.angle = calcAngle(this);

		this.vx = totalV * Math.cos(this.angle);
		this.vy = totalV * Math.sin(this.angle);
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