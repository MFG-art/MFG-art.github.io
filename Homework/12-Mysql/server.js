var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "B@ss&Tr3bl3",
  database: "cms_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
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
          updateEmployeeInfo();
          break;
        default:
          break;
      }
    });
}

function getDepartmentInfo() {
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
      connection.query(
        "INSERT INTO `departments` (name) VALUES (?);",
        response.name,
        function(err, res) {
          if (err) throw err;
          viewDepartmentInfo();
        }
      );
    });
}

function getRoleInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "input",
        name: "department_id",
        message: "What is this role's department id?"
      }
    ])
    .then(function(response) {
      title = response.title;
      salary = parseFloat(response.salary).toFixed(2);
      department_id = parseInt(response.department_id);

      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [title, salary, department_id],
        function(err, res) {
          if (err) throw err;
          viewRoleInfo();
        }
      );
    });
}

function getEmployeeInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the employee's role id?"
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the id of the employee's manager?"
      }
    ])
    .then(function(response) {
      console.log(response);

      let first_name = response.first_name;
      let last_name = response.last_name;
      let role_id = parseInt(response.role_id);
      let manager_id = response.manager_id;

      if (manager_id === "") {
        manager_id = null;
      } else {
        manager_id = parseInt(manager_id);
      }

      console.log(first_name, last_name, role_id, manager_id);

      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [first_name, last_name, role_id, manager_id],
        function(err) {
          if (err) throw err;
          viewEmployeeInfo();
          start();
        }
      );
    });
}

function viewDepartmentInfo() {
  connection.query("SELECT * FROM departments;", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewRoleInfo() {
  connection.query("SELECT * FROM roles;", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewEmployeeInfo() {
  connection.query("SELECT * FROM employees;", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function updateEmployeeInfo() {
  var employeeData;
  var employeeID;
  var employeeNames;
  //get data from database (including employee id)
  connection.query("SELECT * FROM employees;", function(err, res) {
    if (err) throw err;
    employeeData = res;
    employeeNames = employeeData.map(function(x) {
      return x.first_name + " " + x.last_name;
    });

    inquirer
      .prompt({
        type: "list",
        name: "selection",
        message: "Which employee's infomration would you like to edit?",
        choices: employeeNames
      })
      .then(function(response) {
        for (var i = 0; i < employeeNames.length; i++) {
          var employeeFullName =
            employeeData[i].first_name + " " + employeeData[i].last_name;
          if (employeeFullName === employeeNames[i]) {
            employeeID = employeeData[i].id;
            break;
          }
        }

        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employee's first name?"
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employee's last name?"
            },
            {
              type: "input",
              name: "role_id",
              message: "What is the employee's role id?"
            },
            {
              type: "input",
              name: "manager_id",
              message: "What is the id of the employee's manager?"
            }
          ])
          .then(function(response) {
            let firstName = response.first_name;
            let lastName = response.last_name;
            let roleID = parseInt(response.role_id);
            let managerID;

            if (response.manager_id === "") {
              managerID = null;
            } else {
              managerID = parseInt(response.manager_id);
            }

            connection.query(
              "UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?",
              [firstName, lastName, roleID, managerID, employeeID],
              function(err, res) {
                if (err) throw err;
              }
            );
            viewEmployeeInfo();
          });
      });
  });
}
