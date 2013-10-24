require(["head-on","update", "render", "keys"],function($h, update, render){
	var canvas;
	$h.gameState = {};
	$h.entity()
	$h.player = $h.entity({
		x:0,
		y:0,
		vy:0,
		vx:0,

	});
	$h.update(update);
	$h.render(render);
	$h.run();

});
