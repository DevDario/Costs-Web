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

const chartData = {
    labels: ['Budget Spent', 'Projects Created'],
    datasets: [
        {
            label: 'Budget Spent',
            data: loadProjectsUsedBugdet(),
            borderWidth: 1,
            backgroundColor: '#72018f'
        },
        {
            label: 'Projects Created',
            data: [2, 10, 5, 9, 13, 3],
            borderWidth: 1,
            backgroundColor: '#181818'
        }
]
}

const config = {
    type: 'line',
    data: {chartData},
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        
    },
    plugins: []
}

new Chart(ctx,config)