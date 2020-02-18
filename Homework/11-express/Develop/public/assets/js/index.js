var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var databaseArray;
var nextId;

// A function for getting all notes from the db
var getNotes = function() {
  console.log("getting notes...");

  return $.ajax({
    url: "/api/notes",
    method: "GET",
    success: function(res) {
      console.log(res);
      console.log(res == true);
      console.log(res == false);
      console.log(res == "{}");
      if (!(res == false)) {
        var result = JSON.parse(res);
        console.log(result.database);
        console.log(!result.database);
        databaseArray = result.database;
        console.log("Getting results from AJAX call: ");
        console.log(databaseArray);
        console.log(typeof databaseArray);
        renderNoteList(databaseArray);
      }
    },
    error: function(err) {
      throw err;
    }
  });
};

// A function for saving a note to the db
var saveNote = function(note) {
  databaseArray.push(note);
  var newDatabaseObject = { database: databaseArray };
  $.ajax({
    url: "/api/notes",
    data: newDatabaseObject,
    method: "POST"
  }).then({
    function(response) {
      getAndRenderNotes();
    }
  });
  getAndRenderNotes();
};

// A function for deleting a note from the db
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
    id: nextId
  };

  $noteTitle.val("");
  $noteText.val("");
  saveNote(newNote);
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  console.log(note);
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  console.log("Inside renderNoteList");
  console.log(notes);
  console.log(typeof notes);
  $noteList.empty();

  console.log("notes.length: " + notes.length);
  var noteListItems = [];
  nextId = notes.length + 1;
  console.log("The next id is: " + nextId);

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>");
    $li.data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );
    $delBtn.attr("id", i + 1);

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  console.log("Inside getAndRenderNotes");
  const data = getNotes();
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
