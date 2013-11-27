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
		//Healthbar
		canvas.drawRect(healthbar.width, healthbar.height, healthbar.x,healthbar.y, "red");
		canvas.drawRect(
			$h.player.getHealth()/$h.player.getMaxHealth() * healthbar.width, 
			healthbar.height, 
			healthbar.x,
			healthbar.y, 
			"green");
		canvas.drawText(
			"Health: ("+Math.floor($h.player.getHealth())+"/"+$h.player.getMaxHealth()+")", 
			healthbar.width/2 + healthbar.x, 
			30, 
			"15px", 
			"black", 
			"center", 
			"middle")

		//Sheild
		canvas.drawRect(200, 20, 300, 0, "black");
		canvas.drawRect($h.player.shield.getHealth()/ $h.player.shield.getMaxHealth() * 200, 20, 300, 0, "purple");
		canvas.drawText("Shields", 300 + 100, 30, "15px", "black", "center", "middle");
		if($h._ticks % 50 === 0){
			trueFps = Math.floor($h.trueFps)
		}
		canvas.drawText(trueFps + " fps", canvas.width-30, 40);
		

		//Jetpack
		canvas.drawRect(200,20, 600, 0, "black");
		canvas.drawRect($h.player.jetpack.getFuel()/ $h.player.jetpack.getMaxFuel() * 200, 20, 600, 0, "grey");
		canvas.drawText("Jetpack Fuel", 600 + 100, 30, "15px", "black", "center", "middle");

		//powerups
		canvas.drawText("Active Powerups", 0, 60, "16px");
		var i =0;
		for(k in $h.player.powerups){
			var val;
			if($h.player.powerups.hasOwnProperty(k)){
				val = $h.player.powerups[k];
				if(val.active){
					canvas.drawText(val.description + ": "+Math.ceil(val.effectLength/1000)+" s", 0, 80 + i *20, "14px")
				}
			}
			i++;
		}

	}
	function update(){

	}
});