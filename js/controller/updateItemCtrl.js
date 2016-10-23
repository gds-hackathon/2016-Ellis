angular.module('app')
    .controller('updateItemCtrl', function ($scope, $http, $state, $stateParams, appConstants) {
        $scope.id = $stateParams.id;
        $scope.name = $stateParams.name;

        $scope.UpdateItem = () => {
            console.log('updateItem');
            $http.post(`${appConstants.BASE_URL}/api/Table1`, { id: $scope.id, name: $scope.name });
        }

        function init() {
            $scope.id = $stateParams.id;
            $scope.name = $stateParams.name;
            console.log($scope.name);
        }

        init();
    });