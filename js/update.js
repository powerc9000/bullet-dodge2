define(["hud", "powerups"], function(hud, powerups){
	var that;
	return update;
	function update(delta){
		if(this.game.started){
			if(!this.isPaused()){
				that = this;
				delta = delta/1000;
				this.player.update(delta);
				this.bullets.update(delta);
				powerups.update(delta);
				this.ship.update(delta)
				hud.update();
				this.score.update(delta);
			}
		}
		else{
			if(this.game.starting){
				if(this.game.startTimeLeft > 0){
					this.game.startTimeLeft -= delta;
				}else{
					this.game.started = true;
					this.game.starting = false;
				}
			}
		}
		
	}
});