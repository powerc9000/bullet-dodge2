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
		speed: 200,
		TTL: 3*1000
	}
	function render(canvas){
		var color
		if(!this.exploding){
			color = (Math.sin(this.TTL/Math.pow(this.TTL/400, 2))> 0) ? "blue" : "red"
			canvas.drawRect(this.width,this.height, this.position.x, this.position.y, color, false, this.angle);
		}
		else{
			canvas.drawCircle(this.midPointx, this.midPointy, this.iteration , "transparent", {color:"red", width:"2px"});
		}
		

	}
	function init(){
		this.position = $h.Vector($h.map.width, 250);
		this.heading = $h.player.position.sub(this.position).normalize();
		this.angle = Math.atan2(this.heading.y, this.heading.x);
		this.v = this.heading.mul(this.speed);
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