const buttonColors = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;

let gamePattern = [];
let userClickedPattern = [];

$(document).keydown(function(){
    if(!started){
        $("level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});
  

function nextSequence(){
    userClickedPattern = [];

    level++;

    $("level-title").text("Level" + level);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$('.btn').click(function (){
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
    let audio= new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success!")

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong!")

        playSound("wrong");

        $("body").addClass("game-over");
        $("level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}