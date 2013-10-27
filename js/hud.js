define(["head-on"], function($h){

	var trueFps;
	var healthbar = {
		x:0,
		y:0,
		width:200,
		height:20
	}
	return{
		render: render,
		update: update
	}
	
	function render(canvas){
		canvas.canvas.ctx.clearRect(0,0,canvas.width, canvas.height);
		canvas.drawRect(healthbar.width, healthbar.height, healthbar.x,healthbar.y, "red");
		canvas.drawRect(($h.player.health/$h.player.maxHealth)*healthbar.width, healthbar.height, healthbar.x,healthbar.y, "green");
		
		if($h._ticks % 50 === 0){
			trueFps = Math.floor($h.trueFps)
			
		}
		canvas.drawText(trueFps + " fps", canvas.width-30, 40);
		canvas.drawText("Health: ("+$h.player.health+"/"+$h.player.maxHealth+")", healthbar.width/2 + healthbar.x, healthbar.height/2 + healthbar.y, "15px", "white", "center", "middle")

		
	}
	function update(){

	}
});