define(['data-store', 'knockout', 'text!./nav-bar.html'], function(data, ko, template) {

    function NavBarViewModel(params) {
        var self = this;

        // Route for use in the UI
        self.route = params.route;

        // User Details
        self.isLoggedIn = ko.observable(false);
        self.userName = ko.observable();
        self.userImage = ko.observable();
        //User Permissions
        self.allowRelease = ko.observable(false);
        self.allowTracking = ko.observable(false);
        self.allowImages = ko.observable(false);
        self.allowAdminProviders = ko.observable(false);
        self.allowAdminUsers = ko.observable(false);
        self.allowAdminOptions = ko.observable(false);

        // login action for the navBar menu
        self.Login = function() {
            console.log("NAVBAR: login triggered");
            
            self.getUserDetails();
        };

        //update functions
        self.getUserDetails = function() {
            console.log("NAVBAR: getUserDetails");
            // Get user details from the HTML5 data store
            var userID = data.get("com.bskyb.bapps.common.security.userID");
            console.log(userID);


            self.updateVM();
        };

        self.updateVM = function() {

            console.log("NAVBAR: updateVM");
            self.isLoggedIn(true);
            self.userName('Mark Lowe');
            self.userImage('http://lorempixel.com/22/22/people/7');
            self.allowRelease(true);
            self.allowTracking(true);
            self.allowImages(true);
            self.allowAdminProviders(true);
            self.allowAdminUsers(true);
            self.allowAdminOptions(true);
        };

    }

    return { viewModel: NavBarViewModel, template: template };
});
