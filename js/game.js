require(["head-on","update", "render", "keys"],function($h, update, render){
	$h.loadImages([{name:"normalBullet", src:"img/normalBullet.png"}, {name:"seekerBullet", src:"img/seekerBullet.png"}]);
	$h.update(update);
	$h.render(render);
	$h.run();

});
