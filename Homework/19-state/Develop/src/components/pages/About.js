import React from "react";
import NavTabs from "../NavTabs";

function About() {
  return (
    <div>
      <NavTabs />
      <h2 class="header">About Me</h2>
      <div class="main">
        <hr />
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <img src="assets/images/profile-image.jpg"></img>
            </div>
            <div class="col-sm">
              <p>
                My name is Mauricio. I am currently 21 years old and studying to
                become a web developer. I want to become a web developer because
                I enjoy learning how computers worked and being a creative
                problem-solver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
