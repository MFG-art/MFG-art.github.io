import React, { useState } from "react";
import axios from "axios";
import Result from "../Result";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted form");
    document.getElementById("resultsDiv").innerHTML = "";
    const bookQuery = document.getElementById("bookSearch").value.trim();
    console.log("You entered '" + bookQuery + "' into the search bar.");

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          bookQuery +
          "&key=AIzaSyBgy7YzLeK-1f5UQiQV-7P-jrKNAo6iz3k"
      )
      .then(response => {
        console.log("These are the results", response.data.items);
        this.setState({
          results: response.data.items
        });
      });
  }

  showResults() {
    console.log("This is the state", this.state);
    console.log(this.state.title);
  }
  render() {
    return (
      <div>
        {/* NAVBAR CODE */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://books.google.com/">
            Google Books
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Search <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/saved">
                  Saved
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* JUMBOTRON 1 / HEADER */}
        <div className="jumbotron m-5">
          <h1 className="display-4">(REACT) GOOGLE BOOKS SEARCH</h1>
          <p className="lead">Search for and save books that interest you!</p>
        </div>

        {/* JUMBOTRON 2 */}
        <div className="jumbotron m-5">
          <h1 className="display-4">Book Search</h1>
          <hr className="my-4" />
          <p className="lead">Book: </p>
          <form
            onSubmit={event => {
              this.handleSubmit(event);
            }}
          >
            <div className="form-group">
              <label htmlFor="bookSearch">Search for book:</label>
              <input
                type="text"
                className="form-control"
                id="bookSearch"
                aria-describedby="emailHelp"
              />
              <small id="emailHelp" className="form-text text-muted">
                Click the submit button to receive information about your book.
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        {/* RESULTS JUMBOTRON */}
        <div className="jumbotron m-5">
          <h1 className="display-4">Results</h1>
          <p className="lead">Here are the results from Google Books:</p>
          <div id="resultsDiv">
            {this.state.results
              ? this.state.results.map(result => {
                  return (
                    <Result
                      title={result.volumeInfo.title}
                      authors={result.volumeInfo.authors}
                      description={result.volumeInfo.description}
                      image={result.volumeInfo.imageLinks.thumbnail}
                      link={result.volumeInfo.previewLink}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
