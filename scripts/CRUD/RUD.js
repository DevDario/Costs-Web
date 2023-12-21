const root = document.getElementById('root')
const conditionalMessage = document.getElementById('conditional')

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


    projects.map((project,index) => {
        root.innerHTML +=
            `
                <div class="project-card">
                    <div class="card-conteiner">
                        <h3 class="project-name-label">${project.projectName}</h3>
                        <h5 class="project-budget-label">Budget:${project.projectBudget} U$<h5/>
                        <p class="project-categor-labely">Category:${project.projectCategory}</p>
                    
                        <div class="services">
                            <p>${project.numberOfServices} Services Added<p>
                        </div>

                        <div class="actions">
                            
                            <div class="edit">
                                <button onclick="editProject(${index})" class="button">Edit <img src="../../images/edit-icon.png" alt="edit icon" /> </button>
                            </div>

                            <div class="delete">
                                <button onclick="deleteProject(${index})" class="button">Delete <img src="../../images/delete-icon.png" alt="delete icon" /> </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
    })
}

//DELETE
function deleteProject(index) {

    projects.splice(index,1)

    setProjectsToDB()

    window.location.reload()
}

//DB Operations
const getProjectsFromDB = () => JSON.parse(localStorage.getItem('projects')) ?? []
const setProjectsToDB = () => localStorage.setItem('projects', JSON.stringify(projects))