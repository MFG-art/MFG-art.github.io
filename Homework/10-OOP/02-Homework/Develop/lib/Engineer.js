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

module.exports = Engineer;
