var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var gameender;
var gameenderGroup;
var gameState = "PLAY"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,200,10,10)
  tower.addImage(towerImg)
  ghost = createSprite(200,200,10,10)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5
  doorsGroup = createGroup()
  climbersGroup = createGroup()
  gameenderGroup = createGroup()
} 


function draw(){
  background(0);
  if (gameState === "PLAY"){
    
  
  tower.velocityY = 1
  if (tower.y > 400){
    tower.y = 300
  }
  if(keyDown("Right_Arrow")){
    ghost.x = ghost.x+4
  }
  if(keyDown("Left_Arrow")){
   ghost.x= ghost.x-4 
  }
  if (keyDown("Space")){
    ghost.velocityY = -8
  }
  ghost.velocityY = ghost.velocityY+0.5
  spawnDoors();
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
    if (gameenderGroup.isTouching(ghost)|| ghost.y>600){
      gameState = "END"
    }
  }
  if (gameState === "END"){
    climbersGroup.destroyEach()
     doorsGroup.destroyEach()
    gameenderGroup.destroyEach()
    tower.visible = false
    ghost.visible = false 
    ghost.velocityY = 0
    textSize (35)
    fill("red")
    text("GAME OVER! U LOST",200,300)
   
    }

  
  
  drawSprites();
}


function spawnDoors() {
  
  if(frameCount % 300 === 0){
   door = createSprite(Math.round(random(100,550)),-50,10,10) 
    door.addImage(doorImg)
    door.velocityY = 1
    door.lifetime = 600
    ghost.depth = door.depth + 1
    doorsGroup.add(door)
    
    climber = createSprite(door.x, 10,10,10)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime = 600
    climbersGroup.add(climber)
    
    gameender = createSprite(climber.x,climber.y,100,5)
    gameender.visible = false 
    gameender.velocityY = 1
    gameender.lifetime = 600
    gameenderGroup.add(gameender)
  }
  
  

}


