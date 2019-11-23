const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const items = [];
const teamMembers = [];

async function prompts() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "What is the role of this person?",
        name: "memberRole",
        choices: ["Engineer", "Manager", "Intern"]
      },
      {
        type: "input",
        message: "What is this person's name?",
        name: "memberName"
      },
      {
        type: "input",
        message: "What is this person's ID?",
        name: "memberID"
      },
      {
        type: "input",
        message: "What is this person's email account?",
        name: "memberEmail"
      },
      {
        type: "confirm",
        message: "Do you want to add another person?",
        name: "newMember",
        default: "y"
      }
    ])
    .then(function(data) {
      switch (data.memberRole) {
        case "Engineer":
          /*
          inquirer
            .prompt({
              type: "input",
              name: "github",
              message: "What is this engineer's github?"
            })
            .then(function(d) {
              data.github = d.github;
              teamMembers.push(data);
            });
            */
          console.log("engineer");
          break;
        case "Intern":
          /*
          inquirer
            .prompt({
              type: "input",
              name: "school",
              message: "What is this intern's school?"
            })
            .then(function(d) {
              data.school = d.school;
              teamMembers.push(member);
            });
            */
          console.log("intern");

          break;
        case "Manager":
          /*
          inquirer
            .prompt({
              type: "input",
              name: "school",
              message: "What is this manager's office?"
            })
            .then(function(d) {
              data.office = d.office;
              teamMembers.push(member);
            });
            */
          console.log("manager");
          break;
        default:
          break;
      }

      if (data.newMember) {
        prompts();
      }
    });
}

prompts();
