define(["head-on", "player", "ship"],function($h, player, ship){
	return function(width, height){
		$h.canvas.create("main", width, height);
		$h.canvas.create("hud", width, 200);
		$h.map = {};
		$h.player = player
		$h.ship = ship;
		$h.ship.init();
		$h.map.width = width;
		$h.map.height = height -10 ;
		$h.canvas("main").append("body");
		$h.canvas("hud").append("body");
		$h.loadImages([
		{
			name:"normalBullet", 
			src:"img/normalBullet.png"
		}, 
		{
			name:"seekerBullet", 
			src:"img/seekerBullet.png"
		},
		{
			name:"dudeLeanRight",
			src:"img/dude_lean_right.png"
		},
		{
			name:"dudeHit",
			src:"img/dude_hit.png"
		}, 
		{
			name:"dudeLeanLeft",
			src:"img/dude_lean_left.png"
		}
		], false, function(){
			player.init();
		});
		$h.gameState = {};
		$h.gameState.spawnBullet = true;
		return{
			canvas: $h.canvas("main"),
			hud: $h.canvas("hud")
		}
	}
	
	
})