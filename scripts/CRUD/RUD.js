const root = document.getElementById('root')
const conditionalMessage = document.getElementById('conditional')
const nameSort = document.getElementById('sort-by-name')

let projects = []

//READ
window.onload = () => {

    projects = getProjectsFromDB()

    if (projects.length === 0) {

        root.style.justifyContent = "center"
        conditionalMessage.innerText = "No Projects Found"

    } else {

        conditionalMessage.style.display = "none"

    }


    projects.map((project, index) => {

        let isDeadlineEnded = deadlineCheck(project)

        root.innerHTML +=
            `
            <li>
                <div class="project-card sort-option">
                    <div class="card-conteiner">
                        <h3 title="${project.projectName}" class="project-name-label">${project.projectName.length >= 13 ? project.projectName.charAt(0).toUpperCase().concat(project.projectName.charAt(5).toUpperCase() + project.projectName.charAt(9).toUpperCase() + "...") : project.projectName}</h3>
                        <h5 class="project-budget-label">Budget: U$ ${project.projectBudget}<h5/>
                        <p class="project-category-label">Category:${project.projectCategory}</p>
                    
                        <div class="services">
                            <p>${project.numberOfServices} Services Added<p>
                        </div>

                        <div class="deadline">
                            <p>${project.projectDeadline}<p>
                        </div>

                        <div class="actions">
                            
                            <div class="edit">
                                <button ${isDeadlineEnded ? "disabled" : ""} id="edit-project" onclick="editProject(${index})" class="button">Edit <img src="../../images/edit-icon.png" alt="edit icon" /> </button>
                            </div>

                            <div class="delete">
                                <button onclick="deleteProject(${index})" class="button">Delete <img src="../../images/delete-icon.png" alt="delete icon" /> </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </li>
            `
    })
}

//DELETE
function deleteProject(index) {

    projects.splice(index, 1)

    setProjectsToDB()

    window.location.reload()
}


//SORT BY NAME
nameSort.addEventListener('click', sortByName)

function sortByName() {

    let list, iterator, switching, elementsToSort, shouldSwitch;

    list = document.getElementById("root");
    switching = true;

    while (switching) {

        switching = false;
        elementsToSort = list.getElementsByTagName("LI");


        for (iterator = 0; iterator < (elementsToSort.length - 1); iterator++) {

            shouldSwitch = false;

            if (elementsToSort[iterator].innerHTML.toLowerCase() > elementsToSort[iterator + 1].innerHTML.toLowerCase()) {

                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {

            elementsToSort[iterator].parentNode.insertBefore(elementsToSort[iterator + 1], elementsToSort[iterator]);
            switching = true;
        }
    }
}

//VERIFY DEADLINE
function deadlineCheck(project) {

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    const projectDeadline = project.projectDeadline

    if (projectDeadline <= currentDate) {

        project.projectDeadline = "Deadline Ended"

        return true

    } else {

        return false & projectDeadline
    }
}

//EDIT
function editProject(index) {

    projects = getProjectsFromDB()

    const projectToEdit = projects[index]

    //stores the project's ID on localStorage for further use in the editing page
    localStorage.setItem('PRID', String(projectToEdit.id))

    //stores the project's position in the array on localStorage for further use in the editing page
    localStorage.setItem('INDEX', String(index))

    window.location.href = "http://127.0.0.1:5500/EditProjects/editProjects.html"
}
//DB Operations
const getProjectsFromDB = () => JSON.parse(localStorage.getItem('projects')) ?? []
const setProjectsToDB = () => localStorage.setItem('projects', JSON.stringify(projects))