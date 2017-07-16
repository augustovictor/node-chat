class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }

    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    removeUser(id) {
        const removedUser = this.getUser(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }

    removeAll() {
        const removedUsers = this.users;
        this.users = [];
        return removedUsers;
    }

    getUserList(room) {
        return this.users.filter(user => user.room === room);
    }

}

module.exports = { Users }