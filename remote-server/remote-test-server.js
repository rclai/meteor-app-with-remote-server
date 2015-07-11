if (Meteor.isServer) {
  Meteor.startup(function () {
    // Creating one test account
    if (! Meteor.users.findOne()) {
      Accounts.createUser({
        username: 'bob',
        password: 'test'
      });
    }
  });

  Meteor.publish('test', function () {
    if (this.userId) {
      this.added('test', 'test', { data: 'You will see this if you are logged in!' });
    }
    this.ready();
  });
}
