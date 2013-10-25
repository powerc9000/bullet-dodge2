define(["head-on"], function($h){
	return {
		update: normalUpdate,
		init: init,
		type: "normal",
		destroy: destroy,
		render: render
	}

	function normalUpdate(delta){
		this.x += this.vx * delta * Math.cos(this.angle);
		this.y += this.vy * delta * Math.sin(this.angle);
		if(this.x <= 0 || this.y <= 0 || this.y >= 500){
			this.x = 500;
			this.y = targetPlayer();
			this.angle = calcAngle();
		}
	}
	function init(){
		this.x = 600;
		this.y = targetPlayer();
		this.vx = $h.randInt(90, 110);
		this.vy = $h.randInt(90,110);
		this.angle = calcAngle();

	}
	function destroy(){
		this.destroyed = true;
	}
	function targetPlayer(){
		return $h.randInt($h.player.y -20, $h.player.y+$h.player.height+20);
	}
	function calcAngle(){
		return $h.randFloat(35*Math.PI/36, 37*Math.PI/36);
	}
	function render(canvas){
		canvas.drawRect(10, 10, this.x, this.y, "black", false, this.angle);
	}
})