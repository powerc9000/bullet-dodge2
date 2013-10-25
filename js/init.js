define(["head-on", "player"],function($h, player){
	var width = 1000, height = 700;
	$h.canvas.create("main", width, height);
	$h.map = {};
	$h.map.width = width;
	$h.map.height = height -10 ;
	$h.canvas("main").append("body");
	$h.player = $h.entity(player);
	$h.gameState = {};
	$h.gameState.spawnBullet = true;
	return{
		canvas:$h.canvas("main")
	}
	
})