define(["bullets", "hud", "powerups"], function(bullets, hud, powerups){
	var that;
	return update;
	function update(delta){
		that = this;
		delta = delta/1000;
		this.player.update(delta);
		bullets.update(delta);
		powerups.update(delta);
		// if(this.gameState.spawnBullet){
		// 	that = this;
		// 	if(bullets.created() === 0 || bullets.created() % 10){
		// 		bullets.create(1, "normal");
		// 	}

		// 	// else{
		// 	// 	bullets.create(1, "seeker")
		// 	// }
		// 	if(bullets.created() % 10 === 0){
		// 		bullets.create(1, "seeker")
		// 	}
		// 	if(bullets.created() % 5 === 0){
		// 		bullets.create(1, "bigBoy");
		// 	}
		// 	this.gameState.spawnBullet = false;
		// 	setTimeout(function(){
		// 		that.gameState.spawnBullet = true;
		// 	},1000);
		// }
		this.ship.update(delta)
		hud.update();
	}
});