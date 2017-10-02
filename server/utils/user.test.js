const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.usersArray = [{
      id: 1,
      name: 'A',
      room: 'Fun'
    }, {
      id: 2,
      name: 'B',
      room: 'Study'
    }, {
      id: 3,
      name: 'C',
      room: 'Fun'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 1,
      name: 'D',
      room: '1'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.usersArray).toEqual([user]);
  });

  it('should return the names for the room Fun', () => {
    var userList = users.getUserList('Fun');
    expect(userList).toEqual(['A', 'C']);
  });

  it('should return the names for the room Study', () => {
    var userList = users.getUserList('Study');
    expect(userList).toEqual(['B']);
  });

  it('should find a user', () => {
    var userId = 2;
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    var userId = 99;
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should remove a user', () => {
    var userId = 1;
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.usersArray.length).toBe(2);
  });
});
