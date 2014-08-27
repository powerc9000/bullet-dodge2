define(["head-on"], function($h){

	var trueFps;
	var healthbar = {
		x:200,
		y:10,
		width:200,
		height:20
	}
	return{
		render: render,
		update: update
	}
	
	function render(canvas){
		canvas.clear();
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
		canvas.drawRect(200, 20, healthbar.x+300, 10, "black");
		canvas.drawRect($h.player.shield.getHealth()/ $h.player.shield.getMaxHealth() * 200, 20, healthbar.x+300, 10, "purple");
		canvas.drawText("Shields", healthbar.x+300 + 100, 40, "15px", "black", "center", "middle");
		if($h._ticks % 50 === 0){
			trueFps = Math.floor($h.trueFps)
		}
		canvas.drawText(trueFps + " fps", canvas.width-30, 40);
		

		//Jetpack
		canvas.drawRect(200,20, healthbar.x+600, 10, "black");
		canvas.drawRect($h.player.jetpack.getFuel()/ $h.player.jetpack.getMaxFuel() * 200, 20, healthbar.x+600, 10, "grey");
		canvas.drawText("Jetpack Fuel", healthbar.x+600 + 100, 40, "15px", "black", "center", "middle");

		//powerups
		//canvas.drawText("Active Powerups:", 10, 70, "16px");
		var i =0;
		for(k in $h.player.powerups){
			var val;
			if($h.player.powerups.hasOwnProperty(k)){
				val = $h.player.powerups[k];
				if(val.active){
					canvas.drawRect(42, 25, 0, 90 + i *28,  "white");
					canvas.drawText(Math.ceil(val.effectLength/1000), 25, 90 + i *28 + 16, "14px");
					canvas.drawImage(val.image, 0, 92 + i * 28 );
					i++;
				}
			}
			
		}
		
	}
	function update(){

	}
});