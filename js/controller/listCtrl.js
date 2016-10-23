angular.module('app').controller('listCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$stateParams',
    function ($scope, $http, $state, $filter, appConstants, $stateParams) {
        $scope.name = 'list';
        // $scope.data = [{ id: 1, name: 'et1' }, { id: 2, name: 'et2' }];

        $scope.PostData = (id, name) => {
            $state.go('updateitem', { id: id, name: name });
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