define(["head-on", "player", "ship", "keys", "bullets", "buttons", "score"],function($h, player, ship, keys, bullets, buttons, score){
	window.addEventListener("blur", function(){
		if($h.game.started){
			$h.pause();
		}
			
	});
	return function(width, height){
		$h.globalTimer = new $h.Timer();
		console.log($h.globalTimer);
		$h.canvas.create("main", width, height);
		$h.canvas.create("hud", width, height);
		$h.canvas.create("background", width, height);
		
		$h.map = {};
		$h.player = player
		$h.ship = ship;
		$h.bullets = bullets;
		$h.map.width = width;
		$h.map.height = height -10 ;
		$h.canvas("main").append("#game-contain");
		$h.canvas("hud").append("#game-contain");
		$h.score = score;
		$h.canvas("hud").canvas.canvas.style.position = "absolute";
		$h.canvas("hud").canvas.canvas.style.top = 0;
		// $h.canvas("background").append("body");
		// $h.canvas("background").cavanas.style.position ="aboslute";
		buttons();
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
			name:"rooftop", 
			src:"img/rooftop.png"
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
			name:"dudeSitLeft",
			src:"img/dude_sitting_left.png"
		},
		{
			name:"dudeSitRight",
			src:"img/dude_sitting_right.png"
		},
		{
			name:"outOfFuelLeft",
			src:"img/dude_front_left.png"
		},
		{
			name:"outOfFuelRight",
			src:"img/dude_front_right.png"
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
		},
		{
			name:"cannonSmoke1",
			src:"img/cannon_smoke_1.png"
		}, 
		{
			name:"cannonSmoke2",
			src:"img/cannon_smoke_2.png"
		}, 
		{
			name:"cannonSmoke3",
			src:"img/cannon_smoke_3.png"
		},
		{
			name:"healthPack",
			src:"img/health_pack.png"
		},
		{
			name:"knockback",
			src:"img/knockback.png"
		},
		{
			name:"infiniteFuel",
			src:"img/infinite_fuel.png"
		}
		], false, function(){
			player.init();
			$h.ship.init();
			score.init();
			document.querySelectorAll(".loading")[0].style.display = "none";
		});
		keys($h.canvas("hud").canvas.canvas);
		return{
			canvas: $h.canvas("main"),
			hud: $h.canvas("hud"),
		}
	}
	
	
})