angular.module('starter.controllers').controller('feedbackCtrl', function($scope, $stateParams, $http, API, $ionicPopup, $ionicLoading) {
  $scope.data = {
    name: "",
    phone: "",
    feedback: ""
  };
  $scope.sendFeedback = function() {
    API.sendFeedback($scope.data.name, $scope.data.phone, $scope.data.feedback).success(function(docs) {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Feedback Sent!'
      });
      $scope.data = {
        name: null,
        phone: null,
        feedback: null
      };
    }).error(function(err) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: JSON.stringify(err || 'Unable to send Feedback')
      });

    });
  };
});
