let projects = []
let services = []
let projectToEdit = {}
const POSITION = localStorage.getItem("POSITION")
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

    projectInfo.services.map((service) => {
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
                                <button onclick="deleteService(${service.id})" class="button">Delete <img src="../../images/delete-icon.png" alt="delete icon" /> </button>
                            </div>
                        </div> 
                    </div>
                </div>
            `
    });

}


function deleteService(id) {

    //const INDEX = parseInt(localStorage.getItem('INDEX'))

    //projects[INDEX].projectBudget += projects[INDEX].projectServices[index].serviceBudget

    //projects[INDEX].usedBudget -= projects[INDEX].projectServices[index].serviceBudget

    //projects[INDEX].projectServices.splice(index, 1)

    //projects[INDEX].numberOfServices -= 1

    //localStorage.setItem('projects', JSON.stringify(projects))

    fetch(`http://localhost:8080/project/${PRID}/service/services/${id}`,{
        method:"DELETE"
    })
    .then((response)=> response.json())
    .then((data)=> console.log(`${data.message}`))
    .catch((error)=> console.error(`${error.text}`))

    //window.location.reload()

}


// loads data about the selected project and fill all form inputs
(
    function () {

        projects = JSON.parse(localStorage.getItem('projects')) ?? []

        projectToEdit = projects[POSITION]

        // storing the real id of the project, not his position on the 'projects' array
        localStorage.setItem('PRID',projectToEdit.id)

        fillFields(projectToEdit)

        renderServices(projectToEdit)

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

    // gets the id of the project to use it on the request URL
    const projectID = localStorage.getItem('PRID')

    //ERROR MESSAGES
    if (!inputs.projectNameInput) alert("Project Name missing !")
    if (!inputs.projectBudgetInput) alert("Project Budget missing !")
    if (inputs.projectCategoryInput === "none") return alert("Project Category missing !")

    const body = {
        name: inputs.projectNameInput.value,
        budget: parseInt(inputs.projectBudgetInput.value),
        //TODO: get the selected category from html
        category: projectToEdit.category,
    }

    fetch(`http://localhost:8080/project/edit/${projectID}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body),
    })
    .then((response)=>{

        if(response.ok){

            alert(`Project Updated Successfully !`)

        }else{
            alert("We couldnt update your project. Try to reload the page")

            console.log(`Error Trying to Update -> ${response.text()}`)
        }
    })
})