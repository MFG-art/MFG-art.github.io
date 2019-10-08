// THIS FUNCTION GENERATES THE HEADER, WITH TIME = X
function generateHeader(x,timeCount){
    // actual link to high scores
    var highScoreLink = $("<a>");
    highScoreLink.text("view high scores");
    highScoreLink.attr("href","https://www.google.com");
    highScoreLink.attr("style","line-height:200%;margin:10px;");

    //div that encloses high score link
    var highScoreDiv = $("<div>");
    highScoreDiv.attr("style", "width:50%;float:left;margin:0;height:100px;");
    highScoreDiv.append(highScoreLink);

    // timer display
    time = x;
    var timerSpan = $("<span>");
    timerSpan.attr("style","line-height:200%;margin:10px;");
    timerSpan.html("Time left: " + time);

    // div that contains timer
    var timerDiv = $("<div>");
    timerDiv.attr("style", "width:50%;float:left;margin:0;text-align:right;height:100px;");
    timerDiv.append(timerSpan);
    
    // master div, contains the entire header
    var headerDiv = $("<div>");
    headerDiv.attr("style","height:50px; margin-bottom:50px");
    headerDiv.attr("id","header-div");
    headerDiv.append(highScoreDiv);
    headerDiv.append(timerDiv);
    $(document.body).append(headerDiv);

    if (timeCount === true){
        var timeCountdown = setInterval(function(){
            time--;
            timerSpan.html("Time left: " + time);
            console.log(time);
    
            if (time === 0){
                clearInterval(timeCountdown);
                alert("Time's Up!");
            }
        }, 1000);
    }
}

// THIS FUNCTION GENERATES THE S TART SCREEN (TIME = 0)
function startScreen(){

    generateHeader(0,false);

    //creates the main text for the intro screen
    var mainTxt = $("<h3>");
    mainTxt.text("Welcome to Mauricio's Trivia Game!");
    mainTxt.attr("style","margin:auto;width:70%;font-size:50px;height:100px;");
    mainTxt.attr("id","main-text");
    $(document.body).append(mainTxt);

    //creates button that starts quiz
    var startBtn = $("<button>");
    startBtn.text("Click to start quiz");
    startBtn.attr("id","start-button");
    startBtn.attr("style","margin:auto;background-color:green;font-size:40px;");
    $(document.body).append(startBtn);

    // listens for button click
    $("#start-button").on("click",function(){
        event.preventDefault();
        alert("Ready to begin?");

        //removes all elements from DOM
        $("#header-div").remove();
        $("#main-text").remove();
        $("#start-button").remove();
        questions();
    })
}

function questions(){
    var questionArray = [
        "Which of the following is NOT a common oscillator waveform?",
        "Which filter only lets frequencies below it's cutoff frequency pass?",
        "What is the name of the famous JP-8000 oscillator setting?"
    ]

    var answers1 = {
        "Triangle":"4",
        "High Pass Filter":"0",
        "God Saw":"0",
    }

    var answers2 = {
        "Square":"4",
        "Low Pass Filter":"4",
        "Master Saw":"0"
}

    var answers3 = {
        "Circle":"0",
        "Band Pass Filter":"0",
        "Epic Saw":"0"
    }

    var answers4 = {
        "Sawtooth":"4",
        "Notch Filter":"0",
        "Supersaw":"4"
    }
    generateHeader(5,true);

    var currentQuestion = $("<h1>");
    var questionNum = 0;
    currentQuestion.text(questionArray[questionNum]);
    $(document.body).append(currentQuestion);



    



}




startScreen();