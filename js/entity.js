define(["head-on"], function($h){
	return {
		collides: collides
	}
	function collides(obj){
		return $h.collides(this, obj);
	}
});