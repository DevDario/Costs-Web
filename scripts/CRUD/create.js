let projects = []
const createProjectButton = document.getElementById('create-project')
const apiBaseURL = "http://localhost:8081"

createProjectButton.addEventListener('click', (event) => {

    event.preventDefault()

    const projectDetails = {
        name: String(document.getElementById('project-name').value),
        budget: parseInt(document.getElementById('project-budget').value),
        category: String(document.getElementById('category').value),
        usedBudget: 0.0,
        deadline: setProjectDeadline(),
    }

    if (!projectDetails.name) alert("Project Name missing !")
    if (!projectDetails.budget) alert("Project Budget missing !")
    if (projectDetails.category === "none") return alert("Project Category missing !")
    if (projectDetails.deadline === false) return

    fetch(`${apiBaseURL}/project/new`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(projectDetails),
        credentials: 'include'
    })
        .then((response) => {
            if (response.ok) {
                alert("Project Created Successfully !")

                // redirecting user to view projects page
                window.location.href = "http://localhost:3333/ViewProjects/viewprojects.html"
            } else {
                alert("We couldnt create your project. Try to reload and submit again")

                if (response.status === 400) {
                    console.log(`something went sounth ! -> ${response.message}`)
                }

                console.log(`Error -> ${response.message}`)
            }
        })
        .catch((error) => {
            console.error(`Catched this -> ${error}`)
        })

})

function setProjectDeadline() {

    const deadline = document.getElementById('project-deadline').value
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/

    if (deadline.match(dateFormat)) {
        //checks if the deadline is a future date
        const currentDate = new Date()

        const selectedDate = new Date(deadline)

        if (selectedDate > currentDate) {

            return selectedDate.toISOString().replace('Z', '+00:00');

        } else {
            alert("Please enter a future date")
            return false
        }

    } else {

        alert("Please enter a valid date in the format YYYY-MM-DD.")
        return false

    }
}


const setItensToDB = () => localStorage.setItem('projects', JSON.stringify(projects))
const getItensFromDB = () => JSON.parse(localStorage.getItem('projects')) ?? []