define(["head-on", "seekerBullet", "big-boyBullet", "normalBullet"], function($h, sb, bb, nb){
	var ag = arguments;
	var bullets = [];
	var cos = Math.cos;
	var sin = Math.sin;
	var count = 0;
	var types = {
		seeker: sb,
		bigBoy: bb,
		normal: nb
	}
	var bulletProto = {
		x:0,
		y:0,
		vx:0,
		vy:0,
		width:10,
		height:10,
		destroyed:false
	}
	return {
		update: updateBullets,
		create: createBullets,
		render: renderBullets,
		count: function(){return bullets.length},
		created: function(){return count}
	}

	function updateBullets(delta){
		bullets.forEach(function(b,i){
			if(b.destroyed){
				bullets.splice(i,1);
			}
			b.update(delta);
			if($h.collides(b, $h.player) && b.type == "seeker"){
				bullets.splice(i,1);
			}
			bullets.some(function(bb, idx){
				if($h.collides(b, bb) && i !== idx){
					b.destroy();
					bb.destroy();
					return true;
				}
			})
		});
	}
	function createBullets(amt, type){
		var b;
		for(var i=0; i<amt; i++){
			b = $h.entity(types[type], bulletProto);
			b.init();

			bullets.push(b);
			count++;
		}
	}
	function renderBullets(canvas){
		bullets.forEach(function(b){
			b.render(canvas);
		})
	}
});