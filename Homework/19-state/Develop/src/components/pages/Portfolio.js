import React from "react";
import NavTabs from "../NavTabs";
import projects from "../links.json";

function Portfolio() {
  return (
    <div>
      <NavTabs />
      <h2 className="header">My Portfolio</h2>
      <div className="main">
        {/* Project */}
        {projects.map(project => {
          return (
            <div className="portfolio-project">
              <h3>{project.name}</h3>
              <p>
                Github Repo:{" "}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link to new tab
                </a>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Portfolio;
