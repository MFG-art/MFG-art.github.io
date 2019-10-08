//timer variables
var timer = 3;
var points = 0;
var timerEl = document.createElement("p");
timerEl.innerHTML = timer;
document.body.appendChild(timerEl);

//working loop
var timerInterval = setInterval(function(){ 
        timer--;
        timerEl.innerHTML = timer;
        if (timer === 0){
            timerEl.innerHTML = "";
            clearInterval(timeInterval);
        }
},1000);


function game(s){
    if (s === "end"){
        alert("Time's Up!");
    }

}