const fetchProjects = () => JSON.parse(localStorage.getItem('projects')) ?? []

const projects = fetchProjects()

const charts = {
    budgetPerCategoryChart: document.getElementById('categoryChart'),
    categoriesCountChart: document.getElementById('categoryCountChart'),
    projectsGraphic: document.getElementById('projectsGraphic'),
}

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

const totalBudget = budgetPerCategoryChartData.reduce((acc,curr)=>acc + curr,0) 
const budgetsInPercentage = budgetPerCategoryChartLabels.map((label,index)=>{
    const percentage = ((budgetPerCategoryChartData[index] / totalBudget) * 100).toFixed(2)
    return `${label} (${percentage}%)`
})

const bCategoryChart = new Chart(charts.budgetPerCategoryChart, {
    type: 'pie',
    data: {
        labels: budgetsInPercentage,
        datasets: [{
            data: budgetPerCategoryChartData,
            backgroundColor: [
                '#a61cdf',
                '#181818',
                '#ce85ff'
            ]
        }]
    },
});

//Categories Count Chart

const categoriesCount = {};
const totalProjects = projects.length

projects.forEach(project => {
    if (project.projectCategory in categoriesCount) {
        categoriesCount[project.projectCategory]++;
    } else {
        categoriesCount[project.projectCategory] = 1;
    }
});

const categoryCountChartLabels = Object.keys(categoriesCount);
const categoryCountChartData = Object.values(categoriesCount);

const categoryCountInPercentage = Object.keys(categoriesCount).map(category=>{
    const percentage = ((categoriesCount[category] / totalProjects) * 100).toFixed(2)
    return `${category} (${percentage}%)`
})

const cCountChart = new Chart(charts.categoriesCountChart, {
    type: 'doughnut',
    data: {
        labels: categoryCountInPercentage,
        datasets: [{
            label: 'Projects with this category',
            data: categoryCountChartData,
            backgroundColor: [
                '#a61cdf',
                '#181818',
                '#ce85ff'
            ],
            borderWidth: 1
        }]
    },
});

//Created Projects per Month Count Chart

const monthsCount = {};
projects.forEach(project => {

    const month = new Date(project.projectDeadline).getMonth().toString()

    if (month in monthsCount) {
        monthsCount[month]++;
    } else {
        monthsCount[month] = 1;
    }
});

const pCountChart = new Chart(charts.projectsGraphic,{
    type: 'bar',
    data: {
        labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        datasets: [
            {
                label: 'Projects Created',
                data: Object.values(monthsCount),
                borderColor: '#212121',
                backgroundColor: '#a61cdf',
                stack: 'combined'
            }
        ]},
    options: {
        plugins: {
        title: {
            display: true,
            text: 'Number of Projects Created on Each Month'
            }
        },
    scales: {
        y: {
                stacked: true
            }
        }
    },
})