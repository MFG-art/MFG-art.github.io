var employee = require("./Employee");

class Engineer extends employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this.role = "Engineer";
  }

  getGithub() {
    return this.github;
  }
  getRole() {
    return this.role;
  }
}

const e = new Engineer("bob", 1, "email", "github");
console.log(e);
console.log(e.getName());

module.exports = Engineer;
