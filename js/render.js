define(["bullets", "hud"], function(bullets, hud){
	return function(canvases){
		var canvas = canvases.canvas;
		var hudCanvas = canvases.hud;
		function render(update, frames){

			canvas.drawRect(canvas.width, canvas.height, 0,0, "white");
			this.player.render(canvas);
			bullets.render(canvas);
			canvas.drawRect(canvas.width, 10, 0,canvas.height-10, "blue");
			hud.render(hudCanvas);
			
		}
		return render;
	}
	
});