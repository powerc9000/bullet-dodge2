define(["head-on", "player"],function($h, player){
	return function(width, height){
		$h.canvas.create("main", width, height);
		$h.canvas.create("hud", width, 200);
		$h.map = {};
		$h.map.width = width;
		$h.map.height = height -10 ;
		$h.canvas("main").append("body");
		$h.canvas("hud").append("body");
		$h.player = $h.entity(player);
		$h.gameState = {};
		$h.gameState.spawnBullet = true;
		return{
			canvas: $h.canvas("main"),
			hud: $h.canvas("hud")
		}
	}
	
	
})