require(["head-on","update", "render", "keys", "init"],function($h, update, render, keys, init){
	canvases = init(1000, 700);
	$h.loadImages([{name:"normalBullet", src:"img/normalBullet.png"}, {name:"seekerBullet", src:"img/seekerBullet.png"}]);
	$h.update(update);
	$h.render(render(canvases));
	$h.run();

});
