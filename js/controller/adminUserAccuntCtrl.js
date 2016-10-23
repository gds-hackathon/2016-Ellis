angular.module('app').controller('adminUserAccuntCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$stateParams',
    function ($scope, $http, $state, $filter, appConstants, $stateParams) {
        $scope.name = 'list';
        $scope.userAccount;
        $scope.GotoUserTran = GotoUserTran;

        function init() {
            $scope.name = 'List show';
            $http.get(`${appConstants.BASE_URL}/api/UserAccount/AllAccount`)
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


        function GotoUserTran(email){
            $state.go('adminUserTrans',{email:email});
        };
    }])