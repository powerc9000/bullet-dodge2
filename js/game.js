require(["head-on","update", "render", "init"],function($h, update, render, init){
	canvases = init(1000, 700);
	$h.events.listen("reset", function(){
		$h.player.init();
		$h.ship.init();
		$h.bullets.reset();
		$h.game.starting = true;
		$h.game.gameOver = false;
		$h.game.startTimeLeft = 5000;
		$h.score.reset();
	})
	$h.update(update);
	$h.render(render(canvases));
	$h.run();
});
