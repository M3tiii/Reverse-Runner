function Word(){
	this.size = V.scale;
}


Word.prototype.draw = function(i){
	ctx.strokeStyle = "black"
	ctx.fillStyle = "black";
	ctx.lineWidth = 4;
	ctx.fillRect(V.W/2-300, V.H/2, 600, 200);
	if(V.obstacles[i].x < V.W/2-400)
		V.obstacles[i] = new Obstacle(V.obstacles[i].type, true, V.obstacles[i].color);

	V.obstacles[i].draw();

	ctx.fillStyle = "white";
	ctx.fillRect(0,0,V.W/2-300,V.H);
	ctx.fillRect(V.W/2+300,0,V.W,V.H);
	ctx.fillStyle = "black";
	ctx.lineWidth = 4;
	ctx.strokeRect(V.W/2-300, V.H/2-200, 600, 400);
}
