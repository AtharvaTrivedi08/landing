var ground, lander, bg, normal;
var thrust, rcs_left, rcs_right;
var crash, obs, obs_img, lz_img, lz;
var lander_img, land;
var vy = 0;
var vx = 0;
var g = 0.05;
var fuel = 100;
var timer

function preload(){
  lander_img = loadImage("normal.png");
  bg = loadImage("bg.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  crash = loadAnimation("crash1.png","crash2.png","crash3.png");
  normal = loadAnimation("normal.png");
  obs_img = loadImage("obstacle.png");
  lz_img = loadImage("lz.png");
  land = loadAnimation("landing1.png","landing2.png","landing_3.png");
  thrust.playing = true;
  thrust.looping = false;
  land.looping = false;
  crash.looping = false;
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup(){
  createCanvas(1000,700);
  frameRate(80);
  timer = 1000,500;
  thrust.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;

  lander = createSprite(150,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200);
  lander.addAnimation("thrusting",thrust);
  lander.addAnimation("left",rcs_left);
  lander.addAnimation("right",rcs_right);
  lander.addAnimation("normal_1",normal);
  lander.addAnimation("landing",land);
  lander.addAnimation("crashing",crash);

  obs = createSprite(320,530,50,100);
  obs.addImage(obs_img);
  obs.scale = 0.5;
  obs.setCollider("rectangle",0,100,300,300);

  ground = createSprite(500,690,1000,20);
  lz = createSprite(880,610,50,30);
  lz.addImage(lz_img);
  lz.scale = 0.3;
  lz.setCollider("rectangle",0,180,400,100);

  rectMode(CENTER);
}

function draw(){
  background(51);
  image(bg,0,0);

  push();
  fill(255);
  text("Fuel :"+fuel,800,25);
  text("Horizontal Velocity :"+round(vx),800,50);
  text("Vertical Velocity : "+round(vy),800,75);
  pop();

  vy = vy+g;
  lander.position.y += vy;
  lander.position.x += vx;

  if(lander.collide(obs)==true){
    lander.changeAnimation("crashing");
    stop();
  }

  var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
  console.log(d);
  if(d<=35 && (vy<2 && vy>-2) && (vx<2 && vy>-2)){
    console.log("landed");
    vx = 0;
    vy = 0;
    g = 0;
    lander.changeAnimation("landing");
  }

  if(lander.collide(ground)==true){
    console.log("collided");
    lander.changeAnimation("crashing");
    vx = 0;
    vy = 0;
    g = 0;
  }

  drawSprites();
}

function keyPressed(){
  if(keyCode == UP_ARROW && fuel>0){
    upward_thrust();
    lander.changeAnimation("thrusting");
    thrust.nextFrame();
  }

  if(keyCode === RIGHT_ARROW && fuel>0){
    lander.changeAnimation("right");
    right_thrust();
  }

  if(keyCode === LEFT_ARROW && fuel>0){
    lander.changeAnimation("left");
    left_thrust();
  }
}

function upward_thrust(){
  vy = -1;
  fuel -=1;
}

function right_thrust(){
  vx += 0.2;
  fuel -=1;
}

function left_thrust(){
  vx -= 0.2;
  fuel -=1;
}

function stop(){
  vx = 0;
  vy = 0;
  g = 0;
  fuel = 0;
}
