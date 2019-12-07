var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

function getDepartmentInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the department name?"
    }
  ]);
}

function getRoleInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the department name?"
    }
  ]);
}

function getEmployeeInfo() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the department name?"
    }
  ]);
}
