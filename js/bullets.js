define(["head-on", "seekerBullet", "big-boyBullet", "normalBullet"], function($h, sb, bb, nb){
	var bullets = [];
	var cos = Math.cos;
	var sin = Math.sin;
	var types = {
		seeker: sb,
		bigBoy: bb,
		normal: nb
	}
	var bulletProto = {
		x:0,
		y:0,
		vx:0,
		vy:0
	}
	return {
		update: updateBullets,
		create: createBullets,
		render: renderBullets,
	}

	function updateBullets(delta){
		bullets.forEach(function(b){
			b.update(delta);
			
		});
	}
	function createBullets(amt, type){
		var b;
		for(var i=0; i<amt; i++){
			b = $h.entity(types[type], bulletProto);
			b.init();
			bullets.push(b);
			
		}
	}
	function renderBullets(canvas){
		bullets.forEach(function(b){
			canvas.drawRect(10, 10, b.x, b.y, "black");
		})
	}
});