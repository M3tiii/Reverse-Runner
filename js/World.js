function Word(){
	this.size = V.scale;
	ctx.textAlign = "start";
	ctx.font = "40px Arial";
	
}
Word.prototype.drawBackground = function(){
	
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,V.W,V.H/2);
	ctx.fillRect(V.W/2-300, V.H/2, 600, V.scale*2.5);
	//ctx.fillRect(V.W/2+300,0,V.W,V.H);
	ctx.fillStyle = "white";
	//ctx.fillRect(0,V.H/2,V.W,V.H/2);
	ctx.fillRect(V.W/2-300, V.H/2-V.scale*2.5, 600, V.scale*2.5);
	
	ctx.strokeStyle = "white";
	
	ctx.lineWidth = 20;
	if(!V.alive)
		ctx.strokeStyle = "red";
	ctx.strokeText("Reverse Runner",V.W/2-300,V.H/2-4*V.scale);
	ctx.fillStyle = "black";
	ctx.fillText("Reverse Runner",V.W/2-300,V.H/2-4*V.scale);

}

Word.prototype.manageObstacle = function(i){
	//DRAW
	ctx.fillStyle = "black";
	ctx.lineWidth = 4;
	
	if(V.obstacles[i].x < V.W/2-400)
		V.obstacles[i] = new Obstacle(V.obstacles[i].type, V.rand(1,4));

	V.obstacles[i].draw();

	//COLLISION
	if(V.obstacles[i].collision == true){
		Player.checkCollision(V.obstacles[i]);
	}

	if(!V.alive){
		//console.log("Przegrana");
		V.scale -= 1;
		//V.alive = true;
	}
}
