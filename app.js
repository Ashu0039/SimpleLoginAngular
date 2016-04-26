angular.module('akonet', [])
  .controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.login = function() {
      var mobileNum = $scope.mobileNumber;
      var pwd = $scope.password;

      var data = {
        "mobile" : mobileNum,
        "pwd" : pwd
      };
      $scope.responseMessage = "";

      $http.post("http://api.akonect.com:3010/auth/web-login", data)
        .then(function(response){
          var responseData = response.data;
          if(responseData.err) {
            $scope.responseMessage = responseData.err;
            console.error(responseData.err);
          }

        }, function(error) {
          console.error(error);
        })

    };
  }]);
