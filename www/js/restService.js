angular.module('starter').factory('API', function($http) {
//*********************************************//
  var base = 'http://ecourses.aec.edu.in/pos/';
//*********************************************//

  return {
    getProducts: function() {
      return $http.get(base + 'getproducts.php', {
        method: 'GET'
      });
    },
    sendFeedback: function(name, phone, feedback) {
      return $http.get(base + 'feedback.php', {
        method: 'GET',
           params: {
          "name": name,
          "phone": phone,
          "feedback": feedback
        }
      });
    }
  };
});
