Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    Template.body.helpers({
        tasks: function () {
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    });
    Template.body.events({
        "submit .new-task": function (event) {
            var text = event.target.text.value;
            var color = event.target.color.value;

            Tasks.insert({
                text: text,
                color: color,
                createdAt: new Date()
            });

            event.target.text.value = "";
            event.target.color.value = "black";
            return false;
        }
    });
    Template.task.events({
        "click .toggle-checked": function () {
            Tasks.update(this._id, {$set: {checked: !this.checked}});
        },
        "click .delete": function() {
            Tasks.remove(this._id);
        }
    });
}
