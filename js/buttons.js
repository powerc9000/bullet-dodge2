define(["head-on"], function($h){
	return function(){
		$h.startGameButton = $h.entity({
			width: 200,
			height: 100,
			angle:0,
			active: true,
			color:"#1C1CED",
			text: "Start Game",
			position: $h.Vector($h.map.width/2 - 100, $h.map.height/2 - 50),
			render: function(canvas){
				if(!$h.game.started && !$h.game.gameOver && !$h.game.starting){
					canvas.drawRect(this.width, this.height, this.position.x, this.position.y, this.color);
					canvas.drawText("Start Game", this.position.x + this.width/2, this.position.y + this.height/2, "20px", "white", "center", "middle");
				}
				if(!$h.game.started && $h.game.gameOver && !$h.game.starting){
					canvas.drawRect(this.width, this.height, this.position.x, this.position.y, this.color);
					canvas.drawText("Retry", this.position.x + this.width/2, this.position.y + this.height/2, "20px", "white", "center", "middle");
				}
			},
			click: function(){
				if(!$h.game.gameOver && !$h.game.started && !$h.game.starting){
					this.active = false;
					$h.game.starting = true;
					$h.game.startTimeLeft = 2000;
				}
				if($h.game.gameOver && !$h.game.started && !$h.game.starting){
					this.active = false;
					$h.events.trigger("reset");
				}
				$h.canvas("main").canvas.canvas.style.cursor = "";
			},
			activate: function(bool){
				this.active = bool;
			},
			init: function(){
				var that = this;
				$h.events.listen("click", function(mouse){
					var mouse = {
						width:2,
						height:2,
						angle:0,
						position:$h.Vector(mouse.x, mouse.y)
					}
					if($h.collides(mouse, that)){
						that.click();
					}
				});
				$h.events.listen("mousemove", function(mouse){
					var mouse = {
						width:2,
						height:2,
						angle:0,
						position:$h.Vector(mouse.x, mouse.y)
					}
					if(that.active){
						if($h.collides(mouse, that)){
							$h.canvas("main").canvas.canvas.style.cursor = "pointer";
							that.color = "#1313C2";
						}else{
							$h.canvas("main").canvas.canvas.style.cursor = "";
							that.color = "#1C1CED";
						}
					}
					
				})
			}
		});
	}
	
})