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
        console.table(data[0])
    }).then(() => {
        promptMenu();
    })
    
    }

// View all employees
function viewAllEmployees() {
    db.viewEmployees().then((data) => {
        console.table(data[0])
    }).then(() => {
        promptMenu();
    })
  }

  // view all roles
function viewAllRoles() {
    db.viewRoles().then((data) => {
        console.table(data[0])
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

// add an employee
function addNewEmployee() {
    inquirer.prompt([
        {
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          name: "last_name",
          message: "What is the employee's last name?"
        }
      ])
        .then(res => {
          let firstName = res.first_name;
          let lastName = res.last_name;
    
          db.findAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));
    
              prompt({
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
              })
                .then(res => {
                  let roleId = res.roleId;
    
                  db.findAllEmployees()
                    .then(([rows]) => {
                      let employees = rows;
                      const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                      }));
    
                      managerChoices.unshift({ name: "None", value: null });
    
                      prompt({
                        type: "list",
                        name: "managerId",
                        message: "Who is the employee's manager?",
                        choices: managerChoices
                      })
                        .then(res => {
                          let employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                          }
    
                          db.createEmployee(employee);
                        })
                        .then(() => console.log(
                          `Added ${firstName} ${lastName} to the database`
                        ))
                        .then(() => prompt())
                    })
                })
            })
        })
}


// Exit the application 
function quit() {
    console.log("Thank you for using the employee tracker, goodbye!");
    process.exit();
  }
