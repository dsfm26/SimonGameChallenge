var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern = [];
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomeChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomeChosenColor);
    console.log(gamePattern);
}