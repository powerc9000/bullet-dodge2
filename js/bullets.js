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
		destroyed:false,
		explode: explodeBullet,
		collides: collides,
		bullets: bullets,
		render: render,
		calcMidPoint: getMidPoint,
	}
	return {
		update: updateBullets,
		create: createBullets,
		render: renderBullets,
		count: function(){return bullets.length},
		created: function(){return count}
	}
	function collides(obj){
		return $h.collides(this, obj);
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
	function explodeBullet(){

		var i = 0;
		var iterations = this.explosionIterations || 50
		var interval;
		var that = this;
		if(this.exploding){
			return;
		}
		this.exploding = true;
		interval = setInterval(function(){
			if(i > iterations){
				clearInterval(interval);
				that.destroy("exploded");
				return;
			}
			else{
				that.iteration = i;
			}
			i++;
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
	function getMidPoint() {
	    var cosa = Math.cos(this.angle);
	    var sina = Math.sin(this.angle);
	    var wp = this.width/2;
	    var hp = this.height/2;
	 	this.midPointx =  ( this.position.x + wp * cosa - hp * sina );
	    this.midPointy = ( this.position.y + wp * sina + hp * cosa );
	}
});