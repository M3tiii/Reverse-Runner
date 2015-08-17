function Word(){
	this.size = V.scale;
	ctx.font = "40px Arial";
}
Word.prototype.drawBackground = function(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,V.W,V.H/2);
	ctx.fillRect(V.W/2-300, V.H/2, 600, V.scale*2.5);
	ctx.fillStyle = "white";
	ctx.fillRect(V.W/2-300, V.H/2-V.scale*2.5, 600, V.scale*2.5);
	
	ctx.lineWidth = 20;
	ctx.textAlign = "end";
	ctx.strokeStyle = "white";
	ctx.fillStyle = "black";

	ctx.strokeText("Score: " + V.score,V.W/2+300,V.H/2-4*V.scale);
	ctx.fillText("Score: " + V.score,V.W/2+300,V.H/2-4*V.scale);

	ctx.textAlign = "start";
	// if(!V.alive)
	// 	ctx.strokeStyle = "red";
	ctx.strokeText("Reverse Runner",V.W/2-300,V.H/2-4*V.scale);
	ctx.fillText("Reverse Runner",V.W/2-300,V.H/2-4*V.scale);

}

Word.prototype.manageObstacle = function(i){
	//DRAW
	ctx.fillStyle = "black";
	ctx.lineWidth = 4;
	
	if(V.obstacles[i].x < V.W/2-400){
		V.score++;
		V.obstacles[i] = new Obstacle(V.obstacles[i].type, V.rand(1,4));
	}

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
