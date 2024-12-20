const root = document.getElementById('root')
const conditionalMessage = document.getElementById('conditional')
const nameSort = document.getElementById('sort-by-name')

function fetchProjects(){
    fetch('http://localhost:8081/project/all',{
        method:"GET",
        credentials:'include'
    })
    .then(response => response.json())
    .then(projects =>{

        if (projects.length === 0) {
            root.style.justifyContent = "center"
            conditionalMessage.innerText = "No Projects Found"
        } else {
            conditionalMessage.style.display = "none"
        }

        setProjectsToLocalStorage(projects)

    // renders all projects
    projects.map((project,position) => {

        let isDeadlineEnded = deadlineCheck(project)

        root.innerHTML +=
            `
            <li>
                <div class="project-card sort-option">
                    <div class="card-conteiner">
                        <div class="card-header">
                            <h3 title="${project.name}" class="project-name-label">${project.name.length >= 13 ? project.name.charAt(0).toUpperCase().concat(project.name.charAt(5).toUpperCase() + project.name.charAt(9).toUpperCase() + "...") : project.name}</h3>

                            <img src="../../images/eye-icon.png" alt="Click to See Project" class="see-project-icon" id="see-project">
                        </div>
                        <h5 class="project-budget-label">Budget: U$ ${project.budget}<h5/>
                        <p class="project-category-label">Category:${project.category.toLowerCase()}</p>

                        <div class="deadline">
                            <p>${new Date(project.deadline).toLocaleDateString('en-US',{month: 'long', day: 'numeric', year: 'numeric'})}<p>
                        </div>

                        <div class="actions">
                            
                            <div class="edit">
                                <button ${isDeadlineEnded ? "disabled" : ""} id="edit-project-${project.id}" class="button" onclick="editProject(${position})" >Edit <img src="../../images/edit-icon.png" alt="edit icon" /> </button>
                            </div>

                            <div class="delete">
                                <button class="button" id="delete-project-${project.id}" onclick="deleteProject(${project.id})" >Delete <img src="../../images/delete-icon.png" alt="delete icon" /> </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </li>
            `
    })
    })
    .catch(error => {
        alert("We couldn't fetch your projects \n try again later")

        console.error('Error while fetching projects --> \n', error)
    })
}

window.onload = () => {

    fetchProjects()
    
}

//DELETE
function deleteProject(id) {

    const isSure = confirm("You sure to delete this project ?")

    if(!isSure===true) return

    fetch(`http://localhost:8081/project/del/${id}`,{
        method:"DELETE",
        credentials:'include',
    })
    .then(response => response.json())
    .then((responseData)=>{
        
        if(responseData.ok){
            alert(`Deleted Sucessfully !`)
        }else{
            alert(`Project was not deleted !`)
        }
        
    })
    .catch((error)=>{
        console.log(`Something went south when deleting the project -> \n \n ${error.message} \n \n `)
    })

    window.location.reload()
}


//SORT PROJECTS

function getSortOption(){
    const sortOption = document.getElementById('sort-select').value

    switch(sortOption){
        case "Name":
            sortByName()
            break
        case "Budget":
            sortByBudget()
            break
        default:
            alert("This option doesn't exists !")
    }

    sortProjects()
}

function sortByBudget(){
    projects.sort((current, next)=>{

        return current.projectBudget - next.projectBudget
    })
}

function sortProjects() {
    const list = document.getElementById("root")
    const elementsToSort = list.getElementsByTagName("LI")


    let switching = true

    while (switching) {

        switching = false

        for (let iterator = 0; iterator < elementsToSort.length - 1; iterator++) {

            if (elementsToSort[iterator].textContent.toLowerCase() > elementsToSort[iterator + 1].textContent.toLowerCase()) {
                
                elementsToSort[iterator].parentNode.insertBefore(elementsToSort[iterator + 1], elementsToSort[iterator])

                switching = true

            }
        }
    }
}

function sortByName() {

    let list, iterator, switching, elementsToSort, shouldSwitch

    list = document.getElementById("root")
    switching = true

    while (switching) {

        switching = false
        elementsToSort = list.getElementsByTagName("LI")


        for (iterator = 0; iterator < (elementsToSort.length - 1); iterator++) {

            shouldSwitch = false

            if (elementsToSort[iterator].innerHTML.toLowerCase() > elementsToSort[iterator + 1].innerHTML.toLowerCase()) {

                shouldSwitch = true
                break
            }
        }
        if (shouldSwitch) {

            elementsToSort[iterator].parentNode.insertBefore(elementsToSort[iterator + 1], elementsToSort[iterator])
            switching = true
        }
    }
}

//VERIFY DEADLINE
function deadlineCheck(project) {

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    const projectDeadline = project.projectDeadline

    if (projectDeadline >= currentDate) {

        project.projectDeadline = "Deadline Ended"

        return true

    } else {

        return false
    }
}

//EDIT
function editProject(positionOnArray) {

    localStorage.setItem('POSITION',positionOnArray)

    // redirecting user to editing page
    window.location.href = "http://localhost:3333/EditProjects/editProjects.html"
}


//DB Operations
const getProjectsFromDB = () => JSON.parse(localStorage.getItem('projects')) ?? []
const setProjectsToLocalStorage = (projects) => localStorage.setItem('projects', JSON.stringify(projects))
const setUserDetailsToLocalStorage = (details) => localStorage.setItem('userDetails',JSON.stringify(details))