define(["head-on"], function($h){

	var trueFps;
	var healthbar = {
		x:10,
		y:10,
		width:200,
		height:20
	}
	return{
		render: render,
		update: update
	}
	
	function render(canvas){
		canvas.drawRect(canvas.width, canvas.height,0,0, "white");
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
			healthbar.y+30, 
			"15px", 
			"black", 
			"center", 
			"middle")

		//Sheild
		canvas.drawRect(200, 20, 300, 10, "black");
		canvas.drawRect($h.player.shield.getHealth()/ $h.player.shield.getMaxHealth() * 200, 20, 300, 10, "purple");
		canvas.drawText("Shields", 300 + 100, 40, "15px", "black", "center", "middle");
		if($h._ticks % 50 === 0){
			trueFps = Math.floor($h.trueFps)
		}
		canvas.drawText(trueFps + " fps", canvas.width-30, 40);
		

		//Jetpack
		canvas.drawRect(200,20, 600, 10, "black");
		canvas.drawRect($h.player.jetpack.getFuel()/ $h.player.jetpack.getMaxFuel() * 200, 20, 600, 10, "grey");
		canvas.drawText("Jetpack Fuel", 600 + 100, 40, "15px", "black", "center", "middle");

		//powerups
		canvas.drawText("Active Powerups:", 10, 70, "16px");
		var i =0;
		for(k in $h.player.powerups){
			var val;
			if($h.player.powerups.hasOwnProperty(k)){
				val = $h.player.powerups[k];
				if(val.active){
					canvas.drawText(val.description + ": "+Math.ceil(val.effectLength/1000)+" s", 10, 90 + i *20, "14px");
					i++;
				}
			}
			
		}
		if(i === 0){
			canvas.drawText("none", 10, 90 + 0 *20, "14px");
		}
	}
	function update(){

	}
});