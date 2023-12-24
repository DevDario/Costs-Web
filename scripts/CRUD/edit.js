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


    projectNameLabel.innerHTML = `Project's Name: ${projectInfo.projectName}`
    projectBudgetLabel.innerHTML = `Project's Budget: ${projectInfo.projectBudget},00 U$`
    projectCategoryLabel.innerHTML = `Project's Category: ${projectInfo.projectCategory}`
    projectUsedBudgetLabel.innerHTML = `Budget Used  0,00 U$`

    projectNameInput.value = `${projectInfo.projectName}`
    projectBudgetInput.value = `${projectInfo.projectBudget}`
    projectCategoryInput.value = `${projectInfo.projectCategory}`

}

//when the window loads, this function is called
(
    function () {

        try {

            const INDEX = parseInt(localStorage.getItem('INDEX'))

            let projects = JSON.parse(localStorage.getItem('projects')) ?? []

            if (!projects) {

                alert("You don't have any created projects. Let's create one !")

                window.location.href = `http://127.0.0.1:5500/NewProject/newproject.html`
            }

            let projectToEdit = projects[INDEX]

            fillFields(projectToEdit)


        } catch (IDNotFoundError) {

            alert("You must select a project to edit. We'll take you there.")

            window.location.href = `http://127.0.0.1:5500/ViewProjects/viewprojects.html`

        }

    }
)()

const inputs = {

    projectNameInput: document.getElementById('project-name'),
    projectBudgetInput: document.getElementById('project-budget'),
    projectCategoryInput: document.getElementById('category'),

}

const submitButton = document.getElementById('edit-project').addEventListener('click', (event) => {

    event.preventDefault()

    //EDIT
    if (!inputs.projectNameInput) alert("Project Name missing !")
    if (!inputs.projectBudgetInput) alert("Project Budget missing !")
    if (inputs.projectCategoryInput === "none") return alert("Project Category missing !")

    const index = parseInt(localStorage.getItem('INDEX'))

    let projects = JSON.parse(localStorage.getItem('projects')) ?? []

    projects[index].projectName = inputs.projectNameInput.value
    projects[index].projectBudget = inputs.projectBudgetInput.value
    projects[index].projectCategory = inputs.projectCategoryInput.value

    localStorage.setItem('projects', JSON.stringify(projects))

    alert(`Project Updated Successfully !`)

    window.location.href = "http://127.0.0.1:5500/ViewProjects/viewprojects.html"
})