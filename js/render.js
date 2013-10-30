define(["init", "bullets", "hud"], function(init, bullets, hud){
	
	var canvas = init.canvas;
	var hudCanvas = init.hud;
	function render(update, frames){

		canvas.canvas.ctx.clearRect(0,0, canvas.width, canvas.height);
		this.player.render(canvas);
		bullets.render(canvas);
		canvas.drawRect(canvas.width, 10, 0,canvas.height-10, "blue");
		hud.render(hudCanvas);
		
	}
	return render;
});