var dog, happyDog, database, foodS, foodStock, dogImg, happyDogImg, feed, foodObj, add, availableFood;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
	createCanvas(800, 700);

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  foodObj = new Food()

  dog = createSprite(600, 250, 50, 50);
  dog.addImage(dogImg);

  dog.scale = 0.15;

  feed = createButton("Feed Dog");
  feed.position(600, 100);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(700, 100);
  add.mousePressed(addFood);
}


function draw() {  
   background(46, 139, 87);
   
   database.ref('food').on("value",(data)=>{
     availableFood = data.val();
   });

   fill(255, 255, 254);
   textSize(15);
   text("Avaiable Food: " + availableFood, 300, 30);

   foodObj.display();
  drawSprites();
   }
  
  function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }

  function feedDog(){
   dog.addImage(happyDogImg);
   database.ref("/").update({
     food:foodObj.deductFood()
   });
  }

  function addFood(){
    foodS++
    database.ref("/").update({
     food:foodS
    });
  }




