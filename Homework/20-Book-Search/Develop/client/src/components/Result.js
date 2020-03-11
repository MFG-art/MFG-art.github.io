+import React, { useState } from "react";
import axios from "axios";

class Result extends React.Component {

saveResult

  render() {
    return (
      <div>
        <button className="saveBookBtn" onClick={}>Save Book</button>
        <button>
          <a target="_blank">View Book</a>
        </button>
        <h2 className="bookTitle">{this.props.title}</h2>
        <p>Authors:</p>
        <image />
      </div>
    );
  }
}

export default Result;
