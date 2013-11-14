define(["head-on"], function($h){
	return {
		gravity: $h.Vector(0, 30),
		leftWall: function(){
			return{
				position:$h.Vector(0,0),
				width:20,
				height:$h.map.height,
				angle:0
			}
		},
		topWall: function(){
			return{
				position:$h.Vector(0,0),
				width:$h.map.width,
				height:1,
				angle:0,
			}
		},
		rightWall: function(){
			return{
				position: $h.Vector($h.map.width, 0),
				width:1,
				height:$h.map.height,
				angle:0
			}
		},
		bottomWall: function(){
			return{
				position:$h.Vector($h.map.height, 0),
				width:$h.map.width,
				height:1,
				angle:0
			}
		}
	}
})