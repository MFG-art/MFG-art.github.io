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

    
            if (time === 0){
                clearInterval(timeCountdown);
                alert("Time's Up!");
            }
        }, 1000);
    }
}

// THIS FUNCTION GENERATES THE START SCREEN (TIME = 0)
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

var currentQuestion;
var questionNum;
var button1;
var button2;
var button3;
var button4;

var questionArray = [
    "Which of the following is NOT a common oscillator waveform?",
    "Which filter only lets frequencies below it's cutoff frequency pass?",
    "What is the name of the famous JP-8000 oscillator setting?"]

var answers1 = ["Triangle","High Pass Filter","God Saw"]; 
var answers2 = ["Square","Low Pass Filter","Master Saw"];
var answers3 = ["Circle","Band Pass Filter","Epic Saw"];
var answers4 = ["Sawtooth","Notch Filter","Supersaw"];

function questions(){

        
    generateHeader(60,true);

    questionNum = 0;

    currentQuestion = $("<h1>");
    $(document.body).append(currentQuestion);
    button1 = $("<button>");
    $(document.body).append(button1);
    button2 = $("<button>");
    $(document.body).append(button2);
    button3 = $("<button>");
    $(document.body).append(button3);
    button4 = $("<button>");
    $(document.body).append(button4);

    nextQuestion();

    button1.on("click",function(){
        questionNum++;
        nextQuestion();
    });

    button2.on("click",function(){
        questionNum++;
        nextQuestion();
    });

    button3.on("click",function(){
        questionNum++;
        nextQuestion();
    });

    button4.on("click",function(){
        questionNum++;
        nextQuestion();
    });


}

function nextQuestion(){
        currentQuestion.text(questionArray[questionNum]);
        button1.text(answers1[questionNum]);
        button2.text(answers2[questionNum]);
        button3.text(answers3[questionNum]);
        button4.text(answers4[questionNum]);
}

startScreen();