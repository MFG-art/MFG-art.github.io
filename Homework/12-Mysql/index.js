var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "What do you want to do?",
        choices: [
          "Add a department",
          "Add a role",
          "Add an employee",
          "View a department",
          "View a role",
          "View an employee",
          "Update an employee"
        ]
      }
    ])
    .then(function(response) {
      switch (response.selection) {
        case 1:
          getDepartmentInfo();
          break;
        case 2:
          getRoleInfo();
        case 3:
          getEmployeeInfo();
        case 4:
          viewDepartmentInfo;
          break;
        case 5:
          viewRoleInfo;
          break;
        case 6:
          viewEmployeeInfo;
        case 7:
          updateDepartmentInfo;
          break;
        default:
          break;
      }
    });
}

function getDepartmentInfo() {
  console.log("1");
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the department name?"
    }
  ]);
}

function getRoleInfo() {
  console.log("2");
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the role's title?"
    },
    {
      type: "input",
      name: "name",
      message: "What is the salary for this role?"
    },
    {
      type: "input",
      name: "name",
      message: "What is this role's department id?"
    }
  ]);
}

function getEmployeeInfo() {
  console.log("3");
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "name",
      message: "What is the employee's last name?"
    },
    {
      type: "input",
      name: "name",
      message: "What is the employee's role id?"
    },
    {
      type: "input",
      name: "name",
      message: "What is the id of the employee's manager?"
    }
  ]);
}

function viewDepartmentInfo() {
  console.log("4");
}

function viewRoleInfo() {
  console.log("5");
}

function viewEmployeeInfo() {
  console.log("6");
}

function updateEmployeeInfo() {
  console.log("7");
}
