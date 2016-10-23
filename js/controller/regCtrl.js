angular.module('app').controller('regCtrl', ['$scope', '$http', '$state', 'appConstants', function ($scope, $http, $state, appConstants) {
    $scope.UserName = 'username';
    $scope.Password = 'Password_1';
    $scope.ConfirmPassword = 'Password_1';
    $scope.Register = () => {
        var regData = {
            Email: $scope.UserName,
            Password: $scope.Password,
            ConfirmPassword: $scope.ConfirmPassword
        }
        console.log(regData);
        $http.post(`${appConstants.BASE_URL}/api/account/Register`, regData)
            .then(
            (resp) => {
                $state.go('token');
            },
            (err) => {
                console.log('error=============>');
                console.log(err);
            }
            );
    }
}])