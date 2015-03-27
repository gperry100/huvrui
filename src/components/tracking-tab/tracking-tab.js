define(['knockout', 'text!./tracking-tab.html'], function(ko, templateMarkup) {

  function TrackingTab(params) {
    this.message = ko.observable('Hello from the tracking-tab component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  TrackingTab.prototype.dispose = function() { };
  
  return { viewModel: TrackingTab, template: templateMarkup };

});
