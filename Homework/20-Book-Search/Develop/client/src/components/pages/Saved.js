import React from "react";

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
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
        </div>
      </div>
    );
  }
}

export default Saved;
