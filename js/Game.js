class Game {
   constructor(){}

   getState(){
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function(data){
      gameState = data.val();
      })
   }
  update(state){
     database.ref('/').update ({
        gameState:state
     })
  }
  async start(){
     if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value")
      if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
      }
        form = new Form();
        form.display();
     }
    car1 = createSprite(100, 200);
    car1.addImage(car1IMG);
    car2 = createSprite(300, 200);
    car2.addImage(car2IMG);
    car3 = createSprite(500, 200);
    car3.addImage(car3IMG);
    car4 = createSprite(700, 200);
    car4.addImage(car4IMG)
    cars = [car1, car2, car3, car4];
  }
  play(){
     form.hide();
     Player.getPlayerInfo();
     if(allPlayers !== undefined){
        background("#474747");
        image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
        var index = 0;
        var x = 185;
        var y;
        for(var plr in allPlayers){
           index = index + 1;
           x = x + 235;
           y = displayHeight - allPlayers[plr].distance;
           cars[index - 1].x = x;
           cars[index - 1].y = y;
           if(index == player.index){
              stroke(10);
              fill("Yellow");
              ellipse(x, y, 80, 80);
              cars[index - 1].shapeColor = "red";
              camera.position.x = displayWidth/2;
              camera.position.y = cars[index - 1].y;
           }
        }
     }
     if(keyDown(UP_ARROW) && player.index !== null){
        player.distance = player.distance + 10;
        player.update();
     }
     if(player.distance > 4200){
        gameState = 2;
     }
     drawSprites();
  }
 end(){
    console.log("Game Ended!");
 }
}