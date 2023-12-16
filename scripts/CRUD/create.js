let projects = []
const createProjectButton = document.getElementById('create-project')

createProjectButton.addEventListener('click', (event) => {

    event.preventDefault()

    const projectDetails = {
        projectName: document.getElementById('project-name').value || null,
        projectBudget: document.getElementById('project-budget').value || null,
        projectCategory: document.getElementById('category').value || null,
    }

    if (!projectDetails.projectName)  alert("Project Name missing !")
    if (!projectDetails.projectBudget)  alert("Project Budget missing !")
    if (!projectDetails.projectCategory !== "none")  return alert("Project Category missing !")

    projects.push(projectDetails)
    setItensToBD()

    alert("Project Created Successfully !")

})


const setItensToBD = () => localStorage.setItem('projects', JSON.stringify(projects))
const getItensFromBD = () => JSON.parse(localStorage.getItem('projects')) ?? []