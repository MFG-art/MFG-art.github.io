import React, { useState } from "react";
import axios from "axios";

class Result extends React.Component {
  saveResult;

  saveResult() {
    console.log("saving result");
  }
  render() {
    return (
      <div>
        <button className="saveBookBtn" onClick={this.saveResult}>
          Save Book
        </button>
        <button>
          <a target="_blank">View Book</a>
        </button>
        <h2 className="bookTitle">{this.props.title}</h2>
        {this.props.authors && <p>Authors:</p>}
        {this.props.authors &&
          this.props.authors.map(author => {
            return <p>{author}</p>;
          })}
        {this.props.description && <p>Description: {this.props.description}</p>}
        <img src={this.props.image} />
        <a href={this.props.link} target="_blank">
          link to Google Books preview
        </a>
      </div>
    );
  }
}

export default Result;
