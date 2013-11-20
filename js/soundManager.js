define(["head-on"], function($h){
	var sounder = {
		playingsound:[],
		pausedsounds:[],
		sounds:{},
		load: function(name, src){

		}
	}
	// $h.events.listen("pause", function(){
	// 	sounder.pauseAll();
	// })
	// $h.events.listen("unpause", function(){
	// 	sounder.playAll();
	// })
	return sounder;
});