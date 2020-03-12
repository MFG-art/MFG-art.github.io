import React from "react";
import axios from "axios";

class Result extends React.Component {
  saveResult;

  saveResult(props) {
    console.log("saving result", this.props);
    axios.post("/api/books", this.props).then(data => {
      console.log(data);
    });
  }
  render() {
    return (
      <div>
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
