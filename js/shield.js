define(["head-on"], function($h){
	"use strict";
	var health = 50;
	var maxHealth = 50;
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
		lastHit: 0
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
		maxHealth = amt;
		health = amt * (health/maxHealth);
	}

	function getMaxHealth(){
		return maxHealth;
	}

	function damage(dmg){
		var that = this;
		var playerDmg;
		if(this.timeout){
			clearTimeout(this.timeout);
		}
		if(health - dmg < 0){
			playerDmg = dmg - health;
			health = 0;
		}
		else{
			health -= dmg;
			playerDmg =  0;
		}
		this.lastHit = Date.now();
		return playerDmg;
	}

	function update(delta){
		if(Date.now() - this.lastHit > this.rechargeTimeout){
			if(health !== maxHealth){
				if(health + (this.rechargeRate * delta) > maxHealth){
					health = maxHealth;
				}
				else{
					health += this.rechargeRate * delta;
				}
			}
		}
	}
});