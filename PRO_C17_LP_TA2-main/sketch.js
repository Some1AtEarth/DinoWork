var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background
var man, man_running, man_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var ballsGroup, ball, ball1, ball2, ball3, ball4, ball5;

var score=0;

var gameOver, restart;


function preload(){
  man_running =   loadAnimation("man1.png");
  man_collided = loadAnimation("man1.png");
  
  groundImage = loadImage("ground2.png");
  background = loadImage("background.jpeg")
  cloudImage = loadImage("cloud.png");
  ball1 = loadImage("ball1.png");
  ball1 = loadImage("ball1.png");
  ball2 = loadImage("ball2.png");
  ball3 = loadImage("ball3.png");
  ball4 = loadImage("ball4.png");
  ball5 = loadImage("ball5.png");
  ball6 = loadImage("ball6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  man = createSprite(50,180,20,50);
  
  man.addAnimation("running", man_running);
  man.addAnimation("collided", man_collided);
  man.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  ballsGroup = new Group();
  
  score = 0;
}

function draw() {
  //man.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the man animation
    man.changeAnimation("running", man_running);
    
    if(keyDown("space") && man.y >= 159) {
      man.velocityY = -12;
    }
  
    man.velocityY = man.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    man.collide(invisibleGround);
    spawnClouds();
    spawnballs();
  
    if(ballsGroup.isTouching(man)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    man.velocityY = 0;
    ballsGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the man animation
    man.changeAnimation("collided",man_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ballsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = man.depth;
    man.depth = man.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  ballsGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}

function spawnballs() {
  if(frameCount % 60 === 0) {
    var ball = createSprite(600,165,10,40);
    //ball.debug = true;
    ball.velocityX = -(6 + 3*score/100);
    
    //generate random balls
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: ball.addImage(ball1);
              break;
      case 2: ball.addImage(ball2);
              break;
      case 3: ball.addImage(ball3);
              break;
      case 4: ball.addImage(ball4);
              break;
      case 5: ball.addImage(ball5);
              break;
      case 6: ball.addImage(ball6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the ball           
    ball.scale = 0.5;
    ball.lifetime = 300;
    //add each ball to the group
    ballsGroup.add(ball);
  }
}

