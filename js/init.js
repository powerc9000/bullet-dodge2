define(["head-on", "player", "ship", "keys", "bullets"],function($h, player, ship, keys, bullets){
	window.addEventListener("blur", function(){
		if($h.game.started){
			$h.pause();
		}
			
	});
	return function(width, height){
		$h.canvas.create("main", width, height);
		$h.canvas.create("hud", width, 200);
		$h.canvas.create("background", width, height);
		
		$h.map = {};
		$h.player = player
		$h.ship = ship;
		$h.bullets = bullets;
		$h.map.width = width;
		$h.map.height = height -10 ;
		$h.canvas("main").append("body");
		$h.canvas("hud").append("body");
		// $h.canvas("background").append("body");
		// $h.canvas("background").cavanas.style.position ="aboslute";
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
		$h.startGameButton.init();
		$h.game = {};
		$h.game.started = false;
		$h.game.gameOver = false;
		$h.loadImages([
		{
			name:"normalBullet", 
			src:"img/normal_bullet_2.png"
		}, 
		{
			name:"background",
			src:"img/background.png"
		},
		{
			name:"seekerBullet", 
			src:"img/seeker_bullet_2.png"
		},
		{
			name:"dudeLeanRight",
			src:"img/dude_lean_right.png"
		},
		{
			name:"dudeHit",
			src:"img/dude_hit.png"
		}, 
		{
			name:"dudeLeanLeft",
			src:"img/dude_lean_left.png"
		},
		{
			name:"ship",
			src:"img/ship.png"
		},
		{
			name:"bigBoy1",
			src:"img/big_boy_color_1.png"
		},
		{
			name:"bigBoy2",
			src:"img/big_boy_color_2.png"
		},
		{
			name:"exp1",
			src:"img/exp_1.png"
		},
		{
			name:"exp2",
			src:"img/exp_2.png"
		},
		{
			name:"exp3",
			src:"img/exp_3.png"
		},
		{
			name:"exp4",
			src:"img/exp_4.png"
		},
		{
			name:"exp5",
			src:"img/exp_5.png"
		},
		{
			name:"exp6",
			src:"img/exp_6.png"
		},
		{
			name:"exp7",
			src:"img/exp_7.png"
		},
		{
			name:"exp8",
			src:"img/exp_8.png"
		}
		], false, function(){
			player.init();
			$h.ship.init();
			document.querySelectorAll(".loading")[0].style.display = "none";
		});
		keys($h.canvas("main").canvas.canvas);
		return{
			canvas: $h.canvas("main"),
			hud: $h.canvas("hud"),
		}
	}
	
	
})