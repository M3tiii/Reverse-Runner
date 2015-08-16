function Obstacle(type, collision, color){
	this.size = V.scale/2;
	this.x = V.W/2+400+V.rand(0,1000);
	this.y = V.H/2;
	this.collision = collision;
	this.color = color;
	this.type = type;
	this.shapes = {
		rectangle: [1,0, 1,90, 1,180],
		triangle: [2,0, 2,120],
		triangle2: [2,0, 2,-120],
	}
	this.object = this.shapes[this.type];	
}


Obstacle.prototype.draw = function(){

	this.x-=4;
	ctx.lineWidth=10;
	ctx.fillStyle = this.color;
	ctx.strokeStyle = "black"
	ctx.beginPath();

	ctx.moveTo(this.x, this.y);
	var actualX = this.x;
	var actualY = this.y;
		for(var i=0; i < this.object.length; i+=2){
			//console.log(actualX, actualY);
			var tmp = V.rotate(actualX, actualY, this.object[i+1], actualX+this.size*this.object[i],actualY);
			actualX = tmp.x;
			actualY = tmp.y;
			
			ctx.lineTo(actualX, actualY);

		}
	ctx.closePath();
	ctx.fill();
}
