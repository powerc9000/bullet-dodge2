define(["head-on"], function($h){
	return {
		update: normalUpdate,
		init: init,
		type: "normal",
	}

	function normalUpdate(delta){
		this.x += 200 * delta * Math.cos(this.angle);
		this.y += 200 * delta * Math.sin(this.angle);
		if(this.x <= 0 || this.y <= 0 || this.y >= 500){
			this.x = 500;
			this.y = targetPlayer();
			this.angle = calcAngle();
		}
	}
	function init(){
		this.x = 600;
		this.y = targetPlayer();
		this.angle = calcAngle();
	}
	function targetPlayer(){
		return $h.randInt($h.player.y -20, $h.player.y+$h.player.height+20);
	}
	function calcAngle(){
		return $h.randInt(35*Math.PI/36, 37*Math.PI/36);
	}
})