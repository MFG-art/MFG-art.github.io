
function generateHeader(x){
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
}

function startScreen(){

    generateHeader(0);

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
    })
}

startScreen();