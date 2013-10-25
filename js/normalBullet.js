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
			this.y = 250;
			this.angle = calcAngle(this);
		}
	}
	function init(){
		this.x = 600;
		this.y = targetPlayer();
		this.vx = $h.randInt(100, 200);
		this.vy = $h.randInt(100, 200);
		this.angle = calcAngle(this);

	}
	function destroy(){
		this.destroyed = true;
	}
	function targetPlayer(){
		return $h.randInt($h.player.y -20, $h.player.y+$h.player.height+20);
	}
	function calcAngle(b){
		return Math.atan2($h.player.y - b.y, $h.player.x - b.x)
	}
	function render(canvas){
		canvas.drawRect(this.width, this.height, this.x, this.y, "black", false, this.angle);
		canvas.drawRect(10, 2, this.x -10, this.y+this.height/2 -1, "red", false, this.angle)
	}
})