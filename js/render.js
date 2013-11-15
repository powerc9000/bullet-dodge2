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
			
		}
		return render;
	}
	
});