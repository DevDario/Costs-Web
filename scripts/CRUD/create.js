let projects = []
const createProjectButton = document.getElementById('create-project')

createProjectButton.addEventListener('click', (event) => {

    event.preventDefault()

    const projectDetails = {
        id:projects.length + 1,
        projectName: document.getElementById('project-name').value || null,
        projectBudget: document.getElementById('project-budget').value || null,
        projectCategory: document.getElementById('category').value || null,
    }

    if (!projectDetails.projectName)  alert("Project Name missing !")
    if (!projectDetails.projectBudget)  alert("Project Budget missing !")
    if (projectDetails.projectCategory === "none")  return alert("Project Category missing !")

    projects.push(projectDetails)
    setItensToDB()

    alert("Project Created Successfully !")

})


const setItensToDB = () => localStorage.setItem('projects', JSON.stringify(projects))
const getItensFromDB = () => JSON.parse(localStorage.getItem('projects')) ?? []