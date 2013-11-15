define(["head-on"], function($h){
	var fuel,
		maxFuel,
		fuelPerSecond,
		refuelPerSecond,
		refuelTimeout = 500,
		lastTimeUp;
	return{
		useFuel:function(delta){
			fuel -= fuelPerSecond * delta;
			if(fuel < 0){
				fuel = 0;
			}
			lastTimeUp = Date.now();
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
			if(Date.now()- lastTimeUp > refuelTimeout){
				fuel += refuelPerSecond * delta;
				if(fuel > maxFuel){
					fuel = maxFuel;
				}
			}
		}
	}
});