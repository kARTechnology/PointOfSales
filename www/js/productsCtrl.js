angular.module('starter.controllers').controller('productsCtrl', function($cookieStore,$scope, $stateParams, $http, API, $ionicPopup, $ionicLoading,$ionicScrollDelegate) {
  $scope.data = {
    search: '',
    products: null
  };



  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
  API.getProducts().success(function(docs) {
    $scope.data.products = docs;
  }).error(function(err) {
    $ionicLoading.hide();
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: JSON.stringify(err || 'Unable to retrive Products')
    });
  });
});
