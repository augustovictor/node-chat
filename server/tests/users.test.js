const expect = require('expect');
const { Users } = require('../utils/users');
const { mockUsers, populateUsers } = require('./seed');


describe('Users', () => {
    const users = new Users();
    
    beforeEach(() => {
        users.removeAll();
        mockUsers.forEach(user => users.addUser(user.id, user.name, user.room));
    });
    
    it('should create a user', () => {
        const addedUser = users.addUser(mockUsers[0].id, mockUsers[0].name, mockUsers[0].room);
        expect(addedUser).toInclude(mockUsers[0]);
    });

    it('should return user with given id', () => {
        const addedUser = users.addUser(mockUsers[0].id, mockUsers[0].name, mockUsers[0].room);
        const foundUser = users.getUser(addedUser.id);
        expect(foundUser).toInclude(mockUsers[0]);
        expect(foundUser).toEqual(addedUser);
    });

    it('should remove user by id', () => {
        const addedUser = users.addUser(mockUsers[0].id, mockUsers[0].name, mockUsers[0].room);
        const removedUser = users.removeUser(addedUser.id);
        expect(removedUser).toEqual(addedUser);
    });

    it('should return an array of users', () => {
        const allUsers = users.getUserList(mockUsers[0].room);
        expect(allUsers).toBeA('array');
        expect(allUsers.length).toBe(2);
        expect(allUsers).toNotInclude(mockUsers[2]);
    });
})