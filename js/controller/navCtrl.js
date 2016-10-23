angular.module('app').controller('navCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$localStorage',
    function ($scope, $http, $state, $filter, appConstants, $localStorage) {
        $scope.name = 'list';
        // $scope.data = [{ id: 1, name: 'et1' }, { id: 2, name: 'et2' }];

        $scope.logout = (id, name) => {
            $localStorage.token = '';
            $state.go('token');
        }

        function init() {
            $scope.name = 'List show';
            $http.get(`${appConstants.BASE_URL}api/table1`)
                .then(
                (resp) => {
                    $scope.data = resp.data;
                    console.log('data loaded');
                },
                (err) => {
                    console.log(err);
                }
                );
        };


        init();
    }])