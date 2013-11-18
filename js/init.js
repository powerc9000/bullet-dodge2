define(["head-on", "player", "ship"],function($h, player, ship){
	return function(width, height){
		$h.canvas.create("main", width, height);
		$h.canvas.create("hud", width, 200);
		$h.canvas.create("background", width, height);
		
		$h.map = {};
		$h.player = player
		$h.ship = ship;
		
		$h.map.width = width;
		$h.map.height = height -10 ;
		$h.canvas("main").append("body");
		$h.canvas("hud").append("body");
		// $h.canvas("background").append("body");
		// $h.canvas("background").cavanas.style.position ="aboslute";

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
			document.querySelectorAll(".loading")[0].style.display = "none"
		});
		$h.gameState = {};
		$h.gameState.spawnBullet = true;
		return{
			canvas: $h.canvas("main"),
			hud: $h.canvas("hud"),
		}
	}
	
	
})