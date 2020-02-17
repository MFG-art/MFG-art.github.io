import React from "react";

function Contact(props) {
  return (
    <div>
      <h2 class="header">Contact Me</h2>
      <div class="main">
        <ul>
          <li>
            Github:{" "}
            <a
              href="https://github.com/MFG-art"
              target="_blank"
              rel="noopener noreferrer"
            >
              link to new tab
            </a>
          </li>

          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/mauricio-fuentes-gomez-213235191/"
              target="_blank"
              rel="noopener noreferrer"
            >
              link to new tab
            </a>
          </li>
          <li>
            Email:{" "}
            <a type="mail" href="mailto:fuentesmauricio75@gmail.com">
              fuentesmauricio75@gmail.com
            </a>
          </li>
          <li>
            Cell: <a href="tel:+6512007023">651-200-7023</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
