define(["head-on"], function($h){
	$h.keys = {};
	var keys = {
		87: "up",
		68: "right",
		65: "left",
		83: "down"
	}
	window.addEventListener("keydown", function(e){
		$h.keys[keys[e.which]] = true;
	});
	window.addEventListener("keyup", function(e){
		$h.keys[keys[e.which]] = false;
		if(e.which === 80){
			if($h.isPaused()){
				$h.unpause();
			}
			else{
				$h.pause();
			}
		}
	})
});