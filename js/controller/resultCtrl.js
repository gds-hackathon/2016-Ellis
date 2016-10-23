angular.module('app').controller('resultCtrl', function ($scope, $state, $stateParams) {
    $scope.msg = 'Message';

    init();

    function init(){
        $scope.msg = $stateParams.msg;
    }
})