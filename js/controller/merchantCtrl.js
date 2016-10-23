angular.module('app').controller('merchantCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$stateParams',
    function ($scope, $http, $state, $filter, appConstants, $stateParams) {
        $scope.name = 'merchantlist';
        $scope.MerchantDetail = MerchantDetail;
        $scope.AddMerchant = ()=>{
            $state.go("adminmerchantmgr");
        };
        $scope.PostData = (id, name) => {
            $state.go('updateitem', { id: id, name: name });
        }
        init();

        function init() {
            console.log('get merchant list');
            $http.get(`${appConstants.BASE_URL}/api/Merchant`)
                .then(
                (resp) => {
                    $scope.data = resp.data;
                    console.log('data loaded');
                },
                (err) => {
                    console.error(err);
                }
                );

                
            $http.get(`${appConstants.BASE_URL}/api/Merchant/data`)
                .then(
                (resp) => {
                    resp.data = JSON.parse(resp.data);
                    // console.log(JSON.parse(resp.data));
                    console.log(resp.data.items);
                    $scope.chartlabels = resp.data.items;
                    $scope.chartdata = resp.data.data;
                    console.log(resp);
                },
                (err) => {
                    console.error(err);
                }
                );

                
            $http.get(`${appConstants.BASE_URL}/api/Merchant/trandata`)
                .then(
                (resp) => {
                    resp.data = JSON.parse(resp.data);
                    // console.log(JSON.parse(resp.data));
                    console.log(resp.data.items);
                    $scope.chartTranlabels = resp.data.items;
                    $scope.chartTrandata = resp.data.data;
                    console.log(resp);
                },
                (err) => {
                    console.error(err);
                }
                );
        };

        //d.id,d.name,d.address,d.phone,d.discount,d.companyPayRate
        function MerchantDetail(id, name, address, phone, discount, companyPayRate) {
            console.log('click');
            $state.go('adminmerchantmgr', { id: id, name: name, address: address,phone:phone, discount: discount, companyPayRate: companyPayRate });
        };

    }])