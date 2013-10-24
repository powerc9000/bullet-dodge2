define(["head-on"], function($h){
	$h.keys = {};
	var keys = {
		87: "up",
		68: "right",
		65: "left"
	}
	window.addEventListener("keydown", function(e){
		$h.keys[keys[e.which]] = true;
	});
	window.addEventListener("keyup", function(e){
		$h.keys[keys[e.which]] = false;
	})
});