define(["init", "bullets", "hud"], function(init, bullets, hud){
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
	}
});