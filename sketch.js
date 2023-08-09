var ballon,ballonImage1,ballonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   ballonImage1=loadAnimation("Images/HotAirBallon01.png");
   ballonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

// Función para configurar el ambiente inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  ballon=createSprite(250,650,250,650);
  ballon.addAnimation("hotAirballon",ballonImage1);
  ballon.scale=0.5;

  var ballonHeight=database.ref('ballon/height');
  ballonHeight.on("value",readHeight, console.log("error"));
  textSize(20); 
}

// Función para mostrar UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    // Agrega la animación del globo [usa ballonImage2]
    ballon.addAnimation("hotAirballon",ballonImage2)
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    ballon.addAnimation("hotAirballon",ballonImage2)
    // Agrega la animación del globo [usa ballonImage2]
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    ballon.addAnimation("hotAirballon",ballonImage2)
    // Agrega la animación del globo [usa ballonImage2]
    ballon.scale=ballon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    ballon.addAnimation("hotAirballon",ballonImage2)
    // Agrega la animación del globo [usa ballonImage2]
    ballon.scale=ballon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Usa las flechas del teclado para mover el globo aerostático!",40,40);

}


function updateHeight(x,y){
  database.ref('/ballon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}




function readHeight(data){
  // Asigna el valor de "data" como la altura 
  height = data.val();
  // Asigna el valor de "X" e "y" de la altura a las posiciones "x" e "y" respectivas del globo
  ballon.x = height.x; ballon.y = height.y;
}

function showError(){
  console.log("Error la escribir en la base de datos");
}
