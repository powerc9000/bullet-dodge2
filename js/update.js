define(["init", "bullets"], function(init, bullets){
	var that;
	return update;
	function update(delta){
		delta = delta/1000;
		this.player.update(delta);
		bullets.update(delta);
		if(this.gameState.spawnBullet){
			console.log("hi")
			that = this;
			bullets.create(1, "normal");
			this.gameState.spawnBullet = false;
			setTimeout(function(){
				that.gameState.spawnBullet = true;
			}, 10 * 1000);
		}
	}
});