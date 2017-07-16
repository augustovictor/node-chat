const Guid = require('guid');
const { Users } = require('../utils/users');

const mockUsers = [
    { id: Guid.raw(),  name: 'User 1', room: 'A' },
    { id: Guid.raw(),  name: 'User 2', room: 'A' },
    { id: Guid.raw(),  name: 'User 3', room: 'B' },
    { id: Guid.raw(),  name: 'User 4', room: 'C' },
    { id: Guid.raw(),  name: 'User 5', room: 'C' },
];

const populateUsers = (usersEntity) => {
    mockUsers.forEach(user => usersEntity.addUser(user));
};

module.exports = { mockUsers, populateUsers };