define(["head-on", "player"],function($h, player){
	$h.canvas.create("main", 1000, 1000);
	$h.canvas("main").append("body");
	$h.player = $h.entity(player);
	$h.gameState = {};
	$h.gameState.spawnBullet = true;
	return{
		canvas:$h.canvas("main")
	}
	
})