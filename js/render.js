define(["init", "bullets"], function(init, bullets){
	
	var canvas = init.canvas;
	function render(update, frames){
		canvas.drawRect(500,500,0,0,"white", {color:"red", width:"2px"});
		canvas.drawRect(10,10, this.player.x, this.player.y, "black");
		bullets.render(canvas);
	}
	return render;
});