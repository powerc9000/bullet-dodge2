define(["head-on"], function($h){
	return {
		collides: collides,
		calcMidPoint: getMidPoint
	}
	function collides(obj){
		return $h.collides(this, obj);
	}
	function render(canvas){
		canvas.drawImageRotated(this.image, this.position.x, this.position.y, this.angle);
	}
	function getMidPoint() {
		var cosa = Math.cos(this.angle);
		var sina = Math.sin(this.angle);
		var wp = this.width/2;
		var hp = this.height/2;
		this.midPoint = $h.Vector(( this.position.x + wp * cosa - hp * sina ), ( this.position.y + wp * sina + hp * cosa ));
	}
});