define(['knockout', 'text!./admin-users-tab.html'], function(ko, templateMarkup) {

  function AdminusersTab(params) {
    this.message = ko.observable('Hello from the adminUsers-tab component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  AdminusersTab.prototype.dispose = function() { };
  
  return { viewModel: AdminusersTab, template: templateMarkup };

});
