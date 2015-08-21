function Piece(){
	this.x = V.W/2+V.scale*7+V.rand(0,V.scale*20);
	this.y = V.H/2+V.rand(V.scale*2.3,V.scale*0.5)*(V.rand(0,1) ? 1 : -1);
	this.size = V.scale/10;
	this.speed = 1;

	this.y < V.H/2 ? this.color = 'black' : this.color = 'white';
	//console.log(V.H/2, this.y, this.color);
}

Piece.prototype.drawblack = function(){
	//console.log("A")
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.moveTo(this.x,this.y);
	ctx.lineTo(this.x+this.size, this.y);
	ctx.moveTo(this.x+this.size/2, this.y-this.size/2);
	ctx.lineTo(this.x+this.size/2, this.y+this.size/2);
	
	ctx.stroke();
}
Piece.prototype.drawwhite = function(){
	//console.log("A")
	ctx.lineWidth = 1;
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x,this.y, this.size/4,0,2*Math.PI)
	//(this.upBodyX+this.size/16,this.upBodyY-this.size/8,this.size/8,0,2*Math.PI);
	
	ctx.fill();
}