define(['knockout', 'text!./user-preferences-tab.html'], function(ko, templateMarkup) {

  function UserpreferencesTab(params) {
    this.message = ko.observable('Hello from the userPreferences-tab component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  UserpreferencesTab.prototype.dispose = function() { };
  
  return { viewModel: UserpreferencesTab, template: templateMarkup };

});
