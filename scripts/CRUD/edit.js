function fillFields(projectInfo) {
    //labels
    const projectNameLabel = document.getElementById('project-name-description')
    const projectBudgetLabel = document.getElementById('project-budget-description')
    const projectCategoryLabel = document.getElementById('project-category-description')
    //const projectUsedBudgetLabel = document.getElementById('project-usedbudget-description')

    //inputs
    const projectNameInput = document.getElementById('project-name')
    const projectBudgetInput = document.getElementById('project-budget')
    const projectCategoryInput = document.getElementById('category')


    projectNameLabel.innerHTML = `Project's Name: ${projectInfo.projectName}`
    projectBudgetLabel.innerHTML = `Project's Budget: ${projectInfo.projectName}`
    projectCategoryLabel.innerHTML = `Project's Category: ${projectInfo.projectName}`
    //projectUsedBudgetLabel.innerHTML = `Budget Used  ${projectInfo.projectName}`

    projectNameInput.value = `${projectInfo.projectName}`
    projectBudgetInput.value = `${projectInfo.projectBudget}`
    projectCategoryInput.value = `${projectInfo.projectCategory}`

}


(
    function () {

        try {

            const ID = parseInt(localStorage.getItem('PRID'))

            let projects = JSON.parse(localStorage.getItem('projects')) ?? []

            if (!projects) {

                alert("You don't have any created projects. Let's create one !")

                window.location.href = `http://127.0.0.1:5500/NewProject/newproject.html`
            }

            let projectToEdit = projects[ID]

            fillFields(projectToEdit)


        } catch (IDNotFoundError) {

            alert("You must select a project to edit")

            let response = confirm("We'll take you there, OK ?")

            if (!response) {
                return ''
            } else {
                window.location.href = `http://127.0.0.1:5500/ViewProjects/viewprojects.html`
            }

            throw new Error(IDNotFoundError)
        }

    }
)()