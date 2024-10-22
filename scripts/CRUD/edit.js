let projects = []
let services = []
let projectToEdit = {}
const POSITION = localStorage.getItem("POSITION")
const servicesArea = document.getElementById("services-root")
const conditionalMessage = document.getElementById('conditional')
const apiBaseURL = "http://localhost:8081"

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

    // gets the id of the project to use it on the request URL
    const projectID = localStorage.getItem('PRID')

    fetch(`${apiBaseURL}/project/${projectID}/service/services/${id}`,{
        method:"DELETE"
    })
    //.then((response)=> response.json())
    .then((data)=> {

        if(data.ok){
            alert("Service was deleted")

            // redirecting user to editing page
            window.location.href = "http://127.0.0.1:3333/ViewProjects/viewprojects.html"

        }else{
            alert("We couldnt delete this service. Try to reload and try again.")
        }

        //debugging
        console.log(`${data.message}`)
    })
    .catch((error)=> console.error(`${error.text}`))


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


function addService() {

    // gets the id of the project to use it on the request URL
    const projectID = localStorage.getItem('PRID')

    const service = {
        name: String(inputs.projectServiceNameInput.value),
        budget: parseInt(inputs.projectServiceBudgetInput.value),
        description: String(inputs.projectServiceDescriptionInput.value),
    }

    if (service.serviceName === "" || service.serviceBudget === null || service.serviceDescription === "") {

        alert("You need to fill out all fields !")

    } else {

        fetch(`${apiBaseURL}/project/${projectID}/services/new`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(service)
        })
        .then((response)=>{

            if(response.ok){
                alert("New service Added")
                
                // redirecting user to view projects page
                window.location.href = "http://127.0.0.1:3333/ViewProjects/viewprojects.html"

            }else{

                if(response.status===400){
                    alert(`${response.text}`)    
                }

                alert("We couldnt create the service. Try to reload the page and try again")

                console.log(response.text)
            }
        })
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

    fetch(`${apiBaseURL}/project/edit/${projectID}`,{
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

const addServiceButton = document.getElementById('add-service').addEventListener('click', (event)=>{
    event.preventDefault()

    addService()
})