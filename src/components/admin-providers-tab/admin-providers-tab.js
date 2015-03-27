define(['knockout', 'text!./admin-providers-tab.html'], function(ko, templateMarkup) {

  function AdminprovidersTab(params) {
    this.message = ko.observable('Hello from the adminProviders-tab component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  AdminprovidersTab.prototype.dispose = function() { };
  
  return { viewModel: AdminprovidersTab, template: templateMarkup };

});
