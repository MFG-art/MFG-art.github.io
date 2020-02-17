import React from "react";

function Portfolio() {
  return (
    <div>
      <h2 class="header">My Portfolio</h2>
      <div class="main">
        {/* Project */}
        <div class="portfolio-project">
          <h3>Project Title</h3>
          <p>
            Github Repo:{" "}
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              link to new tab
            </a>
          </p>
          <p>
            Deployed Site:{" "}
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              link to new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
