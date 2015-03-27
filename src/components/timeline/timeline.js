define(['knockout', 'text!./timeline.html'], function(ko, templateMarkup) {

  function Timeline(params) {
    this.message = ko.observable('Hello from the timeline component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Timeline.prototype.dispose = function() { };
  
  return { viewModel: Timeline, template: templateMarkup };

});
