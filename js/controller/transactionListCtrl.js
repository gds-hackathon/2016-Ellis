angular.module('app').controller('transactionListCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$stateParams',
    function ($scope, $http, $state, $filter, appConstants, $stateParams) {
        $scope.name = 'list';
        $scope.PostData = (id, name) => {
            $state.go('updateitem', { id: id, name: name });
        }

        $scope.userAccount;

        function init() {
            $scope.name = 'List show';
            $http.get(`${appConstants.BASE_URL}/api/Transaction`)
                .then(
                (resp) => {
                    $scope.data = resp.data;
                    console.log('data loaded');
                },
                (err) => {
                    console.error(err);
                }
                );

            $http.get(`${appConstants.BASE_URL}/api/UserAccount`)
                .then(
                (resp) => {
                    $scope.userAccount = resp.data;
                    console.log('user data loaded');
                },
                (err) => {
                    console.error(err);
                }
                );
        };
        init();
    }])