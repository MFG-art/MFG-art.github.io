var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $updateNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var databaseArray;
// var newDatabaseArray = [
//   { title: "a", test: "a", id: 1 },
//   { title: "b", text: "b", id: 2 },
//   { title: "c", text: "c", id: 3 }
// ];
// console.log(newDatabaseArray);
var nextId;
var selectedNote;

// A function for getting all notes from the db
var getNotes = function() {
  console.log("inside getNotes.");

  return $.ajax({
    url: "/api/notes",
    method: "GET",
    success: function(res) {
      console.log("This is what res looks like: ");
      console.log(res);
      if (!(res == false)) {
        var result = JSON.parse(res);
        databaseArray = result.database;
        console.log("Getting results from AJAX call: ");
        console.log(databaseArray);
        renderNoteList(databaseArray);
      }
    },
    error: function(err) {
      throw err;
    }
  });
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  console.log("Inside renderNoteList. notes = ");
  console.log(notes);
  $noteList.empty();
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

var handleNoteSave = function() {
  console.log("Inside handleNoteSave. newNote = ");
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
    id: nextId
  };
  console.log(newNote);

  $noteTitle.val("");
  $noteText.val("");
  saveNote(newNote);
};

// A function for saving a note to the db
var saveNote = function(note) {
  databaseArray.push(note);
  var newDatabaseObject = { database: databaseArray };
  console.log("Inside saveNote. newDataBaseObject = ");
  console.log(newDatabaseObject);

  return $.ajax({
    url: "/api/notes",
    data: newDatabaseObject,
    method: "POST",
    success: function(data) {
      console.log(data);
      console.log("Note saved successful!");
      getNotes();
    },
    error: function(err) {
      console.log("Note not saved");
      throw err;
    }
  });
};

var handleNoteView = function(event) {
  event.stopPropagation();
  console.log("Inside handleNoteView");

  var id = $(this)
    .children(".delete-note")
    .attr("id");
  console.log(id);

  selectedNote = databaseArray[parseInt(id) - 1];
  console.log(selectedNote);

  $noteTitle.val(selectedNote.title);
  $noteText.val(selectedNote.text);
};

var updateNote = function(event) {
  event.stopPropagation();
  selectedNote.id = parseInt(selectedNote.id);
  console.log("Inside updateNote. selectedNote = ");
  console.log(selectedNote);

  databaseArray.forEach(note => {
    note.id = parseInt(note.id);
  });

  databaseArray[selectedNote.id - 1].title = $noteTitle.val();
  databaseArray[selectedNote.id - 1].text = $noteText.val();

  // clears input after update to databaseArray
  $noteTitle.val("");
  $noteText.val("");

  console.log("This is what databaseArray looks like");
  console.log(databaseArray);
  nextId = databaseArray.length + 1;

  var newDatabaseObject = { database: databaseArray };
  console.log("Inside deleteNote. newDataBaseObject = ");
  console.log(newDatabaseObject);

  return $.ajax({
    url: "/api/notes",
    data: newDatabaseObject,
    method: "PUT",
    success: function(data) {
      console.log(data);
      console.log("Note deleted successful!");
      getNotes();
    },
    error: function(err) {
      console.log("Note not deleted correctly");
      throw err;
    }
  });
};
// Delete the clicked note
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();
  console.log("Inside handleNoteDelete.");

  var note = $(this)
    .parent(".list-group-item")
    .data();
  var id = $(this).attr("id");

  id = parseInt(id);
  if (databaseArray.length > 0) {
    deleteNote(id);
  }
};

// A function for deleting a note from the db
var deleteNote = function(id) {
  console.log("Inside deleteNote. id = " + id);
  console.log("This is what database array looks like: ");
  console.log(databaseArray);

  databaseArray.forEach(note => {
    note.id = parseInt(note.id);
  });

  console.log(
    "This is what database array looks like after the parseInt loop: "
  );
  console.log(databaseArray);

  // removes object with id property equal to the new id
  databaseArray = databaseArray.filter(function(note) {
    return note.id !== id;
  });
  console.log("This is what database array looks like after the filter loop: ");
  console.log(databaseArray);
  // 'shifts down' the id's to start from one.
  for (i = 0; i < databaseArray.length; i++) {
    databaseArray[i].id = i + 1;
  }
  console.log(
    "This is what database array looks like after the shifting id loop: "
  );
  console.log(databaseArray);
  nextId = databaseArray.length + 1;

  var newDatabaseObject = { database: databaseArray };
  console.log("Inside deleteNote. newDataBaseObject = ");
  console.log(newDatabaseObject);

  return $.ajax({
    url: "/api/notes",
    data: newDatabaseObject,
    method: "DELETE",
    success: function(data) {
      console.log(data);
      console.log("Note deleted successful!");
      getNotes();
    },
    error: function(err) {
      console.log("Note not deleted correctly");
      throw err;
    }
  });
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

$saveNoteBtn.on("click", handleNoteSave);
$updateNoteBtn.on("click", updateNote);

$noteList.on("click", ".list-group-item", handleNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getNotes();
