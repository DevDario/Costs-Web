const fetchProjects = () => JSON.parse(localStorage.getItem('projects')) ?? []

const projects = fetchProjects()

function loadProjectsBudget(){
    const budgets = []
    projects.map((project)=>{
        budgets.push(project.projectBudget)
    })

    return budgets
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
        labels: ['Budget Spent', 'Projects Created'],
        datasets: [
            {
                label: 'Budget Spent',
                data: loadProjectsBudget(),
                borderWidth: 1,
                backgroundColor: '#72018f',
            },
            {
                label: 'Projects Created',
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