define(["head-on", "seekerBullet", "big-boyBullet", "normalBullet", "entity"], function($h, sb, bb, nb, entity){
	var ag = arguments,
		bullets = [],
		pool = {seeker:[], bigBoy:[], normal:[]},
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
			explosionLength: 200
		};
		bulletProto = $h.entity(bulletProto, entity);
	return {
		update: updateBullets,
		create: createBullets,
		render: renderBullets,
		count: function(){return bullets.length},
		created: function(){return count},
		reset: function(){
			bullets.length = 0;
		}
	}
	
	function updateBullets(delta){
		bullets.forEach(function(b,i){
			if(b.destroyed){
				bullets.splice(i,1);
				pool[b.type].push(b);

				$h.events.trigger("bulletDestroyed");
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
			b = getFromPool(type);
			if(!b){
				b = $h.entity(types[type], bulletProto);
				b.super = bulletProto;
			}

			b.init(position);
			
			
			//pool[type].push(b);
			bullets.push(b);
			count++;
		}
	}
	function renderBullets(canvas){
		bullets.forEach(function(b){
			b.render(canvas);
		})
	}
	function getFromPool(type){
		var b = pool[type].pop();

		return b || null;

	}
	function explodeBullet(){

		var i = 0;
		var iterations = this.explosionIterations || 8
		var interval;
		var that = this;
		var speed = Math.ceil(this.explosionLength / iterations);
		if(this.exploding){
			return;
		}
		this.exploding = true;
		this.explodeSound && this.explodeSound.play();
		this.sound && this.sound.pause();
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
			
		}, speed)
	}
	function render(canvas){
		var image;
		if(!this.exploding){
			canvas.drawImageRotated(this.image, this.angle *180/Math.PI+180, this.position.x, this.position.y);
		}
		else{
			image = $h.images("exp"+this.iteration);
			canvas.drawImage(image, this.midPoint.x- image.width/2, this.midPoint.y - image.height/2);
		}
		
	}
	
});