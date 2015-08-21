function Obstacle(type, layer){
	this.size = V.scale/2;
	this.layer = layer-1;
	this.x = V.W/2+this.size*12+V.rand(this.size,this.size*12);
	this.y = V.H/2;
	this.collision = false;
	//this.color = color;
	this.type = type;
	this.shapes = {
		rectangle: [4,0,-1,-5,	1,0, 1,90, 1,180],
		triangle:  [5,0,0,-5,	2,0, 2, (this.layer % 2 ? 1 : -1) * 120],
	}
	this.object = this.shapes[this.type];
	this.y -= this.object[this.layer] * this.size;
	this.vertex = [{x:this.x,y:this.y}];
	
}


Obstacle.prototype.draw = function(){
	this.collision = false;
	if(Math.abs(this.x+this.size/2 - V.W/2) < this.size*2){
		this.collision = true;
	}
	ctx.lineWidth=10;
	this.layer <= 1 ? ctx.fillStyle = "black" : ctx.fillStyle = "white";
	//ctx.strokeStyle = "black"
	ctx.beginPath();

	ctx.moveTo(this.x, this.y);
	var actualX = this.x;
	var actualY = this.y;
	this.vertex = [ {x:this.x,y:this.y} ];
		for(var i=4; i < this.object.length; i+=2){
			//console.log(actualX, actualY);
			var tmp = V.rotate(actualX, actualY, this.object[i+1], actualX+this.size*this.object[i],actualY);
			this.vertex.push({x:tmp.x, y:tmp.y});
			actualX = tmp.x;
			actualY = tmp.y;
			ctx.lineTo(tmp.x, tmp.y);
		}
	ctx.closePath();
	ctx.fill();
}
