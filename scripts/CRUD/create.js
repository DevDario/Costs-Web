let projects = []
const createProjectButton = document.getElementById('create-project')

createProjectButton.addEventListener('click', (event) => {

    event.preventDefault()

    const projectDetails = {
        id:projects.length + 1,
        projectName: document.getElementById('project-name').value || null,
        projectBudget: parseInt(document.getElementById('project-budget').value) || null,
        projectCategory: document.getElementById('category').value || null,
        numberOfServices: 0,
        projectServices :[],
        usedBudget: 0,
        projectDeadline: setProjectDeadline(),
    }

    if (!projectDetails.projectName)  alert("Project Name missing !")
    if (!projectDetails.projectBudget)  alert("Project Budget missing !")
    if (projectDetails.projectCategory === "none")  return alert("Project Category missing !")
    if(projectDetails.projectDeadline === false) return 

    projects.push(projectDetails)
    setItensToDB()

    alert("Project Created Successfully !")

})

function setProjectDeadline(){
    
    const deadline = document.getElementById('project-deadline').value
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/
    
    if(deadline.match(dateFormat)){
        //checks if the deadline is a future date
        const currentDate = new Date()

        const selectedDate = new Date(deadline)

        if(selectedDate > currentDate){

            return selectedDate.toLocaleDateString('en-US',{month: 'long', day: 'numeric', year: 'numeric'})
            
        }else{
            alert("Please enter a future date")
            return false
        }

    }else{

        alert("Please enter a valid date in the format YYYY-MM-DD.") 
        return false

    }
}


const setItensToDB = () => localStorage.setItem('projects', JSON.stringify(projects))
const getItensFromDB = () => JSON.parse(localStorage.getItem('projects')) ?? []