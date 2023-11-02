var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clicked = [];
var start = false, lvl = 0;

$(document).on("keypress", function(event){
    if(!start){
        nextSequence();
        start = true;
    }
});

$(".btn").on("click", function() {

    var btnid = this.id;
    clicked.push(btnid);

    playSound(btnid);
    anime(btnid);

    checkans(clicked.length - 1);
});

function checkans(n){
    if(clicked[n] == gamePattern[n]){
        console.log("success");
        if(gamePattern.length == clicked.length){
            setTimeout( function(){
            nextSequence()}, 1000);
        }
    }
    else
        $("#level-title").text("Game Over");
}

function nextSequence(){

    clicked = [];
    lvl++;
    $("#level-title").text("Level - " + lvl);
    var num = Math.floor(Math.random()*4);
    var randomColor = colors[num];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}

function playSound(color){
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function anime(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100);
}