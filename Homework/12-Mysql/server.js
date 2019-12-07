var mysql = require("mysql");
var express = require("express");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "B@ss&Tr3bl3",
  database: "cms_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

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
      console.log(response);
      switch (response.selection) {
        case "Add a department":
          getDepartmentInfo();
          break;
        case "Add a role":
          getRoleInfo();
          break;
        case "Add an employee":
          getEmployeeInfo();
          break;
        case "View a department":
          viewDepartmentInfo();
          break;
        case "View a role":
          viewRoleInfo();
          break;
        case "View an employee":
          viewEmployeeInfo();
          break;
        case "Update an employee":
          updateDepartmentInfo();
          break;
        default:
          break;
      }
    });
}

function getDepartmentInfo() {
  console.log("1");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department name?"
      }
    ])
    .then(function(response) {
      console.log(response);
    });
}

function getRoleInfo() {
  console.log("2");
  inquirer
    .prompt([
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
    ])
    .then(function(response) {
      console.log(response);
    });
}

function getEmployeeInfo() {
  console.log("3");
  inquirer
    .prompt([
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
    ])
    .then(function(response) {
      console.log(response);
    });
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

connection.end();
