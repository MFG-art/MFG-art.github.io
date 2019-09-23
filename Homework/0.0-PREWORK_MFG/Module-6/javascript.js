document.getElementById("shrinkBtn").addEventListener("click", function(){

    document.getElementById("box").style.height = "25px";

});

document.getElementById("growBtn").addEventListener("click", function(){

    document.getElementById("box").style.height = "250px";

});

document.getElementById("resetBtn").addEventListener("click", function(){

    document.getElementById("box").style.height = "150px";
    document.getElementById("box").style.backgroundColor = "orange";
    document.getElementById("box").style.opacity = "1";
    document.getElementById("box").style.marginLeft = "25px";

});

document.getElementById("redBtn").addEventListener("click", function(){

    document.getElementById("box").style.backgroundColor = "red";

});

document.getElementById("opaqueBtn").addEventListener("click", function(){

    document.getElementById("box").style.opacity = "0.5";

});

document.getElementById("moveBtn").addEventListener("click", function(){

    document.getElementById("box").style.marginLeft = "200px";

});