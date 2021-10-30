const inquirer = require("inquirer");
const db = require("./db/index");
require("console.table");

init ();

function init() {
    const logo = "========EMPLOYEE=====TRACKER=======";
  console.log(logo);
  promptMenu();
}


// menu here
function promptMenu () {
    inquirer
    .prompt([
    {
        type: "list",
        name: "options",
        message: "Welcome to employee tracker! Please select an option below to get started.",
        choices: [
            {
                name: "View all departments",
                value: "VIEW_DEPARTMENTS"
            }, 
            {
                name: "View all employees",
                value: "VIEW_EMPLOYEES"
            }, 
            {
                name: "View all roles",
                value: "VIEW_ROLES"
            }, 
            {
                name: "Add a department",
                value: "ADD_DEPARTMENT"
            }, 
            {
                name: "Add an employee",
                value: "ADD_EMPLOYEE"
            }, 
            {
                name: "Add an employee role",
                value: "ADD_ROLE"
            },
            {
                name:"Update an employee role",
                value: "UPDATE_ROLE"
            },
            {
                name:"Quit",
                value: "QUIT"
            },
        ]
      }
    ]).then(res => {
        let choice = res.options;
        switch(choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments()
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees()
                break;
            case "VIEW_ROLES":
                viewAllRoles()
                break;
            case "ADD_DEPARTMENT":
                addNewDepartment()
                break;
            case "ADD_EMPLOYEE":
                addNewEmployee()
                break;
            case "ADD_ROLE":
                addNewRole()
                break;
            case "UPDATE_ROLE":
                updateCurrentRole()
                break;
            case "QUIT":
                quit(); 
                break;    
            default:    
          }
    })      
};

// view all departments
function viewAllDepartments() {
    db.viewDepartments().then((data) => {
        console.log(data[0])
    }).then(() => {
        promptMenu();
    })
    
    }

// View all employees
function viewAllEmployees() {
    db.viewEmployees().then((data) => {
        console.log(data[0])
    }).then(() => {
        promptMenu();
    })
  }

  // view all roles
function viewAllRoles() {
    db.viewRoles().then((data) => {
        console.log(data[0])
    }).then(() => {
        promptMenu();
    })
}

// add a department
function addNewDepartment() {
    inquirer.prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ])
      .then(res => {
        let name = res;
        db.createDepartment(name)
          .then(() => promptMenu())
      })

}


// Exit the application 
function quit() {
    console.log("Thank you for using the employee tracker, goodbye!");
    process.exit();
  }
