function saveBook(id) {
  console.log("This is the saveClick function!");
  console.log(id);
  var apiResults = JSON.parse(sessionStorage.getItem("api-results"));
  console.log(apiResults[id]);

  var bookObject = {
    authors: apiResults[id].volumeInfo.authors,
    description: apiResults[id].volumeInfo.description,
    image: apiResults[id].volumeInfo.imageLinks.thumbnail,
    link: apiResults[id].selfLink,
    title: apiResults[id].volumeInfo.title
  };

  var bookString = JSON.stringify(bookObject);

  console.log(bookObject);
  console.log(bookString);

  $.post("/api/books/", {
    authors: apiResults[id].volumeInfo.authors,
    description: apiResults[id].volumeInfo.description,
    image: apiResults[id].volumeInfo.imageLinks.thumbnail,
    link: apiResults[id].selfLink,
    title: apiResults[id].volumeInfo.title
  }).then(function(response) {
    console.log(response);
  });
}
