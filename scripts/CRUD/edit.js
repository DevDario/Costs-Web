let projects = []
let services = []
const PRID = localStorage.getItem("PRID")
const servicesArea = document.getElementById("services-root")
const conditionalMessage = document.getElementById('conditional')

function fillFields(projectInfo) {
    //labels
    const projectNameLabel = document.getElementById('project-name-description')
    const projectBudgetLabel = document.getElementById('project-budget-description')
    const projectCategoryLabel = document.getElementById('project-category-description')
    const projectUsedBudgetLabel = document.getElementById('project-usedbudget-description')

    //inputs
    const projectNameInput = document.getElementById('project-name')
    const projectBudgetInput = document.getElementById('project-budget')
    const projectCategoryInput = document.getElementById('category')


    projectNameLabel.innerHTML = `Project's Name: ${projectInfo.name}`
    projectBudgetLabel.innerHTML = `Project's Budget: U$ ${projectInfo.budget},00`
    projectCategoryLabel.innerHTML = `Project's Category: ${projectInfo.category}`
    projectUsedBudgetLabel.innerHTML = `Budget Used: U$ ${projectInfo.usedBudget},00`

    projectNameInput.value = `${projectInfo.name}`
    projectBudgetInput.value = `${projectInfo.budget}`
    projectCategoryInput.value = `${projectInfo.category}`

}

function renderServices(projectInfo) {

    if (projectInfo.services.length === 0) {

        servicesArea.style.justifyContent = "center"
        conditionalMessage.innerText = "No Services Added"

    } else {

        conditionalMessage.style.display = "none"

    }

    projectInfo.services.map((service, index) => {
        servicesArea.innerHTML +=
            `
                <div class="service-card card">
                    <div class="card-conteiner">
                        <h3 title="${service.name}" class="service-name-label">
                            ${service.name.length >= 13 ? service.name.charAt(0).toUpperCase().concat(service.name.charAt(5).toUpperCase() + service.name.charAt(9).toUpperCase() + "...") : service.name}</h3>
                        <h5 class="service-budget-label">
                            Budget: U$ ${service.budget}
                        <h5/>
                        <p class="service-description-label">
                            About:${service.description.length === 0 ? " none" : service.description}
                        </p>

                        <div class="actions">
                            <div class="delete">
                                <button onclick="deleteService(${index})" class="button">Delete <img src="../../images/delete-icon.png" alt="delete icon" /> </button>
                            </div>
                        </div> 
                    </div>
                </div>
            `
    });

}


function deleteService(index) {

    const INDEX = parseInt(localStorage.getItem('INDEX'))

    projects[INDEX].projectBudget += projects[INDEX].projectServices[index].serviceBudget

    projects[INDEX].usedBudget -= projects[INDEX].projectServices[index].serviceBudget

    projects[INDEX].projectServices.splice(index, 1)

    projects[INDEX].numberOfServices -= 1

    localStorage.setItem('projects', JSON.stringify(projects))

    window.location.reload()

}


(
    function () {

        try {

            //projects = JSON.parse(localStorage.getItem('projects')) ?? []

            fetch(`http://localhost:8080/project/all`)
            .then(response => response.json())
            .then(projects=>{

                
                if (!projects) {

                    alert("You don't have any created projects !")

                    //window.location.href = `http://127.0.0.1:3333/NewProject/newproject.html`
                }

                let projectToEdit = projects[PRID]

                fillFields(projectToEdit)

                renderServices(projectToEdit)


            })

        } catch (error) {

            alert("You must select a project to edit. We'll take you there.")

            window.location.href = `http://127.0.0.1:3333/ViewProjects/viewprojects.html`

        }

    }
)()

const inputs = {

    projectNameInput: document.getElementById('project-name'),
    projectBudgetInput: document.getElementById('project-budget'),
    projectCategoryInput: document.getElementById('category'),
    projectServiceNameInput: document.getElementById('service-name'),
    projectServiceBudgetInput: document.getElementById('service-budget'),
    projectServiceDescriptionInput: document.getElementById('service-description')

}


function addService(INDEX) {

    if (parseInt(inputs.projectServiceBudgetInput.value) >= projects[INDEX].projectBudget || parseInt(inputs.projectServiceBudgetInput.value) <= 0) return alert("There's no enough budget for this project")

    projects[INDEX].projectBudget -= inputs.projectServiceBudgetInput.value

    projects[INDEX].usedBudget += parseInt(inputs.projectServiceBudgetInput.value) || 0

    let service = {
        serviceName: String(inputs.projectServiceNameInput.value),
        serviceBudget: parseInt(inputs.projectServiceBudgetInput.value),
        serviceDescription: String(inputs.projectServiceDescriptionInput.value),
    }

    if (service.serviceName === "" || service.serviceBudget === null || service.serviceDescription === "") {

        return []

    } else {

        services = projects[INDEX].projectServices

        services.push(service)

        return services
    }
}

const submitButton = document.getElementById('edit-project').addEventListener('click', (event) => {

    event.preventDefault()

    //ERROR MESSAGES
    if (!inputs.projectNameInput) alert("Project Name missing !")
    if (!inputs.projectBudgetInput) alert("Project Budget missing !")
    if (inputs.projectCategoryInput === "none") return alert("Project Category missing !")

    const INDEX = parseInt(localStorage.getItem('INDEX'))

    projects[INDEX].projectName = String(inputs.projectNameInput.value)
    projects[INDEX].projectBudget = parseInt(inputs.projectBudgetInput.value)
    projects[INDEX].projectCategory = String(inputs.projectCategoryInput.value),
        projects[INDEX].projectServices = addService(INDEX) || []
    projects[INDEX].numberOfServices = parseInt(projects[INDEX].projectServices.length)

    localStorage.setItem('projects', JSON.stringify(projects))

    alert(`Project Updated Successfully !`)

    window.location.reload()
})