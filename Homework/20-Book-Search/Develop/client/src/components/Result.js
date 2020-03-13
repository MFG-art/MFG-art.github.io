import React from "react";
import axios from "axios";

class Result extends React.Component {
  saveResult;

  saveResult(props) {
    console.log("saving result", this.props);
    document.getElementById("alertDiv").insertAdjacentHTML(
      "beforeend",
      `<div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Book Saved Successfully!</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    );
    axios.post("/api/books", this.props).then(data => {
      console.log(data);
    });
  }
  render() {
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
          className="saveBookBtn"
          onClick={event => {
            this.saveResult(event);
          }}
        >
          Save Book
        </button>
        <button>
          <a href={this.props.link} target="_blank">
            View Book
          </a>
        </button>
        <h2 className="bookTitle">{this.props.title}</h2>
        {this.props.authors && <p>Authors:</p>}
        {this.props.authors &&
          this.props.authors.map(author => {
            return <p>{author}</p>;
          })}
        {this.props.description && <p>Description: {this.props.description}</p>}
        <img src={this.props.image} />
      </div>
    );
  }
}

export default Result;
