
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var jungle,jungleImage
var monkeyCrashImage;
var gameState="play"

function preload(){
  
  monkeyCrashImage=loadImage("monkeyCrash.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 jungleImage=loadImage("jungle.jpg")
}



function setup() {
  
var survivalTime=0;
  
  
  jungle=createSprite(0,0,400,400)
  jungle.addImage(jungleImage)
  jungle.velocityX=-5
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("crash",monkeyCrashImage);
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background("white");
  
  if(gameState==="play"){
    //survivalTime 
    survivalTime=Math.ceil(frameCount/frameRate()) ;
    
    //resetting the ground
   if(ground.x<0) {
    ground.x=ground.width/2;}
    
    //resetting the jungle background
      if(jungle.x<200) {
    jungle.x=jungle.width/2;
  }
  
  //monkey jumping and gravity  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
     
    spawnFood();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      
       gameState="end"
    }
  }
  else if(gameState==="end")
{
  jungle.velocityX=0
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        monkey.changeAnimation("crash", monkeyCrashImage)
}    
 monkey.collide(ground);  
  drawSprites();
  
  //displaying score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    
  
  stroke("black");
  textSize(25);
  fill("black");
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}
