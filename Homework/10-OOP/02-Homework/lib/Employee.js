class Employee {
  constructor(name = "N/A", id = "N/A", email = "N/A", role = "Employee") {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return this.role;
  }
}

const e = new Employee("Bob", 1, "bob@mail.com");
console.log(e);
console.log(e.getName());
console.log(e.getId());
console.log(e.getEmail());
console.log(e.getRole());

module.exports = Employee;
