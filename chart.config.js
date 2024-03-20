const fetchProjects = () => JSON.parse(localStorage.getItem('projects')) ?? []

const projects = fetchProjects()

const charts = {
    budgetPerCategoryChart: document.getElementById('categoryChart'),
    categoriesCountChart: document.getElementById('projectsNumberChart')
}

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

//Charts


//Budget per category chart
const categories = {};
projects.forEach(project => {
    if (project.projectCategory in categories) {
        categories[project.projectCategory] += project.projectBudget;
    } else {
        categories[project.projectCategory] = project.projectBudget;
    }
});

const budgetPerCategoryChartLabels = Object.keys(categories);
const budgetPerCategoryChartData = Object.values(categories);

const bCategoryChart = new Chart(charts.budgetPerCategoryChart, {
    type: 'pie',
    data: {
        labels: budgetPerCategoryChartLabels,
        datasets: [{
            data: budgetPerCategoryChartData,
            backgroundColor: [
                '#181818',
                'rgba(54, 162, 235, 0.5)',
                '#a61cdd'
            ]
        }]
    },
});

//Categories Count Chart

const categoriesCount = {};
projects.forEach(project => {
    if (project.projectCategory in categoriesCount) {
        categoriesCount[project.projectCategory]++;
    } else {
        categoriesCount[project.projectCategory] = 1;
    }
});

const categoryCountChartLabels = Object.keys(categoriesCount);
const categoryCountChartData = Object.values(categoriesCount);

const cCountChart = new Chart(charts.categoriesCountChart, {
    type: 'bar',
    data: {
        labels: categoryCountChartLabels,
        datasets: [{
            label: 'Number of Categories',
            data: categoryCountChartData,
            backgroundColor: '#a61cdd95',
            borderWidth: 1
        }]
    },
});