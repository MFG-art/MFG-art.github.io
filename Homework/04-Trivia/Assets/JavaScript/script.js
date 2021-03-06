
var time = 0;
var playerPoints = 0;
var timerSpan = $("<span>");

// THIS FUNCTION GENERATES THE HEADER, WITH CONDITION TIMECOUNT, WHICH DETERMINES IF THE TIME VALUE COUNTS DOWN OR STAYS STATIC.
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
                questionNum = 3;
                nextQuestion();
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
    startBtn.attr("style","margin-left:40%;background-color:green;font-size:40px;position:relative;top:100px;");
    var buttonDiv = $("<div>");
    buttonDiv.attr("id","start-button-div");
    buttonDiv.attr("style","width:100%;height:300px;");

  
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

//These following arrays contain the text information for the questions and the answer buttons. Each index value represents one specific question. (i.e: question one's information is contained in index 0 of these arrays)
var questionArray = [
    "Which of the following is NOT a common oscillator waveform?",
    "Which filter only lets frequencies below it's cutoff frequency pass?",
    "What is the name of the famous JP-8000 oscillator setting?"]

var answers1 = ["Triangle","High Pass Filter","God Saw"]; 
var answers2 = ["Square","Low Pass Filter","Master Saw"];
var answers3 = ["Circle","Band Pass Filter","Epic Saw"];
var answers4 = ["Sawtooth","Notch Filter","Supersaw"];

//this variable will be referenced later and is used as an index value used to reference data for each question. (Each question is associated with it's own index value)
questionNum = 0;

//These contain the points given for each question. Index values represent specific questions (see above)
var button1points = [0,0,0];
var button2points = [0,1,0];
var button3points = [1,0,0];
var button4points = [0,0,1];

//THIS FUNCTION APPENDS THE ELEMENTS REQUIRED FOR THE QUESTIONS PAGE. IT ALSO CALLS ANOTHER FUNCTION TO UPDATE THE QUESTIONS ONCE AN ANSWER HAS BEEN SELECTED, AS WELL AS ASSIGNING POINT VALUES AND TIME PENALTIES TO THE USER DEPENDING ON ANSWERS SELECTED.
function questions(){
    
    //sets initial time during first question.
    if (questionNum === 0) {
        time = 10;
    }

    if (questionNum === 3) {
        time = 0;
    }

    //generates header with timeCount condition true.
    generateHeader(true);

    //Elements for question display
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
            //time penalty for wrong answer
            time = time - 10;
            timerSpan.html("Time left: " + time);
        }
        questionNum++;
        nextQuestion();
    });

    button2.on("click",function(){
        playerPoints += button2points[questionNum];
        if (button2points[questionNum] === 0) {
            //time penalty for wrong answer
            time = time - 10;
            timerSpan.html("Time left: " + time);
        }
        questionNum++;
        nextQuestion();
    });

    button3.on("click",function(){
        playerPoints += button3points[questionNum];
        if (button3points[questionNum] === 0) {
            //time penalty for wrong answer
            time = time - 10;
            timerSpan.html("Time left: " + time);
        }
        questionNum++;
        nextQuestion();
    });

    button4.on("click",function(){
        playerPoints += button4points[questionNum];
        if (button4points[questionNum] === 0) {
            //time penalty for wrong answer
            time = time - 10;
            timerSpan.html("Time left: " + time);
        }
        questionNum++;
        nextQuestion();
    });


}

//THIS FUNCTION UPDATES THE ELEMENTS APPENDED IN questions(). ONCE ALL QUESTIONS HAVE BEEN DISPLAYED, IT CALLS enterUsername();
function nextQuestion(){
    // Updates the display information for the question text and answer options.
        
        if (questionNum >= 3) {
            time = 0;
            $("button").remove();
            $("div").remove();
            $("h1").remove();

            // removes the current header, calls a new header with timeCount = false, and removes the new header.
            $("#header-div").remove();
            generateHeader(false);
            $("#header-div").remove();

            $("#main-text").remove();
            $("#start-button-div").remove();
            enterUsername();
        }
        else {
            currentQuestion.text(questionArray[questionNum]);
            button1.text(answers1[questionNum]);
            button2.text(answers2[questionNum]);
            button3.text(answers3[questionNum]);
            button4.text(answers4[questionNum]);
        }
    }
       


//THIS FUNCTION APPENDS ELEMENTS TO DISPLAY A FORM THAT PROMPTS THE USER TO ENTER THEIR INITIALS. IT CALLS highScoreScreen() ONCE THE USER HAS SUBMITTED THEIR INITIALS.
function enterUsername () {
    console.log("Enter username:");
    var usernameForm = $("<form>");
    var usernameInput = $("<input>");
    var usernameSubmit = $("<button>");


    $(document.body).attr("style","background-color:gray");
    $(usernameForm).attr("style","margin:100px;background-color:#99ff99;width:550px;");

    $(usernameInput).attr("style","margin:20px;");
    $(usernameInput).attr("id","username-input");
    $(usernameInput).attr("placeholder","Enter your initials");
    
    $(usernameSubmit).attr("style","width: 500px;margin:20px;");
    $(usernameSubmit).text("Submit username");
    $(usernameSubmit).attr("id","submit-button");
    usernameSubmit.attr("value","Submit initials");


    usernameForm.append(usernameInput);
    usernameForm.append(usernameSubmit);
    $(document.body).append(usernameForm);

    $(document).on("click","#submit-button",function(event){
        event.preventDefault();
            var userInitials = $("#username-input").val();
            console.log(userInitials);
            
            var playerScore = {
                "initials":null,
                "score":null,
            }
            playerScore.initials = userInitials;
            playerScore.score = playerPoints;

            playerScore = JSON.stringify(playerScore);
            localStorage.setItem("player-score",playerScore);
            $("form").remove();
            $("input").remove();
            $("button").remove();
            highScoreScreen();
    });

}

//THIS FUNCTION GETS HIGH SCORE INFORMATION FROM LOCAL STORAGE. IT ALSO HAS A BUTTON THAT TAKES THE USER BACK TO THE START SCREEN.
function highScoreScreen(){
    $("body").attr("style","background-color:gray;");
    var mainDiv = $("<div>");
    mainDiv.attr("style","background-color:white;margin-left:20%;width:60%;height:500px;margin-top:5%;");
    mainDiv.attr("id","main-div");

    var headerEl = $("<h1>");
    headerEl.text("These are the high scores: ");
    headerEl.attr("style","text-align:center;margin:10px;position:relative;top:10px;");

    var hrEl = $("<hr>");
    hrEl.attr("style","color:black;position:relative;top:10px;");
    
    $(document.body).html(mainDiv);
    $(mainDiv).append(headerEl);
    $(mainDiv).append(hrEl);

    var newGameBtn = $("<button>");
    newGameBtn.attr("style","position:relative;left:100px;top:400px;");
    newGameBtn.attr("id","new-game-button");
    newGameBtn.text("Start a new game!");
    mainDiv.append(newGameBtn);

    $(document).on("click","#new-game-button",function(event){
        event.preventDefault();

        alert($("#main-div").attr("id"));
        $("#main-div").remove();
        alert($("#main-div").attr("id"));
        

        time = 0;
        playerPoints = 0;
        timerSpan = $("<span>");
        timeCount = false;
        questionNum = 0;
        $("body").attr("style","background-color:white;");
        startScreen(false);


    });
}
    


//This function is called right as the page is loaded. (Loads the start screen for the user)
startScreen(false);