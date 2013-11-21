define(["head-on"], function($h){
	return function(canvas){
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
		});
		console.log(canvas)
		canvas.addEventListener("click", function(e){
			var bounds = canvas.getBoundingClientRect();
			$h.events.trigger("click", {x:e.pageX - bounds.left, y: e.pageY - bounds.top})
		});
		canvas.addEventListener("mousemove", function(e){
			var bounds = canvas.getBoundingClientRect();
			$h.events.trigger("mousemove", {x:e.pageX - bounds.left, y: e.pageY - bounds.top})
		})
	}
	
});