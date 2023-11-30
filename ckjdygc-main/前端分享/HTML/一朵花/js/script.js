let size = 150;

class Flower{
  constructor(s, a1, a2){
    let l = pow(random(), 2)*size;
    let l2 = random();
    this.l2 = l2;
    this.x = cos(a1)*(l + l2*size/2);
    this.y = sin(a1)*(l + l2*size/2);
    
    this.hue = random();
    
    this.goalX = this.x;
    this.goalY = this.y;
    
    this.dx = 10;
    this.dy = 10;
    
    this.s = s*(l2*.5 + .5);
    this.a = a1;
    this.squash = 1 - (l/size)*.8;
    this.weights = [];
    for (let i = 0; i < 5; i++){
      this.weights[i] = random()*.5 + .5;
    }
  }
  update(){
    this.x += this.dx;
    this.y += this.dy;
    
    this.dx *= .95;
    this.dy *= .95;
    
    let mx = (width/2 + this.x) - mouseX;
    let my = (height/2 + this.y) - mouseY;
   
    let d = dist(width/2 + this.x, height/2 + this.y, mouseX, mouseY);
    let a = atan2(my, mx);
    
    if (d > 1){
      this.dx += cos(a)*size/d;
      this.dy += sin(a)*size/d;
    }
    
    this.x = (this.goalX + this.x)/2;
    this.y = (this.goalY + this.y)/2;
  }
  renderStem(){
    pushPop(() => {
      noFill();
      strokeWeight(this.l2*2 + 1);
      stroke(.35, 1, this.l2*.5 + .5);
      translate(this.x, size);
      let a = PI;
      if (this.x <= 0) a += PI/2;
      arc(0, 0, this.x*2, (this.y)*2 - size*2, a, a+PI/2);
    })
  }
  render(){
    pushPop(() => {
      noStroke();
      fill(this.l2*.2 + .8);
      translate(this.x, this.y);
      rotate(this.a);
      scale(this.s*this.squash, this.s);
      
      for (let j = 0; j < 2; j++)
      for (let i = 0; i < 5; i++){
        let a = i*TAU/5;
        let s = this.weights[i];
        let b = (this.l2*.2 + .8)*(s*.1 + .9)
        fill(this.hue, .1*this.l2, b);
        if (j == 0){
          s += .05;
          fill(0);
        }
        ellipse(cos(a)*.7*s, sin(a)*.7*s, 1);
      }
      fill(0);
      ellipse(0, 0, .7*(this.weights[0] + .05));
      fill(.15, 1, 1*(this.l2*.2 + .8));
      ellipse(0, 0, .7*this.weights[0]);
    })
  }
}

function setup (){
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

function init(){
  flowers = [];
  for (let i = 0; i < 50; i++){
    flowers.push(
      new Flower(random(20) + 20, random(PI*.8) + PI + PI*.1)
    );
  }
  flowers = flowers.sort((a, b) => a.s - b.s);
}

function draw(){
  background(0);
  translate(width/2, height/2);
  flowers.map(f => f.update());
  flowers.map(f => f.renderStem());
  flowers.map(f => f.render());
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight); 
  init();
}

let pushPop = f => {push();f();pop();}