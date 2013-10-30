define(["head-on"], function($h){
	return {
		render: render,
		init: init,
		update: bigBoyUpdate,
		type:"bigBoy",
		destroy: destroy,
		width: 100,
		height: 50,
		explosionIterations:200,
		TTL: 3*1000
	}
	function render(canvas){
		if(!this.exploding){
		var color = (Math.sin(this.TTL/Math.pow(this.TTL/400, 2))> 0) ? "blue" : "red"

			canvas.drawRect(this.width,this.height, this.x, this.y, color, false, this.angle);
		}
		else{
			canvas.drawCircle(this.midPointx, this.midPointy, this.iteration , "transparent", {color:"red", width:"2px"});
		}
		

	}
	function init(){
		var that = this
		this.x = $h.map.width;
		this.y = 250;
		this.vx = 200;
		this.vy = 200;
		this.angle = Math.atan2($h.player.y + $h.player.height/2 - this.y, $h.player.x + $h.player.width/2 - this.x);
		setTimeout(function(){
			if(!that.exploding){
				that.destroy("timeout");
			}
		}, this.TTL)
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
		if(!this.exploding){
			this.x += this.vx * Math.cos(this.angle) * delta;
			this.y += this.vy * Math.sin(this.angle) * delta;
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
					if(inCircle(that.midPointx, that.midPointy, that.iteration, p[0], p[1])){
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