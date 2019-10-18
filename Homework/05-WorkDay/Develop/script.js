var now = moment();
var events = ["","","","","","","","",""];
var eventObject = {"events":events};
var currentHour = now.hour();
console.log(currentHour);



//Displays today's date (Example of format :"Friday, October 18")
$("#currentDay").text(now.format("dddd, MMMM DD"));

if (localStorage.getItem("eventObject") !== null) {
    console.log(localStorage.getItem("eventObject") !== null);
    var getObject = localStorage.getItem("eventObject");
    getObject = JSON.parse(getObject);
    events = getObject.events;
    console.log(getObject.events);
}

for (var i = 0; i < events.length; i++){
    var selectedClass = ".row" + i;
    console.log(selectedClass);
    $(selectedClass).children(".eventText").val(events[i]);
    console.log($(selectedClass).data("index"));

    if (($(selectedClass).data("index")+9) === currentHour){
        $(selectedClass).children(".eventText").attr("class","col-md-9 eventText present");
    }

    if (($(selectedClass).data("index")+9) < currentHour){
        $(selectedClass).children(".eventText").attr("class","col-md-9 eventText past");
    }
    if (($(selectedClass).data("index")+9) > currentHour){
        $(selectedClass).children(".eventText").attr("class","col-md-9 eventText future");
    }
}

// buttons for saving text are marked with class="saveBtn"
//use $(this).parent().children(".eventText") or something similar?
// Use a data attribute?

// When any of the blue save buttons are clicked on, save text in textbox to local storage

$(".saveBtn").on("click",function(event){
    
    //Assings the current index and text box content to variables
    var scheduledEvent = $(this).parent().children(".eventText").val();
    console.log(scheduledEvent);
    var thisIndex = $(this).parent().data("index");
    
    if (localStorage.getItem("eventObject") !== null) {
        console.log(localStorage.getItem("eventObject") !== null);
        var getObject = localStorage.getItem("eventObject");
        getObject = JSON.parse(getObject);
        events = getObject.events;
        console.log(getObject.events);
    }

    events[thisIndex] = scheduledEvent;
    console.log(events);
    
    var eventObject = {"events":events};
    eventObject = JSON.stringify(eventObject);
    localStorage.setItem("eventObject",eventObject);
});

