const enquirer = require("enquirer");
const { readFileSync, writeFileSync, closeSync } = require("fs");
const path = require("path");
const { passwords, assignments } = require("./tables.js");

module.exports.password = async () => {
    const url = await enquirer.prompt({
        name: "url",
        type: "input",
        message: "What website is this password for? (URL)"
    });

    const username = await enquirer.prompt({
        name: "username",
        type: "input",
        message: "What is the username?"
    });

    const password = await enquirer.prompt({
        name: "password",
        type: "input",
        message: "What is the password?"
    });

    const data = {
        url: url.url,
        username: username.username,
        password: password.password
    };

    // Read the file so that we can append the new password (I dont know how else to do this)
    let pswrds = readFileSync(path.join(__dirname, "../data/passwords.json"), { encoding: "utf-8" });
    const pass = JSON.parse(pswrds);
    
    // stores element names ("_0", "_1", "_2", etc.), so when I append a new password,
    // I take the last element and increment the number by 1 (so if the last element is "_0", the next element will be "_1")
    let elem = [];

    // stores the element names in the "elem" array
    for(let prop in pass) {
        elem.push(prop);
    };

    // if there are no stored passwords, then we know that the element name is "_0", so we write the password to the file accordingly
    // and we don't need to append the element, instead we just create the file contents
    if (elem.length === 0) {
        writeFileSync(path.join(__dirname, "../data/passwords.json"), JSON.stringify({ "_0": data  }), { encoding: "utf-8" });
    }
    else {
        // if there are stored passwords, then we take the last element name in the "elem" array and increment the number by 1
        let name = elem.pop();
        let num = parseInt(name.slice(1));
        let newData = JSON.stringify({ [`_${num + 1}`]: data });

        pswrds = JSON.parse(JSON.stringify(pswrds));

        // replace the open brace ("{") with a comma (",")
        newData = newData.replace("{", ",");

        // remove the last character in the string (because it's JSON we know that it will ALWAYS be a closing brace ("}")
        pswrds = pswrds.slice(0, -1);
        
        // append the new password to the file
        pswrds = pswrds.concat(newData);

        // write the file with the new password
        writeFileSync(path.join(__dirname, "../data/passwords.json"), pswrds, { encoding: "utf-8" });
    };

    // Close the file
    closeSync(0);

    passwords();
};

module.exports.assignment = async () => {
    // Because class isn't allowed as a variable name, I had to use "_class" instead
    const _class = await enquirer.prompt({
        name: "class",
        type: "input",
        message: "Which class is this assignment for?"
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

    let asgnmnts = readFileSync(path.join(__dirname, "../data/assignments.json"), { encoding: "utf-8" });
    const asgnmnt = JSON.parse(asgnmnts);
    
    let elem = [];

    for(let prop in asgnmnt) {
        elem.push(prop);
    };

    if (elem.length === 0) {
        writeFileSync(path.join(__dirname, "../data/assignments.json"), JSON.stringify({ "_0": data  }), { encoding: "utf-8" });
    }
    else {
        let name = elem.pop();
        let num = parseInt(name.slice(1));
        let newData = JSON.stringify({ [`_${num + 1}`]: data });

        asgnmnts = JSON.parse(JSON.stringify(asgnmnts));

        newData = newData.replace("{", ",");
        asgnmnts = asgnmnts.slice(0, -1);
        
        asgnmnts = asgnmnts.concat(newData);

        writeFileSync(path.join(__dirname, "../data/assignments.json"), asgnmnts, { encoding: "utf-8" });
    };

    closeSync(0);

    assignments();
};

module.exports.viewall = async () => {
    assignments();

    passwords();
}