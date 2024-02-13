const path = require('path');

let fs = require('fs');

const getData = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname,'../data/users.json'), 'utf-8'));
}

const findAll = () => {
    return getData();
}

const findByPk = (id) => {
    let allUsers = findAll();
    let userFound = allUsers.find(oneUser => oneUser.id === id);
    return userFound;
}

const findByField = (field, text) => {
    let allUsers = findAll();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
}

const create = (userData) => {
    let allUsers = findAll();
    let newUser = {
        id: generateId(),
        ...userData
    }
    allUsers.push(newUser);
    fs.writeFileSync(path.join(__dirname,'../data/users.json'), JSON.stringify(allUsers, null, ' '));
    return newUser;
}

const generateId = () => {
    let allUsers = findAll();
    let lastUser = allUsers.pop();
    if (lastUser){
        return lastUser.id + 1;
    }
    return 1;
}

const deleteUser = (id) => {
    let allUsers = findAll();
    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
    fs.writeFileSync(path.join(__dirname,'../data/users.json'), JSON.stringify(finalUsers, null, ' '));
}

module.exports = {getData, findAll, findByPk, findByField, create, generateId, deleteUser};