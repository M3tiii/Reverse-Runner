function World(){
	this.size = V.scale;
	this.speed = 1;
	this.shop = false;
	this.shopEnter = false;
	this.days = 0;
	ctx.font = this.size/1.2 + "px Arial";
	this.x = V.W/2+this.size*3.5;
	this.y = V.H/2-this.size*2.2;
}
World.prototype.drawBackground = function(){
	ctx.fillStyle = "white";
	ctx.fillRect(0, V.H/2, V.W, V.H/2);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,V.W,V.H/2);
	ctx.fillRect(V.W/2-this.size*6, V.H/2, this.size*12, V.scale*2.5);
	ctx.fillStyle = "white";
	ctx.fillRect(V.W/2-this.size*6, V.H/2-V.scale*2.5, this.size*12, V.scale*2.5-1);
	
	ctx.lineWidth = this.size/2;
	ctx.textAlign = "end";
	ctx.strokeStyle = "white";
	ctx.fillStyle = "black";

	ctx.strokeText("Score: " + V.score,V.W/2+this.size*6,V.H/2-4*V.scale);
	ctx.fillText("Score: " + V.score,V.W/2+this.size*6,V.H/2-4*V.scale);

	ctx.textAlign = "start";
	// if(!V.alive)
	// 	ctx.strokeStyle = "red";
	ctx.strokeText("Reverse Runner",V.W/2-this.size*6,V.H/2-4*V.scale);
	ctx.fillText("Reverse Runner",V.W/2-this.size*6,V.H/2-4*V.scale);

}
World.prototype.drawShop = function(m){
	//SIGN
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(Math.PI / 10);

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, this.size*2.5, this.size);
	ctx.fillRect(this.size*2.5/2, this.size, this.size/10, this.size);

	ctx.textAlign = 'center';
	ctx.strokeStyle = 'white';
	ctx.font = this.size/3 + 'px Arial';
	ctx.lineWidth = 1;
	ctx.strokeText('Day '+this.days, this.size*2.5/2, this.size/2.5);
	ctx.strokeText('Best 666', this.size*2.5/2, this.size/2+this.size/3);
	ctx.restore();
	if(this.x > V.W/2 + this.size && this.shopEnter){
		this.x-=2*this.size/50;
	}else if(this.x > V.W/2 - this.size * 12 && !this.shopEnter){
		this.x-=2*this.size/50;
		Player.run();
		
	}else if(this.x <= V.W/2 - this.size * 12){
		this.shop = false;
		//this.x = V.W/2+V.scale*7;
	}
	else{
		Player.state('free');
		this.shop = true;

	}

		//this.shopEnter = false;

	//HOUSE
	// ctx.fillStyle = 'black';
	// ctx.strokeStyle = 'black';
	// ctx.lineWidth = this.size/3;
	// ctx.fillRect(V.W/2-this.size,V.H/2-this.size*1.5,this.size*2,this.size*2);
	// ctx.beginPath();
	// ctx.moveTo(V.W/2-this.size*1.5,V.H/2-this.size*1.2);
	// ctx.lineTo(V.W/2, V.H/2-this.size*2.2);
	// ctx.lineTo(V.W/2+this.size*1.5, V.H/2-this.size*1.2);
	// ctx.stroke();

}
World.prototype.manage = function(){
	this.speed += 0.0001;
	Player.boostSpeed(this.speed);
	//console.log(Player.boostFreq);
	this.drawBackground();
	if(this.shop){
		Player.draw();
        this.drawShop(0);
    }else{
		//this.drawBackground();
		if(this.shopEnter){
			this.drawShop(0);
		}
		for(var i in V.pieces){
	        this.managepieces(i);
	    }
		for(var i in V.obstacles){
	        this.manageObstacle(i);
	    }
	    if(!V.alive){
			this.x = V.W/2+V.scale*7;
			this.shopEnter = true;
			V.alive = true;
		}
		Player.run();
	    Player.draw();
	    
    }
}
World.prototype.manageObstacle = function(i){
	if(V.obstacles[i].x < V.W/2-this.size*8){
		V.score++;
		V.obstacles[i] = new Obstacle(V.obstacles[i].type, V.rand(1,4));
	}
	V.obstacles[i].x -= 4*this.speed*this.size/50;
	V.obstacles[i].draw();

	//COLLISION
	if(V.obstacles[i].collision == true && this.shopEnter == false){
		Player.checkCollision(V.obstacles[i]);
	}
}
World.prototype.managepieces = function(i){
	V.pieces[i].x-= this.speed*this.size/50;
	V.pieces[i]['draw'+V.pieces[i].color]();
	if(V.pieces[i].x < V.W/2-this.size*8){
		V.pieces[i] = new Piece();
	}
}
