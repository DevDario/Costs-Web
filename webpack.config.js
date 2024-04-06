const path = require('path');

module.exports = {
    entry: {
        editProjects: './scripts/CRUD/edit.js',
        login: './scripts/userAuth.js',
        newProject: './scripts/CRUD/create.js',
        viewProjects: './scripts/CRUD/RUD.js',
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    mode: 'production',
};
