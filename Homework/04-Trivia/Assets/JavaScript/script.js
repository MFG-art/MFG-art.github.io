// THIS FUNCTION GENERATES THE HEADER, WITH TIME = X
var time = 0;
var playerPoints = 0;
var timerSpan = $("<span>");
var timeCount = false;

function generateHeader(timeCount){
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
            
            timerSpan.html("Time left: " + time);

            if (time < 0) {
                timeCount = false;
            }

    
            if (time === 0){
                clearInterval(timeCountdown);
                alert("Time's Up!");
            }
            time--;
        }, 1000);
    }
}

// THIS FUNCTION GENERATES THE START SCREEN (TIME = 0)
function startScreen(){


    generateHeader(false);

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
    startBtn.attr("style","margin-left:40%;background-color:green;font-size:40px;");
    var buttonDiv = $("<div>");
    buttonDiv.attr("id","start-button-div");
    buttonDiv.attr("style","width:100%;height:auto");

  
    $(buttonDiv).append(startBtn);
    $(document.body).append(buttonDiv);    
    

    // listens for button click
    $("#start-button").on("click",function(){
        event.preventDefault();
        alert("Ready to begin?");

        //removes all elements from DOM
        $("#header-div").remove();
        $("#main-text").remove();
        $("#start-button-div").remove();
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

questionNum = 0;
var button1points = [0,0,0];
var button2points = [0,1,0];
var button3points = [1,0,0];
var button4points = [0,0,1];
questionNum = 0;

function questions(){
    
    if (questionNum === 0) {
        time = 60;
    }

    generateHeader(true);

    

    currentQuestion = $("<h1>");
    $(document.body).append(currentQuestion);

    //Elements for first button
    button1 = $("<button>");
    button1.attr("style","position:relative;left:50px;top:10px;");
    button1Div = $("<div>");
    button1Div.attr("id","#button1Div");
    button1Div.attr("style","width:100%;height:40px;margin-top:10px;");
    $(button1Div).append(button1);
    $(document.body).append(button1Div);


    //Elements for second button
    button2 = $("<button>");
    button2.attr("style","position:relative;left:50px;top:10px;");
    button2Div = $("<div>");
    $(document.body).append(button2);
    button2Div.attr("id","#button2Div");
    button2Div.attr("style","width:100%;height:40px;");
    $(button2Div).append(button2);
    $(document.body).append(button2Div);


    // Elements for third button
    button3 = $("<button>");
    button3.attr("style","position:relative;left:50px;top:10px;");
    button3Div = $("<div>");
    $(document.body).append(button3);
    button3Div.attr("id","#button3Div");
    button3Div.attr("style","width:100%;height:40px;");
    $(button3Div).append(button3);
    $(document.body).append(button3Div);

    // Elements for fourth button
    button4 = $("<button>");
    button4.attr("style","position:relative;left:50px;top:10px;");
    button4Div = $("<div>");
    $(document.body).append(button4);
    button4Div.attr("id","#button4Div");
    button4Div.attr("style","width:100%;height:40px;");
    $(button4Div).append(button4);
    $(document.body).append(button4Div);

    nextQuestion();

    button1.on("click",function(){
        playerPoints += button1points[questionNum];
        if (button1points[questionNum] === 0) {
            time = time - 10;
            timerSpan.html("Time left: " + time);
        }
        questionNum++;
        nextQuestion();
    });

    button2.on("click",function(){
        playerPoints += button2points[questionNum];
        if (button2points[questionNum] === 0) {
           time = time - 10;
           timerSpan.html("Time left: " + time);
        }
        questionNum++;
        nextQuestion();
    });

    button3.on("click",function(){
        playerPoints += button3points[questionNum];
        if (button3points[questionNum] === 0) {
            time = time - 10;
            timerSpan.html("Time left: " + time);
        }
        questionNum++;
        nextQuestion();
    });

    button4.on("click",function(){
        playerPoints += button4points[questionNum];
        if (button4points[questionNum] === 0) {
            time = time - 10;
            timerSpan.html("Time left: " + time);
        }
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
        
        if (questionNum >= 3) {
            time = 0;
            $("button").remove();
            $("div").remove();
            $("h1").remove();
            $("#header-div").remove();
            $("#main-text").remove();
            $("#start-button-div").remove();
           
            
        }
}

startScreen();

function enterUsername () {
    alert(playerPoints);
    var username = prompt("Enter username: ");
    var scoreboard = {
        "name":username,
        "score":playerPoints,
    }
    localStorage.setItem(playerPoints,JSON.stringify(scoreboard));
    time = 0;
    questionNum = 0;
    playerPoints = 0;
    highScoreScreen();
}

function highScoreScreen(){
    alert("Welcome to the high score screen!");
    startScreen();
}