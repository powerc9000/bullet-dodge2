define(["head-on", "bullets"], function($h, bullets){
	return{
		update: function(delta){
			this.score += delta;
		},
		init: function(){
			this.score = 0;
			this.playerStats = {
				hits:0
			}
			$h.events.listen("playerHit", function(){
				this.score -= 70;
			}.bind(this));
			$h.events.listen("bulletDestroyed", function(){
				this.score += 20;
			}.bind(this));
			$h.events.listen("powerup", function(){
				this.score += 20;
			}.bind(this))
		},
		render: function(canvas){
			canvas.drawText("Score: "+Math.round(this.score), $h.map.width/2, 20, "20px", "black", "center");
		},
		reset: function(){
			this.score = 0;
		}

	}
});