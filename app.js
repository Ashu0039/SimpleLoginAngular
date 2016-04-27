var app = angular.module('akonet', []);
app.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
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
          } else {
            $scope.responseMessage = "Error: Unknown response from server.";
          }
        }, function(error) {
          console.error(error);
        })

    };
  }]);
  
  app.controller('MessageCtrl', ['$scope', function($scope) {
    $scope.messageList = [];
    
    var messageBox = document.getElementById("messageBox");
    messageBox.bind('keyup', function(e) {
      if(e.keyCode === 13) {
        sendMessage();
      }
    });
    
    var sendBtn = document.getElementById("sendBtn");
    sendBtn.onclick = sendMessage();
    
    function sendMessage() {
      var msgBox = document.getElementById("messageBox");
      var message = msgBox.value;
      akonectSocket.emit("send_msg", {"msg_type" : "CHAT", "txt" : message, "to_uid" : user.uid});
      msgBox.value = "";
    }
  }]);
