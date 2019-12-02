const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const promptData = [];
const teamMembers = [];

let i = 0;

async function prompts() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "What is the role of this person?",
        name: "role",
        choices: ["Engineer", "Manager", "Intern"]
      },
      {
        type: "input",
        message: "What is this person's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is this person's ID?",
        name: "id"
      },
      {
        type: "input",
        message: "What is this person's email account?",
        name: "email"
      },
      {
        type: "input",
        message: function(data) {
          switch (data.role) {
            case "Engineer":
              return "What is this engineer's github account?";
            case "Manager":
              return "What is this manager's office number?";
            case "Intern":
              return "What is the name of this intern's school?";
          }
        },
        name: "other"
      },
      {
        type: "confirm",
        message: "Do you want to add another person?",
        name: "newMember",
        default: "y"
      }
    ])
    .then(function(data) {
      promptData.push(data);
      if (data.newMember) {
        prompts();
      } else {
        console.log(promptData);
        createObjects();
      }
    });
}

prompts();

function createObjects() {
  promptData.forEach(element => {
    switch (element.role) {
      case "Engineer":
        var teamMember = new Engineer(
          element.name,
          parseInt(element.id),
          element.email,
          element.other
        );
        teamMembers.push(teamMember);
        break;
      case "Manager":
        var teamMember = new Manager(
          element.name,
          parseInt(element.id),
          element.email,
          parseInt(element.other)
        );
        teamMembers.push(teamMember);
        break;
      case "Intern":
        var teamMember = new Intern(
          element.name,
          parseInt(element.id),
          element.email,
          element.other
        );
        teamMembers.push(teamMember);
        break;
      default:
        break;
    }
  });
  try {
    console.log(teamMembers);
    createHTML();
  } catch {
    createHTML();
  }
}

function createHTML() {
  const htmlHeader = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Team Member Chart</title>
    <style>
      body {
        background-color: tan;
      }
      h1 {
        margin: 10px 100px 0px 100px;
        text-align: center;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        background-color: whitesmoke;
        border: 1 px darkgrey;
        border-radius: 5px;
        padding: 10px;
      }
      .main {
        margin: 50px 100px;
        background-color: gray;
        border: 1 px darkgrey;
        border-radius: 5px;
        padding: 5px;
        overflow: auto;
      }
      .new-member {
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        float: left;
        margin: 20px;
        background-color: honeydew;
        border: 1 px darkgrey;
        border-radius: 5px;
        padding: 5px;
        width: 25%;
        text-align: center;
      }
    </style>
  </head>
  <body>
  <h1>Team Members:</h1>
  <div class="main">
    `;

  const htmlFooter = `
  </div>
</div>
</body>
</html>`;

  fs.writeFileSync(".output/team-members.html", htmlHeader, "utf8");

  promptData.forEach(member => {
    switch (member.role) {
      case "Manager":
        var memberDiv = `
        <div class="new-member">
          <h2>${member.name} - ${member.role}</h2>
          <p>ID: ${member.id}</p>
          <p>email: ${member.email}</p>
          <p>Office number: ${member.other}</p>
        </div>
        `;
        break;
      case "Engineer":
        var memberDiv = `
        <div class="new-member">
          <h2>${member.name} - ${member.role}</h2>
          <p>ID: ${member.id}</p>
          <p>email: ${member.email}</p>
          <p>Github account: ${member.other}</p>
        </div>
        `;
        break;
      case "Intern":
        var memberDiv = `
        <div class="new-member">
          <h2>${member.name} - ${member.role}</h2>
          <p>ID: ${member.id}</p>
          <p>email: ${member.email}</p>
          <p>School: ${member.other}</p>
        </div>
        `;
        break;
      default:
        break;
    }
    fs.appendFileSync(".output/team-members.html", memberDiv, "utf8");
  });
  fs.appendFileSync(".output/team-members.html", htmlFooter, "utf8");
}
