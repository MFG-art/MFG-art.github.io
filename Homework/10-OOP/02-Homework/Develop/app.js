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
  console.log(teamMembers);
}

let divTemplate = `
<div>


`;
