define(["head-on"], function($h){
	return function(){
		$h.startGameButton = $h.entity({
			width: 200,
			height: 100,
			angle:0,
			text: "Start Game",
			position: $h.Vector($h.map.width/2 - 100, $h.map.height/2 - 50),
			render: function(canvas){
				if(!$h.game.started && !$h.game.gameOver && !$h.game.starting){
					canvas.drawRect(this.width, this.height, this.position.x, this.position.y, "blue");
					canvas.drawText("Start Game", this.position.x + this.width/2, this.position.y + this.height/2, "20px", "white", "center", "middle");
				}
				if(!$h.game.started && $h.game.gameOver && !$h.game.starting){
					canvas.drawRect(this.width, this.height, this.position.x, this.position.y, "blue");
					canvas.drawText("Retry", this.position.x + this.width/2, this.position.y + this.height/2, "20px", "white", "center", "middle");
				}
			},
			click: function(){
				if(!$h.game.gameOver && !$h.game.started && !$h.game.starting){
					$h.game.starting = true;
					$h.game.startTimeLeft = 5000;
				}
				if($h.game.gameOver && !$h.game.started && !$h.game.starting){
					$h.events.trigger("reset");
				}
			},
			init: function(){
				var that = this;
				$h.events.listen("click", function(mouse){
					console.log(mouse)
					var mouse = {
						width:2,
						height:2,
						angle:0,
						position:$h.Vector(mouse.x, mouse.y)
					}
					if($h.collides(mouse, that)){
						that.click();
					}
				})
			}
		});
	}
	
})