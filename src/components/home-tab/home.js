define(["knockout", "text!./home.html"], function(ko, homeTemplate) {

  function HomeViewModel(route) {
    var self=this;

    self.message = ko.observable('Welcome to Luxury VOD !');
    self.newTwenty = ko.observableArray();
    self.followedAssets = ko.observableArray();

    self.doughnutOptions = ko.observable(
      {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 60,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      }
    );

    self.doughnutProvider = ko.observable([
        {
          value : 30,
          color :"#F7464A",
          label : "Sky Sports"
        },
        {
          value : 50,
          color : "#46BFBD",
          label : "Sky Atlantic"
        },
        {
          value : 100,
          color : "#ABEEFD",
          label : "Sky One"
        },
        {
          value : 40,
          color : "#949FB1",
          label : "Sky News"
        },
        {
          value : 120,
          color : "#4D5360",
          label : "Sky Movies"
        }
      ]);

    self.doughnutType = ko.observable([
        {
          value : 30,
          color :"#F7464A",
          label : "Sports"
        },
        {
          value : 150,
          color : "#BEEFFF",
          label : "Entertainment"
        },
        {
          value : 40,
          color : "#949FB1",
          label : "News"
        },
        {
          value : 120,
          color : "#4D5360",
          label : "Movies"
        }
      ]);

      self.doughnutStatus = ko.observable([
        {
          value : 30,
          color :"#0000FF",
          label : "Queued"
        },
        {
          value : 150,
          color : "#00FF00",
          label : "In Progress"
        },
        {
          value : 8,
          color : "#949FB1",
          label : "QC Quarantine"
        },
        {
          value : 90,
          color : "#FF0000",
          label : "Failed"
        }
      ]);

    self.doSomething = function() {
      self.message('You invoked doSomething() on the viewmodel.');
    };

  };

  return { viewModel: HomeViewModel, template: homeTemplate };

});
