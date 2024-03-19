const fetchProjects = () => JSON.parse(localStorage.getItem('projects')) ?? []

const projects = fetchProjects()

function loadProjectsBudget(){
    const budgets = []
    projects.map((project)=>{
        budgets.push(project.projectBudget)
    })

    return budgets
}

function loadTotalBudget(){
    const totalBudget = 0
    projects.map((project)=>{
        totalBudget += project.projectBudget
    })

    return totalBudget
}

function createdProjects(){
    let projects = fetchProjects()

    return projects.length
}

function loadProjectsUsedBugdet(){
    const usedBudgets = []
    projects.map((project)=>{
        usedBudgets.push(project.usedBudget)
    })

    return usedBudgets
}


const ctx = document.getElementById('budgetChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Lowest Budget', 'Highest Budget'],
        datasets: [
            
            {
                label: 'Highest Budget',
                data: loadProjectsBudget(),
                borderWidth: 1,
                backgroundColor: '#181818',
            }
        ]
    },
    options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
    }
})