define(["head-on"], function($h){
	
	return function(player){
		var fuel,
			maxFuel,
			fuelPerSecond,
			refuelPerSecond,
			refuelTimeout = 3000,
			lastTimeUp;
		return{
			useFuel:function(delta){
				console.log(fuelPerSecond);
				fuel -= fuelPerSecond * delta;
				if(fuel < 0){
					fuel = 0;
				}
				lastTimeUp = Date.now();
				this.refuel = false;
				this.lastTimeUp = Date.now();
			},

			setRefuelPerSecond: function(amt){
				refuelPerSecond = amt;
			},

			setFuelPerSecond: function(amt){
				fuelPerSecond = amt;
			},

			setMaxFuel: function(amt){
				fuel *= amt/maxFuel;
				maxFuel = amt;
			},

			setFuel: function(amt){
				if(amt > maxFuel){
					fuel = maxFuel;
				}
				else{
					fuel = amt;
				}
			},

			getMaxFuel: function(){
				return maxFuel;
			},

			getFuel: function(){
				return Math.floor(fuel);
			},

			update: function(delta){
				var that = this;
				if(player.onGround || this.refuel){
					fuel += refuelPerSecond * delta;
					if(fuel > maxFuel){
						fuel = maxFuel;
					}
				}
				if(this.getFuel() <= 0){
					if(Date.now() - lastTimeUp > refuelTimeout){
						that.refuel = true;
					}
				}
				// if(Date.now()- lastTimeUp > refuelTimeout){
					
				// }
			}
		}
	}
		
});