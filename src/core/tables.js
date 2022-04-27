const Table = require("ascii-table");
const { readFileSync } = require("fs");
const path = require("path");

module.exports.passwords = async () => {
    // Make a table of the passwords
    const passwordTable = new Table("Passwords");
    passwordTable.setHeading("#", "URL", "Username", "Password");
    
    const passwords = readFileSync(path.join(__dirname, "../data/passwords.json"), { encoding: "utf-8" });
    const pass = JSON.parse(passwords);

    let value = 0

    for(let prop in pass) {
        passwordTable.addRow(value, pass[prop].url, pass[prop].username, pass[prop].password);
        value++;
    };

    // Print the table
    console.log(passwordTable.toString());
};

module.exports.assignments = async () => {
    // Make a table of the assignments
    const assignmentTable = new Table("Assignments");
    assignmentTable.setHeading("#", "Class", "Assignment", "Due Date");
    
    const assignments = readFileSync(path.join(__dirname, "../data/assignments.json"), { encoding: "utf-8" });
    const assign = JSON.parse(assignments);
    
    let value = 0

    for(let prop in assign) {
        assignmentTable.addRow(value, assign[prop].class, assign[prop].assignment, assign[prop].due);
        value++;
    };
    
    // Print the table
    console.log(assignmentTable.toString());
};