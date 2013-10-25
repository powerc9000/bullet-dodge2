define(["head-on"], function($h){
	return {
		update: normalUpdate,
		init: init,
		type: "normal",
		destroy: destroy,
		render: render,
		width:20,
		height:10
	}

	function normalUpdate(delta){
		if(!this.exploding){
			this.x += this.vx * delta * Math.cos(this.angle);
			this.y += this.vy * delta * Math.sin(this.angle);
			if(this.x <= 0 || this.y <= 0){
				this.x = $h.map.width;
				this.y = 250;
				this.angle = calcAngle(this);
			}
			if(this.y >= $h.map.height - this.height){
				this.explode();
			}
		}
		
	}
	function init(){
		this.x = $h.map.width +100;
		this.y = targetPlayer();
		this.vx = $h.randInt(100, 200);
		this.vy = $h.randInt(100, 200);
		this.angle = calcAngle(this);
		this.image = $h.images("normalBullet")

	}
	function destroy(reason, entity){
		if(reason === "exploded"){
			this.destroyed = true;
		}
		else{
			this.explode();
		}
	}
	function targetPlayer(){
		return $h.randInt($h.player.y -20, $h.player.y+$h.player.height+20);
	}
	function calcAngle(b){
		return Math.atan2($h.player.y - b.y, $h.player.x - b.x)
	}
	function render(canvas){
		if(!this.exploding){
			canvas.drawImageRotated(this.image, this.angle * 180/Math.PI +180, this.x, this.y);
		}
		else{
			canvas.drawCircle(this.x, this.y, this.iteration , "transparent", {color:"red", width:"2px"})
		}
		
	}
})