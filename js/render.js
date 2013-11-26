define(["hud", "powerups"], function(hud, powerups){
	return function(canvases){
		var canvas = canvases.canvas;
		var hudCanvas = canvases.hud;
		function render(update, frames){
			canvas.drawRect(this.map.width, this.map.height, 0,0, "#66ccff");
			canvas.drawImage(this.images("background"), 0,this.map.height - this.images("background").height);

			powerups.render(canvas);
			this.player.render(canvas);
			
			this.ship.render(canvas);
			this.bullets.render(canvas);
			canvas.drawImage(this.images("rooftop"),0,this.map.height);
			hud.render(hudCanvas);
			this.startGameButton.render(canvas);
			this.score.render(canvas);
			if(this.isPaused()){
				canvas.drawText("Game Paused", this.map.width/2, this.map.height/2, "30px", "black", "center", "middle")
				canvas.drawText("(Press p to resume)", this.map.width/2, this.map.height/2+40, "30px", "black", "center", "middle")
			}
			if(this.game.starting){
				canvas.drawText("Get Ready!!!", this.map.width/2, this.map.height/2, "30px", "black", "center", "middle")
				canvas.drawText(Math.ceil(this.game.startTimeLeft/1000), this.map.width/2, this.map.height/2+40, "30px", "black", "center", "middle")
			}
		}
		return render;
	}
	
});