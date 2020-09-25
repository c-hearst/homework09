// Consts required for the application to run!

const inquirer = require("inquirer");
const Fs = require("fs")
const licenseData = require("./licensesData")

// The prompts the user will be asked when they run the application in the command line
inquirer
    .prompt([
        {
            type: "input",
            message: "What would you like to title your project?",
            name: "title",
            default: "Working Title",
        },
        {
            type: "input",
            message: "Provide a brief description of your project",
            name: "description",
            default: "A cool web application",
        },
        {
            type: "input",
            message: "How is your application installed?",
            name: "installation",
            default: "npm install",
        },
        {
            type: "input",
            message: "How is the application used?",
            name: "usage",
            default: "npm run start",
        },
        {
            type: "input",
            message: "What special permissions are there for contributing to this application?",
            name: "contributing",
            default: "None!",
        },
        {
            type: "input",
            message: "How is this application tested?",
            name: "test",
            default: "npm run test",
        },
        {
            type: "list",
            message: "What license does this application use?",
            name: "license",
            choices: ["Mozilla", "Apache", "MIT", "IBM"],
            default: 3,
        },
        {
            type: "input",
            message: "Please enter your Github username",
            name: "github",
            default: "firstnamelastname",
        },
        {
            type: "input",
            message: "Please enter your email address",
            name: "email",
            default: "first.last@email.com",
        },
    ])
    .then((response) => {
        let licenseObj = getLicenseObject(response.license)
        let finalObj = {...response, badge: licenseObj.badge, agreement: licenseObj.agreementInfo}
        generateReadme(finalObj)
    });

function getLicenseObject(selectedLicense) {

    return (licenseData[selectedLicense])
}

function getGithubURL(handle){
    return `https://github.com/${handle}`
}

// Function to generate the README as well as the markdown that will be included when it is made with user input

function generateReadme(projectInfo){

const { title, description, installation,usage, contributing, test, github, email, badge, agreement} = projectInfo

const text = `# ${title}
${badge}

## Table of Contents
1. [Title](#Title)
2. [Description](#Description)
3. [Installation](#Installation)
4. [Usage](#Usage)
5. [License](#License)
6. [Contributing](#Contributing)
7. [Test](#Test) 
8. [Questions](#Questions)

------ 
## Title
    ${title}

## Description 
    ${description}

## Installation
    ${installation}

## Usage 
    Please run ${usage}

## License 
    ${agreement}

## Contributing
    ${contributing}

## Test 
    Run ${test}

## Questions 
    If you have questions you can reach me at ${email} or visit my [Github Profile](${getGithubURL(github)})`

    Fs.writeFile(`${title}.md`, text, function(err){
        if (err) throw err

        console.log("successful wrote to file")
    })

    }