define(["head-on"], function($h){
	"use strict";
	var health = 50;
	var maxHealth = 50;
	var rechargeSound = new Audio("audio/shield_recharge.ogg");
	var continueFromPaused = false;
	var recharge;
	rechargeSound.volume = .2;
	$h.events.listen("pause", function(){
		rechargeSound.pause();
		continueFromPaused = true;
	})
	return{
		setHealth: setHealth,
		getHealth: getHealth,
		setMaxHealth: setMaxHealth,
		getMaxHealth: getMaxHealth,
		damage: damage,
		damaged: false,
		rechargeTimeout: 3000,
		update:update,
		rechargeRate: 20,
		lastHit: 0,
	}
	function setHealth(amt){
		if(amt > maxHealth){
			health = maxhealth;
		}
		else{
			health = amt;
		}
	}

	function getHealth(){
		return health;
	}

	function setMaxHealth(amt){
		health = amt * (health/maxHealth);
		maxHealth = amt;
	}

	function getMaxHealth(){
		return maxHealth;
	}

	function damage(dmg){
		var that = this;
		var playerDmg;
		
		if(health - dmg < 0){
			playerDmg = dmg - health;
			health = 0;
		}
		else{
			health -= dmg;
			playerDmg =  0;
		}
		recharge.reset();
		rechargeSound.pause();
		return playerDmg;
	}

	function update(delta){
		if(!recharge){
			recharge = $h.globalTimer.job(3000, -1);
		}
		if(recharge.ready()){
			if(health < maxHealth){
				if(rechargeSound.paused){
					if(!continueFromPaused){
						rechargeSound.currentTime = 0;
						continueFromPaused = false;
					}
					rechargeSound.play();
				}
				if(health + (this.rechargeRate * delta) > maxHealth){
					health = maxHealth;
				}
				else{
					health += this.rechargeRate * delta;
				}
			}else{
				rechargeSound.pause();
			}
		}
		if(maxHealth < 200){
			this.setMaxHealth(maxHealth + delta/10);
		}
	}
});