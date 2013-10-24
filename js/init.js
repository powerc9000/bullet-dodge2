define(["head-on"],function($h){
	$h.canvas.create("main", 500, 500);
	$h.canvas("main").append("body");
	return{
		canvas:$h.canvas("main")
	}
})