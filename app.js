var app = angular.module('akonet', []);

app.controller('loginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
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
          if(responseData.status === 99 ) {
            $scope.responseMessage = responseData.err;
            console.error(responseData.err);
          } else if(responseData.status === 1) {
            $scope.responseMessage = "Welcome " + responseData.name + " to chat!!";
            console.log($window.location);
            $window.location.href = '/Users/Demo/Desktop/Angular/SimpleLoginAngular/chat.html';
            console.log("Login successful!!");
          } else {
            $scope.responseMessage = "Error: Unknown response from server.";
          }
        }, function(error) {
          console.error(error);
        })

    };
  }]);

  app.controller('messageCtrl', ['$scope', function($scope) {
    console.log("Inside controller");
    $scope.messageList = [];

    $scope.sendMessage = function() {
      var message = $scope.msgBox;
      console.log("Sending a message: ", message);
      akonectSocket.emit("send_msg", {"msg_type" : "CHAT", "txt" : message, "to_uid" : user.uid});
      $scope.msgBox = "";
    }
  }]);
