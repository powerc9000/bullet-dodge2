define(["init"], function(){
	return update;
	function update(delta){
		delta = delta/1000;
		this.player.vy += 9.8 * delta;
		this.player.y += this.player.vy * delta;
		if(this.player.y >= 500 - 10){
			this.player.y = 500 - 10;
			this.player.vy = 0;
		}
		if(this.keys.up){
			this.player.vy = -2000 * delta;
		}
		if(this.keys.right){
			this.player.vx += 9.8 * delta;
			if(this.player.vx > 10){
				this.player.vx = 10;
			}
		}
		if(this.keys.left){
			this.player.vx -= 9.8 * delta
			if(this.player.vx < -30){
				this.player.vx = -30;
			}
		}
		this.player.vx *= Math.pow(.2, delta);
		this.player.x += this.player.vx + delta;
	}
});