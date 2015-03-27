define(["jquery", "knockout", "chartjs"], function($, ko, Chart) {

    console.log("setting chartjs global options");
    //
    //  BMIT Initialisation for Bindings
    //
    Chart.defaults.global = {
        // Boolean - Whether to animate the chart
        animation: true,

        // Number - Number of animation steps
        animationSteps: 60,

        // String - Animation easing effect
        animationEasing: "easeOutQuart",

        // Boolean - If we should show the scale at all
        showScale: true,

        // Boolean - If we want to override with a hard coded scale
        scaleOverride: false,

        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: null,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        // Number - The scale starting value
        scaleStartValue: null,

        // String - Colour of the scale line
        scaleLineColor: "rgba(0,0,0,.1)",

        // Number - Pixel width of the scale line
        scaleLineWidth: 1,

        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        // Interpolated JS string - can access value
        scaleLabel: "<%=value%>",

        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: false,

        // String - Scale label font declaration for the scale label
        scaleFontFamily: "RobotoDraft",

        // Number - Scale label font size in pixels
        scaleFontSize: 12,

        // String - Scale label font weight style
        scaleFontStyle: "normal",

        // String - Scale label font colour
        scaleFontColor: "#666",

        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: true,

        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,

        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],

        // String - Tooltip background colour
        tooltipFillColor: "rgba(0,0,0,0.8)",

        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: "RobotoDraft",

        // Number - Tooltip label font size in pixels
        tooltipFontSize: 14,

        // String - Tooltip font weight style
        tooltipFontStyle: "normal",

        // String - Tooltip label font colour
        tooltipFontColor: "#fff",

        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: "RobotoDraft",

        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 14,

        // String - Tooltip title font weight style
        tooltipTitleFontStyle: "bold",

        // String - Tooltip title font colour
        tooltipTitleFontColor: "#fff",

        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 6,

        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 6,

        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,

        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 6,

        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,

        // String - Template string for single tooltips
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

        // String - Template string for single tooltips
        multiTooltipTemplate: "<%= value %>",

        // Function - Will fire on animation progression.
        onAnimationProgress: function(){},

        // Function - Will fire on animation completion.
        onAnimationComplete: function(){}
    }

    console.log("loading custom binding handlers");
    //
    //  BMIT Knockout Binding Handlers
    //
    // Chart.JS handler
    ko.bindingHandlers.chartJS = {
            init: function (element, valueAccessor) {
            },
    		update: function(element, valueAccessor) {
        		var currentValue = valueAccessor();
        		switch (currentValue.chartType) {
        			case 'Line':
        				new Chart(element.getContext("2d")).Line(currentValue.chartData, currentValue.chartOptions);
        				break;
        			case 'Bar':
        				new Chart(element.getContext("2d")).Bar(currentValue.chartData, currentValue.chartOptions);
        				break;
        			case 'Radar':
        				new Chart(element.getContext("2d")).Radar(currentValue.chartData, currentValue.chartOptions);
        				break;
        			case 'PolarArea':
        				new Chart(element.getContext("2d")).PolarArea(currentValue.chartData, currentValue.chartOptions);
        				break;
        			case 'Pie':
        				new Chart(element.getContext("2d")).Pie(currentValue.chartData, currentValue.chartOptions);
        				break;
        			case 'Doughnut':
        				new Chart(element.getContext("2d")).Doughnut(currentValue.chartData, currentValue.chartOptions);
        				break;
        			default:
        				alert("Invalid Chart Type");
    		};
    	}
    };

    // Bootstrap modal dialog show/hide binding
    ko.bindingHandlers.showModal = {
            init: function (element, valueAccessor) {
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
    			var show = ko.utils.unwrapObservable(value);
                if (show) {
                    $(element).modal('show');
                    // this is to focus input field inside dialog
                    //$("input", element).focus();
                }
                else {
                    $(element).modal('hide');
                }
            }
        };

    ko.bindingHandlers.fadeVisible = {
        init: function(element, valueAccessor) {
            var shouldDisplay = valueAccessor();
            $(element).toggle(shouldDisplay);
        },
        update: function(element, valueAccessor) {
            var shouldDisplay = valueAccessor();
            shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
        }
    };

    ko.bindingHandlers.jqButton = {
        init: function(element) {
            $(element).button();
        },
        update: function(element, valueAccessor) {
            var currentValue = valueAccessor();
            $(element).button("option", "disabled", currentValue.enable === false);
        }
    };

    ko.bindingHandlers.starRating = {
        init: function(element, valueAccessor) {
            $(element).addClass("starRating");
            for(var i=0; i < 5; i++) {
                $("<span>").appendTo(element);
            }
            $("span", element).each(function(index) {
                $(this).hover(
                    function() { $(this).prevAll().add(this).addClass("hoverChosen") }, 
                    function() { $(this).prevAll().add(this).removeClass("hoverChosen") }                
                ).click(function() { 
                           var observable = valueAccessor();  // Get the associated observable
                           observable(index+1);               // Write the new rating to it
                        });
            });
        },
        update: function(element, valueAccessor) {
            var observable = valueAccessor();
            $("span", element).each(
                function(index) {
                    $(this).toggleClass("chosen", index < observable());
                }
            );
        }

    };

});