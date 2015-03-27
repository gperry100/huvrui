define(['knockout', 'text!./images-tab.html'], function(ko, templateMarkup) {

  function ImagesTab(params) {
    this.message = ko.observable('Hello from the images-tab component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ImagesTab.prototype.dispose = function() { };
  
  return { viewModel: ImagesTab, template: templateMarkup };

});
