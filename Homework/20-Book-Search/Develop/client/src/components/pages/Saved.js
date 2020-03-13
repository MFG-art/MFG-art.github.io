import React, { useState } from "react";
import axios from "axios";

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    console.log("Inside componentDidMount()");
    axios.get("/api/books").then(results => {
      console.log(results.data);
      this.setState({ results: results.data });
    });
  }

  handleDelete(event, result) {
    event.preventDefault();
    console.log("This is the result: ", result);
    const url = "/api/books/" + result._id;
    console.log(url);

    axios.delete(url).then(results => {
      console.log(results.data);
      axios.get("/api/books").then(results => {
        console.log(results.data);
        this.setState({ results: results.data });
      });
    });
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
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Search
                </a>
              </li>
              <li className="nav-item active">
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

        {/* RESULTS JUMBOTRON */}
        <div className="jumbotron m-5">
          <h1 className="display-4">Saved Books</h1>
          <p className="lead">Here are your saved books:</p>

          {console.log(this.state.results)}
          {this.state.results.map(result => {
            return (
              <div
                style={{
                  margin: "10px",
                  padding: "20px",
                  border: "1px solid grey",
                  borderRadius: "5px"
                }}
              >
                <button
                  onClick={event => {
                    this.handleDelete(event, result);
                  }}
                >
                  Remove from saved
                </button>
                <h2 className="bookTitle">{result.title}</h2>
                {result.authors && <p>Authors:</p>}
                {result.authors &&
                  result.authors.map(author => {
                    return <p>{author}</p>;
                  })}
                {result.description && <p>Description: {result.description}</p>}
                <img src={result.image} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Saved;
