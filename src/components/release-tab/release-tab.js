define(['knockout', 'text!./release-tab.html'], function(ko, templateMarkup) {

  function availabilityCriteriaRequest(dateFrom, dateTo, isReleased, userID) {

    this.availFrom = dateFrom;
    this.availTo = dateTo;
    this.released = isReleased;
    this.userID = userID;
  }

  var host = process.env.HUVR_BACKEND || "localhost";
  var port = process.env.HUVR_BACKEND_PORT || 3000;
  var baseUrl = "http://" + host + ":" + port;

  var criteriaResponse = {};
  var resultsResponse = {};
  var resultsTableArray = [];
  var resultsCapabilitiesArray = [];

  function ReleaseTab(params) {
    console.log("release INIT");
    $.material.init();

    var self = this;

    self.message = ko.observable('Please search for something');
    self.criteriaDateFrom = ko.observable();
    self.criteriaDateTo = ko.observable();
    self.criteriaIsReleased = ko.observable(false);

    self.tableContents = ko.observableArray(resultsTableArray);
    self.capabilityContents = ko.observableArray(resultsCapabilitiesArray);

    self.doSearch = function(){

      self.message('Search in progress...');
      $.ajax({
        type: 'POST',
        url: baseUrl + '/release/avail',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(new availabilityCriteriaRequest( self.criteriaDateFrom(), self.criteriaDateTo(), self.criteriaIsReleased(), 'lowema'))
      })
      .done(function( json ) {
          // got a 200 response with user packet
          console.log( 'json received');
          //update the APPVM
          criteriaResponse = json;
          self.getResults();
      })
      .fail(function( jqxhr, textStatus, error ) {
          // got an error response
          var err = textStatus + ", " + error;
          console.log( "Request Failed: " + err );
          // update an empty array
          criteriaResponse = {};
      });

    };

    self.getResults = function() {

        self.message('Getting results.');
        $.ajax({
          type: 'GET',
          url: baseUrl + '/release/availResult',
          contentType: "application/json",
          dataType: "html",
          data: { pageFrom: 0, pageTo: 50, userID : criteriaResponse.userID } 
        })
        .done(function( json ) {
            // got a 200 response with user packet
            console.log( 'json received');
            //update the APPVM
            resultsResponse = JSON.parse(json);
            self.updateVM();
        })
        .fail(function( jqxhr, textStatus, error ) {
            // got an error response
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
            // update an empty array
            resultsResponse = {};
        });

    };

    self.updateVM = function() {

      self.tableContents.removeAll();
      for(var i = 0; i < resultsResponse.results.length; i++) {
        var capabilities = [];
        for(var c in resultsResponse.results[i].titleCapabilities) {
          capabilities.push({
                              desc: resultsResponse.results[i].titleCapabilities[c].desc,
                              icon: resultsResponse.results[i].titleCapabilities[c].icon
                            });
        };
        self.tableContents.push({
                                provider: resultsResponse.results[i].titleProvider,
                                id: resultsResponse.results[i].titleID,
                                type: resultsResponse.results[i].titleType,
                                title: resultsResponse.results[i].titleDesc,
                                info: resultsResponse.results[i].titleInfo,
                                afrom: resultsResponse.results[i].titleLicenseFrom.split("T",1),
                                ato: resultsResponse.results[i].titleLicenseTo.split("T",1),
                                rel: "No",
                                caps: capabilities
                              });
      };
      self.message('Results ready.');
    };
  };

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ReleaseTab.prototype.dispose = function() {

  };
  
  return { viewModel: ReleaseTab, template: templateMarkup };

});
