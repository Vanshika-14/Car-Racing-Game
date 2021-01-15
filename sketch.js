
var ball;

var database;

var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    ballposition = database.ref('ball/positions');
    ballposition.on("value", readposition, showerror);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//Reading The Values
function readposition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

//Showing Errors
function showerror(){
    console.log("Error While Reading Or Writing Data.");
}

//Writing The Positions
function writePosition(x, y){
    database.ref('ball/positions').set({
        'x': position.x + x,
        'y': position.y + y
    })
}