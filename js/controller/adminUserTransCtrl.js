angular.module('app').controller('adminUserTransCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$stateParams',
    function ($scope, $http, $state, $filter, appConstants, $stateParams) {
        $scope.name = 'list';
        $scope.userAccount;

        function init() {
            $scope.name = 'List show';
            $scope.email = $stateParams.email;
            console.log($stateParams);
            $http.post(`${appConstants.BASE_URL}/api/UserAccount/UserTransaction`,{email:$scope.email})
                .then(
                (resp) => {
                    $scope.data = resp.data;
                    console.log('data loaded');
                },
                (err) => {
                    console.error(err);
                }
                );
        };
        init();
    }])