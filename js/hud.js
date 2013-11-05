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
		canvas.drawRect(($h.player.getHealth()/$h.player.getMaxHealth())*healthbar.width, healthbar.height, healthbar.x,healthbar.y, "green");
		canvas.drawRect(200, 20, 300, 0, "black");
		canvas.drawRect($h.player.shield.getHealth()/ $h.player.shield.getMaxHealth() * 200, 20, 300, 0, "purple");
		
		if($h._ticks % 50 === 0){
			trueFps = Math.floor($h.trueFps)
			
		}
		canvas.drawText(trueFps + " fps", canvas.width-30, 40);
		canvas.drawText("Health: ("+Math.floor($h.player.getHealth())+"/"+$h.player.getMaxHealth()+")", healthbar.width/2 + healthbar.x, healthbar.height/2 + healthbar.y, "15px", "white", "center", "middle")

		
	}
	function update(){

	}
});