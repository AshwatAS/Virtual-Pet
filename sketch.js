var dog,happyDog,database,foodS,foodStock;
var state=0;
function preload(){
  dogIMG=loadImage("Dog.png");
  happyDogIMG=loadImage("happydog.png");
}
function setup() {
  createCanvas(1800,800);
  dog=createSprite(900,400,100,100);
  dog.addImage(dogIMG)
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}

function draw() {
  background(46,139,87); 
  if(keyDown("UP_ARROW")&& state==0){
    foodS=foodS-1;
    writeStock(foodS);
  } 
  if(foodS==0){
    dog.addImage(happyDogIMG);
    state=1;
  }
  drawSprites();
  textSize(35);
  fill(0)
  text("Press up arrow to feed the dog",230,30);
  text("The dog needs"+" "+foodS+" "+"bottles of milk",230,60)
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  database.ref("/").update({
    Food:x
  })
}