// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



V = {
    W:0,
    H:0,
    fps:60+10,
    scale: 50,
    alive: true,
    obstacles: [],
    rand:function(min,max){
      return Math.floor(Math.random()*(max-min+1))+min;
    },
    rotate:function(ox,oy,angle, px, py){
      
      angle = (-angle) * (Math.PI/180);
      nx = Math.round((Math.cos(angle) * (px-ox) - Math.sin(angle) * (py-oy) + ox)*100)/100;
      ny = Math.round((Math.sin(angle) * (px-ox) + Math.cos(angle) * (py-oy) + oy)*100)/100;
      //console.log(ox,oy,angle, px, py, "Wynik", nx, ny);
      return {x:nx, y:ny};
    },
  };

window.onload = function(){
  Game.init();
};

Game = {
  init: function(){
    canvas = document.createElement('canvas');        
    ctx = canvas.getContext('2d');

    Game.layout(); 

    document.body.appendChild(canvas);
    window.addEventListener('keydown', Game.onKey, false);

    V.obstacles[0] = new Obstacle('triangle', 1);
    V.obstacles[1] = new Obstacle('triangle', 1);
    V.obstacles[2] = new Obstacle('triangle', 4);
    V.obstacles[3] = new Obstacle('triangle', 4);


    Word =  new Word();
    Player = new Runner();
    Player.draw();

    Game.play();
  },

  layout: function(){
    V.W = window.innerWidth;
    V.H = window.innerHeight;
    canvas.width = V.W;
    canvas.height = V.H;
  },

  onKey: function(ev){
    Player.key(ev.keyCode);
  },
  play: function(){
    setTimeout(function() {
        window.requestAnimationFrame(Game.play);
        
        //PLAY LOOP
        Word.drawBackground();
        for(var i in V.obstacles){
          Word.manageObstacle(i);
        }
        Player.draw();
        


    }, 1000/V.fps);
  },
}