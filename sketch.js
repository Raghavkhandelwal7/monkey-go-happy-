var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var obstaclesGroup,foodGroup;
var survivalTime=0,score=0;
var survvaltime;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
 
  createCanvas(600,500);
  
  monkey=createSprite(80,295,20,20);          
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1300,10);
  ground.velocityX=-4;
  ground.width=ground.width/2;
  console.log(ground.x);

  
  obstaclesGroup = new Group();
  foodGroup = new Group();
  }
function draw() {
   
  
  if(gameState===(PLAY)){
    
    survivalTime=Math.round(frameCount/frameRate());
  survivalTime=Math.ceil(frameCount/frameRate());
  background("lightblue");
  monkey.debug=true;
  obstacles();
  banana();
    textSize(30)

  
  if(ground.x<300){
    ground.x=ground.width/2;
  }
  if(keyDown("space")&& monkey.y >= 300) {
    monkey.velocityY = -12; 
  }
    monkey.velocityY=monkey.velocityY+0.4;
    
    if(obstaclesGroup.isTouching(monkey)){
    gameState=END;

  }
   if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
   }
   
  }
  if(gameState===END){
    ground.destroy();
    foodGroup.destroyEach();
    monkey.destroy();
    obstaclesGroup.destroyEach();
    textSize(30);
    fill("red");
      text("Game Over",190,250);
    text("Press 'space' to restart",190,290);
    if(keyDown("space")){
      
      gameState=PLAY;  
     
      monkey=createSprite(80,295,20,20);          
      monkey.addAnimation("moving",monkey_running)
      monkey.scale=0.1;
      
      ground=createSprite(400,350,1300,10);
      ground.velocityX=-4;
      ground.width=ground.width/2;
      
      survivalTime=0;
    }
  }
    
  
  text("Survival time: "+survivalTime,100,50);
  textSize(30)
  
  
  
  
  monkey.collide(ground);
   drawSprites(); 
}



function obstacles(){
  if (frameCount % 120 === 0){
  var obstacle = createSprite(600,315,10,40);
  obstacle.velocityX = -(6 + score/100);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstaclesGroup.add(obstacle);
}
}
function banana(){
  if (frameCount % 50 === 0){
  var banana = createSprite(600,175,10,40);
  banana.velocityX = -(6 + score/100);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  foodGroup.add(banana);
  }
  
}  

