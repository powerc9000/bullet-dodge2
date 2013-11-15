define(["bullets", "hud", "powerups"], function(bullets, hud, powerups){
	var that;
	return update;
	function update(delta){
		that = this;
		delta = delta/1000;
		this.player.update(delta);
		bullets.update(delta);
		powerups.update(delta);
		this.ship.update(delta)
		hud.update();
	}
});