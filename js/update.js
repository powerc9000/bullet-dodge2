define(["init", "bullets", "hud"], function(init, bullets, hud, sat){
	var that;
	return update;
	function update(delta){
		delta = delta/1000;
		this.player.update(delta);
		bullets.update(delta);
		if(this.gameState.spawnBullet){
			that = this;
			if(bullets.created() === 0 || bullets.created() % 10){
				bullets.create(1, "normal");
			}
			else{
				bullets.create(1, "seeker")
			}
			this.gameState.spawnBullet = false;
			setTimeout(function(){
				that.gameState.spawnBullet = true;
			}, 2 * 1000);
		}
		hud.update();
		//console.log(sat({x:2, y:2, width:20, height:20, angle:Math.PI/4}, {x:50, y:50, width:20, height:20, angle:Math.PI/2}));
	}
});