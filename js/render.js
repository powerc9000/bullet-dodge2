define(["bullets", "hud", "powerups"], function(bullets, hud, powerups){
	return function(canvases){
		var canvas = canvases.canvas;
		var hudCanvas = canvases.hud;
		function render(update, frames){

			canvas.drawImage(this.images("background"), 0,0);
			powerups.render(canvas);
			this.player.render(canvas);
			
			this.ship.render(canvas);
			bullets.render(canvas);
			canvas.drawRect(canvas.width, 10, 0,canvas.height-10, "blue");
			hud.render(hudCanvas);
			if(this.isPaused()){
				canvas.drawText("Game Paused", this.map.width/2, this.map.height/2, "30px", "black", "center", "middle")
				canvas.drawText("(Press p to resume)", this.map.width/2, this.map.height/2+40, "30px", "black", "center", "middle")
			}
		}
		return render;
	}
	
});