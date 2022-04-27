const { passwords, assignments } = require("./tables.js");
const { password, assignment, viewall } = require("./element.js");
const enquirer = require("enquirer");
const { selectPassword, selectAssignment } = require('./update.js')

module.exports = async () => {
    const answers = await enquirer.prompt({
        name: "prompt",
        type: "select",
        message: "What would you like to do?",
        choices: [
            "Add a new password",
            "Add a new assignment",
            "Edit Password",
            "Edit Assignments",
            "View all passwords",
            "View all assignments",
            "View all passwords and assignments",
            "Exit the program"
        ]
    });

    switch (answers.prompt) {
        case "Add a new password": {
            password();
            break;
        }
        case "Add a new assignment": {
            assignment();
            break;
        }
        case "Edit Password": {
            selectPassword();
            break;
        }
        case "Edit Assignments": {
            selectAssignment();
            break;
        }
        case "View all passwords": {
            passwords();
            break;
        }
        case "View all assignments": {
            assignments();
            break;
        }
        case "View all passwords and assignments": {
            viewall();
            break;
        }
        default: {
            console.log("Goodbye!");
            //childprocess.exec('exit /b');
        }
    };
};