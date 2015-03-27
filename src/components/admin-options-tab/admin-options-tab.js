define(['knockout', 'text!./admin-options-tab.html'], function(ko, templateMarkup) {

  function AdminoptionsTab(params) {
    this.message = ko.observable('Hello from the adminOptions-tab component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  AdminoptionsTab.prototype.dispose = function() { };
  
  return { viewModel: AdminoptionsTab, template: templateMarkup };

});
