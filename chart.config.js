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

const bCategoryChart = new Chart(charts.budgetPerCategoryChart, {
    type: 'pie',
    data: {
        labels: budgetPerCategoryChartLabels,
        datasets: [{
            data: budgetPerCategoryChartData,
            backgroundColor: [
                '#a61cdf',
                '#181818',
                '#f1df40'
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
    type: 'doughnut',
    data: {
        labels: categoryCountChartLabels,
        datasets: [{
            label: 'Number of Categories',
            data: categoryCountChartData,
            backgroundColor: [
                '#a61cdf',
                '#181818',
                '#f1df40'
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
    type: 'line',
    data: {
        labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        datasets: [
            {
                label: 'Months',
                data: Object.keys(monthsCount),
                borderColor: '#212121',
                backgroundColor: '#f1df40',
                stack: 'combined',
                type: 'bar'
            },
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