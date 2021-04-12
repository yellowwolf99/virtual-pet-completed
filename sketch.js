var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var Feedtime;
var Lastfeed;
var gameState=0;
var bed,living,garden;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/happy dog.png");
bed=loadImage("images/Bed Room.png");
living=loadImage("images/Living Room.png");
garden=loadImage("images/Garden.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("FEED DOG")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  
  if(gameState===0){
    background(46,139,87)
  }
  if(gameState===1){
    background(bed)
  }
  if(gameState===2){
    background(living)
  }
  if(gameState===3){
    background(garden)
  }
  if(keyDown("b")){
    gameState=1;
  }
  if(keyDown("l")){
    gameState=2;
  }
  if(keyDown("g")){
    gameState=3;
  }
  foodObj.display();
  drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function FeedDog(){
  dog.addImage(happyDog);
  foodObj.image=loadImage("images/milkImage.png")
  foodS=foodS-1;
  database.ref('/').update({
    Food:foodS
  })
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
}


function addFoods(){
  foodS++;
  dog.addImage(sadDog)
  foodObj.image=loadImage("images/milk.png")
  database.ref('/').update({
    Food:foodS
  })
}
