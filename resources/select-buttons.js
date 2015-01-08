/********************************************************************
      Config
*********************************************************************/

var config = {
    class: 'btn',
    select: {
      remove: 'btn-success',
      add: 'btn-primary'
    },
    icon: 'mdi-action-done'
};



/********************************************************************
      Helpers
*********************************************************************/

Template.selectButtons.helpers({
  icon: config.icon,
  class: config.class
});



/********************************************************************
      Select Buttons functions
*********************************************************************/

function select_handler(btn, t) {
  //deselect all
  t.$('button').toggleClass(config.select.add, false).toggleClass(config.select.remove, true);
  t.$('i').hide();

  if (btn) {
    //select selected
    var $btn = $(btn).toggleClass(config.select.remove).toggleClass(config.select.add);
    $btn.next().children('i').show();
    t.$('input').val($btn.data('value'));
  }
}


/********************************************************************
      Events
*********************************************************************/

Template.selectButtons.events({
  'click button': function(e, t) {
    select_handler(e.currentTarget, t);
  }
});


/********************************************************************
    Template Callbacks
*********************************************************************/

Template.selectButtons.rendered = function () {
  var t = this;

  if (t.data && t.data.value) {
    t.$('button').each(function () {
      if ($(this).data('value') === t.data.value) {
        select_handler(this, t);
      }
    });
  } else {
    select_handler(null, t);
  }
};