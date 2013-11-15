require(["head-on","update", "render", "keys", "init"],function($h, update, render, keys, init){
	canvases = init(1000, 700);
	window.addEventListener("blur", function(){
		$h.pause();
	})
	$h.update(update);
	$h.render(render(canvases));
	$h.run();

});
