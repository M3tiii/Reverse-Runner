
function Word(){
	this.size = V.scale;

}


Word.prototype.draw = function(){
	ctx.lineWidth = 4;
	ctx.strokeRect(V.W/2-300, V.H/2-200, 600, 400);
	ctx.fillRect(V.W/2-300, V.H/2, 600, 200);
	if(V.obstacles[0].x < V.W/2-200)
		V.obstacles[0] = new Obstacle('triangle', true, 'black');


}
