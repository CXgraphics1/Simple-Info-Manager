const { passwords, assignments } = require('./tables.js');
const { readFileSync, closeSync } = require('fs');
const enquirer = require('enquirer');
const updater = require('jsonfile-updater');
const path = require('path');

module.exports.selectPassword = async () => {
    passwords();

    const passes = readFileSync(path.join(__dirname, "../data/passwords.json"), { encoding: "utf-8" });
    const passwordsObj = JSON.parse(passes);

    const keys = Object.keys(passwordsObj);

    for (const key in keys) {
        keys[key] = keys[key].slice(1);
    }

    const password = await enquirer.prompt({
        name: 'password',
        type: 'select',
        message: 'Which password would you like to update?',
        choices: keys
    });

    this.updatePassword(`_${password.password}`);
    closeSync();
    return password.password;
};

module.exports.updatePassword = async (_password) => {
    const url = await enquirer.prompt({
        name: 'url',
        type: 'input',
        message: 'What would you like the change the url to?'
    });

    const username = await enquirer.prompt({
        name: 'username',
        type: 'input',
        message: 'What would you like the change the username to?'
    });

    const password = await enquirer.prompt({
        name: 'password',
        type: 'input',
        message: 'What would you like to change the password to?'
    });

    const data = {
        url: url.url,
        username: username.username,
        password: password.password
    };

    updater(path.join(__dirname, "../data/passwords.json")).set(_password, data, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

// Assignment Editor 

module.exports.selectAssignment = async () => {
    assignments();

    const asgnmnts = readFileSync(path.join(__dirname, "../data/assignments.json"), { encoding: "utf-8" });
    const asgnmnt = JSON.parse(asgnmnts);

    const keys = Object.keys(asgnmnt);

    for (const key in keys) {
        keys[key] = keys[key].slice(1);
    }

    const assignment = await enquirer.prompt({
        name: "assignment",
        type: "select",
        message: "Which assignment would you like to use?",
        choices: keys
    });

    this.updateAssignment(`_${assignment.assignment}`);

    closeSync(0);
    return assignment.assignment;
};

module.exports.updateAssignment = async (_assignment) => {
    const _class = await enquirer.prompt({
        name: "class",
        type: "input",
        message: "What is the class?"
    });

    const assignment = await enquirer.prompt({
        name: "assignment",
        type: "input",
        message: "What is the assignment?"
    });

    const due = await enquirer.prompt({
        name: "due",
        type: "input",
        message: "When is the assignment due?"
    });

    const data = {
        class: _class.class,
        assignment: assignment.assignment,
        due: due.due
    };

    updater(path.join(__dirname, "../data/assignments.json")).set(_assignment, data, (err) => {
        if (err) {
            console.error(err);
        }
    });
};