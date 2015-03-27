define([
          'jquery', 
          'knockout', 
          './router',
          'knockout-custom', 
          'material'
        ], 
  function($, ko, router, koCustom, material) {

    console.log('material init');
    $.material.init();

    console.log('KO Component registrations');
    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
    ko.components.register('home-tab', { require: 'components/home-tab/home' });

    // ... or for template-only components, you can just point to a .html file directly:
    ko.components.register('about-tab', {
      template: { require: 'text!components/about-tab/about.html' }
    });

    ko.components.register('release-tab', { require: 'components/release-tab/release-tab' });
    ko.components.register('tracking-tab', { require: 'components/tracking-tab/tracking-tab' });
    ko.components.register('images-tab', { require: 'components/images-tab/images-tab' });
    ko.components.register('adminProviders-tab', { require: 'components/admin-providers-tab/admin-providers-tab' });
    ko.components.register('adminUsers-tab', { require: 'components/admin-users-tab/admin-users-tab' });
    ko.components.register('adminOptions-tab', { require: 'components/admin-options-tab/admin-options-tab' });
    ko.components.register('userPreferences-tab', { require: 'components/user-preferences-tab/user-preferences-tab' });

    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
    console.log('apply ko bindings');
    ko.applyBindings({ route: router.currentRoute });
  }
);