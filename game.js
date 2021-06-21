var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var userClickCount = 0;
var started = false;
var level = 0;
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  updateH1();
}

$(".btn").click(function (event) {
  if (started == true) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    if (checkAnswer(userClickCount)) {
      userClickCount++;
      if (userClickCount == level) {
        userClickCount = 0;
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
      }
    } else {
      console.log("" + userClickCount + ", " + userClickedPattern);
      console.log("" + level + ", " + gamePattern);
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over")
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (started == false) {
    started = true;
    nextSequence();
  }
});

function updateH1() {
  $("#level-title").text("Level " + level);
  level++;
}

function checkAnswer(level) {
  var retValue = userClickedPattern[level] == gamePattern[level];
  console.log("" + level + ", " + retValue);
  return retValue;
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    userClickCount = 0;
    started = false;
}