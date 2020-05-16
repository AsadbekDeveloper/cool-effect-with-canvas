const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let x, y, radius, dx, dy, maxRadius, minRadius;
let mouse = {}
let circleArray = [];
let colors = ["#2c3e50", "#e74c3c", "#ecf0f1", "#3498db", "#2980b9"];

for(let i=0; i<800; i++){
  radius = Math.random()*20+30;
  maxRadius = Math.random()*30+30;
  minRadius = Math.random()*5+2;
  x = Math.random()*10000000%(window.innerWidth-2*radius)+radius;
  y = Math.random()*10000000%(window.innerHeight-2*radius)+radius;
  dx = Math.random() - 0.5;
  dy = Math.random() - 0.5;
  circleArray.push(new Circle(x, y, dx, dy, radius, maxRadius, minRadius));
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  resize();
})
filling();

function resize(){
  circleArray.forEach(circle => {
    if(Math.abs(circle.x - mouse.x) < 50 && Math.abs(circle.y - mouse.y) < 50 && circle.radius < circle.maxRadius){
      circle.radius++;
    }else if(circle.radius > circle.minRadius){
      circle.radius--;
    }
    circle.draw();
  });
}

function Circle(x, y, dx, dy, radius, maxRadius, minRadius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.maxRadius = maxRadius;
  this.minRadius = minRadius;
  this.color = colors[Math.floor(Math.random()*5)];
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();      
  }
  this.update = function(){
    if(this.x+this.radius>innerWidth || this.x-this.radius<0) this.dx = -this.dx;
    if(this.y+this.radius>innerHeight || this.y-this.radius<0) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();      
  }
}

function filling(){
  requestAnimationFrame(filling);
  c.clearRect(0, 0, innerWidth, innerHeight);
  circleArray.forEach((circle) => {
    circle.update();
  });
}