import React from "react";
import NavTabs from "../NavTabs";

function About() {
  return (
    <div>
      <NavTabs />
      <h2 className="header">About Me</h2>
      <div className="main">
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <img
                src="assets/images/profile-image.jpg"
                alt="Mauricio grinning and holding a guitar"
              ></img>
            </div>
            <div className="col-sm">
              <p>
                I am am a recent graduate of the University of Minnesota's Full
                Stack Web Development Program. My client side programming skills
                include but are not limited to HTML, CSS, JavaScript,
                Bootstrap.js, and React.js. I am also bilingual (I'm a native
                Spanish speaker).
              </p>
              <p>
                I also have experience with group projects. I am optimistic,
                creative, and always willing to learn from others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
