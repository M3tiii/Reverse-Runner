function Obstacle(type, collision){
	this.size = V.scale/2;
	this.x = V.W;
	this.y = V.H/2;
	this.collision = collision;

	this.type = type;
	this.shapes = {
		rectangle: [1,0, 1,90, 1,180],
	}
	this.object = this.shapes[this.type];

	this.draw();

}


Obstacle.prototype.draw = function(){
	this.x-=4;
	ctx.lineWidth=10;

	ctx.beginPath();

	ctx.moveTo(this.x, this.y);
	var actualX = this.x;
	var actualY = this.y;
		for(var i=0; i < this.object.length; i+=2){
			//console.log(actualX, actualY, );
			var tmp = V.rotate(actualX, actualY, this.object[i+1], actualX+this.size*this.object[i],actualY);
			actualX = tmp.x;
			actualY = tmp.y;
			
			ctx.lineTo(actualX, actualY);

		}
	ctx.closePath();
	ctx.stroke();
}
