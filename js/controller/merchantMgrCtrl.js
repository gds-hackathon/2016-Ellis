angular.module('app').controller('merchantMgrCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$stateParams',
    function ($scope, $http, $state, $filter, appConstants, $stateParams) {
        $scope.name = 'merchantlist';
        $scope.PostData = () => {
            $http.post(`${appConstants.BASE_URL}/api/Merchant`,{
                id:$scope.id,
                name:$scope.name,
                address:$scope.address,
                phone:$scope.phone,
                discount:$scope.discount,
                companyPayRate:$scope.companyPayRate
                })
                .then(
                    (resp) => {
                        $state.go('adminmerchant');
                    },
                    (err)=>{
                        console.error(err);
                    }
                );
        }

        init();

        function init() {
            console.log($stateParams);
            $scope.id = $stateParams.id;
            $scope.name = $stateParams.name;
            $scope.address = $stateParams.address;
            $scope.phone = $stateParams.phone;
            $scope.discount = $stateParams.discount;
            $scope.companyPayRate = $stateParams.companyPayRate;
            // $http.get(`${appConstants.BASE_URL}/api/Merchant`)
            //     .then(
            //     (resp) => {
            //         $scope.data = resp.data;
            //         console.log('data loaded');
            //     },
            //     (err) => {
            //         console.error(err);
            //     }
            //     );
        };

        // function MerchantDetail(id) {
        //     $state.go('adminmerchantmgr', { data: { id: id, name: name, address: address, phone: phone, discount: discount, companyPayRate: companyPayRate } })
        // };

    }])