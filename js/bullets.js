define(["head-on", "seekerBullet", "big-boyBullet", "normalBullet", "entity"], function($h, sb, bb, nb, entity){
	var ag = arguments,
		bullets = [],
		cos = Math.cos,
		sin = Math.sin,
		count = 0,
		types = {
			seeker: sb,
			bigBoy: bb,
			normal: nb
		},
		bulletProto = {
			x:0,
			y:0,
			vx:0,
			vy:0,
			width:10,
			height:10,
			destroyed:false,
			explode: explodeBullet,
			bullets: bullets,
			render: render,
		};
		bulletProto = $h.entity(bulletProto, entity);
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
			bullets.some(function(bb, idx){
				if(b.collides(bb) && i !== idx && !b.exploding && !bb.exploding){

					b.destroy("collide", bb);
					bb.destroy("collide", b);
					return true;
				}
			})
		});
	}
	function createBullets(amt, type, position){
		var b;
		for(var i=0; i<amt; i++){
			b = $h.entity(types[type], bulletProto);
			b.super = bulletProto;
			b.init(position);

			bullets.push(b);
			count++;
		}
	}
	function renderBullets(canvas){
		bullets.forEach(function(b){
			b.render(canvas);
		})
	}
	function explodeBullet(){

		var i = 0;
		var iterations = this.explosionIterations || 50
		var interval;
		var that = this;
		if(this.exploding){
			return;
		}
		this.exploding = true;
		this.explodeSound && this.explodeSound.play();
		interval = setInterval(function(){
			if(!$h.isPaused()){
				if(i > iterations){
					clearInterval(interval);
					that.destroy("exploded");
					return;
				}
				else{
					that.iteration = i;
				}
				i++;
			}
			
		}, 20)
	}
	function render(canvas){
		if(!this.exploding){
			canvas.drawImageRotated(this.image, this.angle *180/Math.PI+180, this.position.x, this.position.y);
		}
		else{
			canvas.drawCircle(this.position.x, this.position.y, this.iteration , "transparent", {color:"red", width:"2px"})
		}
		
	}
	
});