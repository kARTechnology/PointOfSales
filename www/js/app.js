// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCookies'])

  .run(function($ionicPlatform, $rootScope, $ionicLoading, $http) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    // $http.defaults.headers.get = { '__test' : '021aaf3904816bb056f3cc14a573f9a6	' };

    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br>Loading...'
      });
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    });

  })

 


  .directive('keyboardHandler', function($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        angular.element($window).bind('native.keyboardshow', function() {
          element.addClass('tabs-item-hide');
        });

        angular.element($window).bind('native.keyboardhide', function() {
          element.removeClass('tabs-item-hide');
        });
      }
    };
  })
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
      return {
        request: function(config) {
          $rootScope.$broadcast('loading:show');
          return config;
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide');
          return response;
        }
      };
    });
  })
  .filter('INR', function() {
    return function(input) {
      if (!isNaN(input)) {
        var currencySymbol = '₹';
        //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!
        var result = input.toString().split('.');

        var lastThree = result[0].substring(result[0].length - 3);
        var otherNumbers = result[0].substring(0, result[0].length - 3);
        if (otherNumbers !== '')
          lastThree = ',' + lastThree;
        var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

        if (result.length > 1) {
          output += "." + result[1];
        }

        return currencySymbol + output;
      }
    };
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('tab.products', {
        url: '/products',
        views: {
          'tab-products': {
            templateUrl: 'templates/products.html',
            controller: 'productsCtrl'
          }
        }
      })

      .state('tab.feedback', {
        url: '/feedback',
        views: {
          'tab-feedback': {
            templateUrl: 'templates/feedback.html',
            controller: 'feedbackCtrl'
          }
        }
      })

      .state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'templates/about.html'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/products');
  });
