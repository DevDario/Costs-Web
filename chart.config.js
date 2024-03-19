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

//Charts


//Category chart
const categories = {};
projects.forEach(project => {
    if (project.projectCategory in categories) {
        categories[project.projectCategory] += project.projectBudget;
    } else {
        categories[project.projectCategory] = project.projectBudget;
    }
});

const labels = Object.keys(categories);
const data = Object.values(categories);

const categoryChart = document.getElementById('categoryChart').getContext('2d');
const catChart = new Chart(categoryChart, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: [
                '#181818',
                'rgba(54, 162, 235, 0.5)',
                '#a61cdd'
            ]
        }]
    },
});

//Number of projects chart

const categoriesCount = {};
projects.forEach(project => {
    if (project.projectCategory in categoriesCount) {
        categoriesCount[project.projectCategory]++;
    } else {
        categoriesCount[project.projectCategory] = 1;
    }
});

const labels2 = Object.keys(categoriesCount);
const data2 = Object.values(categoriesCount);

const projectNumberChart = document.getElementById('projectsNumberChart').getContext('2d');
const pNumberChart = new Chart(projectNumberChart, {
    type: 'bar',
    data: {
        labels: labels2,
        datasets: [{
            label: 'Number of Projects',
            data: data2,
            backgroundColor: '#a61cdd95',
            borderWidth: 1
        }]
    },
});