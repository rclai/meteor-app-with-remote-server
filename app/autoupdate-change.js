if (Meteor.isClient) {
  Test = new Mongo.Collection('test');

  Meteor.subscribe('test')

  Template.hello.helpers({
    test: function () {
      return Test.findOne();
    }
  });

  Template.hello.events({
    'click button.login': function () {
      Meteor.loginWithPassword('bob', 'test');
    },
    'click button.logout': function () {
      Meteor.logout();
    }
  });

}
