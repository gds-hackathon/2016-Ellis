 var app = angular.module('app',['ui.router','ngStorage','smart-table','chart.js']);

 angular.module('app').constant('appConstants',{
     BASE_URL:'http://localhost:3237/'
    });

angular.module('app').value('appVal',{
    token:''
});

angular.module('app').factory('authInterceptor', function ($rootScope, $q, $window, $location, $injector) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = `Bearer ${$window.sessionStorage.token}`;
            };
            return config || $q.when(config);
        },
        response: function (response) {
            if (response.status == 401) {
                console.log("user not authenticated");
            }
            return response || $q.when(response);
        },
        responseError: function (response) {
            console.log(response);
            // var rootScope = $injector.get('$rootScope');
            // var state = $injector.get('$rootSope').$state.current.name;
            // $rootScope.$state.go('token');
            if (response.status == 401) {
                $location.path('/token');
            }
            return $q.reject(response);
        }
    };
});

angular.module('app')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/token');

        $stateProvider.state('token', {
            url: '/token',
            views: {
                body: {
                    templateUrl: 'html/Token.html',
                    controller: 'ctrl'
                }
            }
        })
            .state('list', {
                url: '/list',
                views: {
                    header:{
                        templateUrl: 'html/header/nav.html',
                    },
                    body: {
                        templateUrl: 'html/List.html',
                        controller: 'listCtrl'
                    }
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    body: {
                        templateUrl: 'html/Register.html',
                        controller: 'regCtrl'
                    }
                }
            })
            .state('updateitem', {
                url: '/updateitem',
                params: {
                    id: null,
                    name: null
                },
                views: {
                    header:{
                        templateUrl: 'html/header/nav.html',
                    },
                    body: {
                        templateUrl: 'html/UpdateItem.html',
                        controller: 'updateItemCtrl'
                    }
                }
            })
            .state('payment', {
                url: '/payment',
                views: {
                    header:{
                        templateUrl: 'html/header/nav.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/Payment.html',
                        controller: 'paymentCtrl'
                    }
                }
            })
            .state('recharge', {
                url: '/recharge',
                views: {
                    header:{
                        templateUrl: 'html/header/nav.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/recharge.html',
                        controller: 'rechargeCtrl'
                    }
                }
            })
            .state('result', {
                url: '/result',
                params: {
                    msg: null
                },
                views: {
                    header:{
                        templateUrl: 'html/header/nav.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/Result.html',
                        controller: 'resultCtrl'
                    }
                }
            })
            .state('transactionList', {
                url: '/transactionList',
                params: {
                    msg: null
                },
                views: {
                    header:{
                        templateUrl: 'html/header/nav.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/transactionList.html',
                        controller: 'transactionListCtrl'
                    }
                }
            })
            .state('merchant', {
                url: '/merchant',
                views: {
                    header:{
                        templateUrl: 'html/header/nav.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/Merchant.html',
                        controller: 'merchantCtrl'
                    }
                }
            })
            .state('admin', {
                url: '/adminDashboard',
                views: {
                    header:{
                        templateUrl: 'html/header/nav-admin.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/AdminDashboard.html',
                        controller: 'transactionListCtrl'
                    }
                }
            })
            .state('adminUserAccount', {
                url: '/adminUserAccount',
                views: {
                    header:{
                        templateUrl: 'html/header/nav-admin.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/AdminUserAccount.html',
                        controller: 'adminUserAccuntCtrl'
                    }
                }
            })
            .state('adminUserTrans', {
                url: '/adminUserTrans',
                params: {
                    email: null
                },
                views: {
                    header:{
                        templateUrl: 'html/header/nav-admin.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/AdminUserTransaction.html',
                        controller: 'adminUserTransCtrl'
                    }
                }
            })
            .state('adminmerchant', {
                url: '/adminmerchant',
                views: {
                    header:{
                        templateUrl: 'html/header/nav-admin.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/AdminMerchant.html',
                        controller: 'merchantAdminCtrl'
                    }
                }
            })
            .state('adminmerchantmgr', {
                url: '/adminmerchantmgr',
                params: {
                    id:null,
                    name:null,
                    address:null,
                    phone:null,
                    discount:null,
                    companyPayRate:null
                },
                views: {
                    header:{
                        templateUrl: 'html/header/nav-admin.html',
                        controller:'navCtrl'
                    },
                    body: {
                        templateUrl: 'html/AdminMerchantMgr.html',
                        controller: 'merchantMgrCtrl'
                    }
                }
            })
            ;
    }]);
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
angular.module('app').controller('ctrl', ['$scope', '$http', '$state', 'appConstants', '$localStorage','ListService','$window',
    function ($scope, $http, $state, appConstants, $localStorage,ListService,$window) {
        $scope.userName = 'et@et.com';
        $scope.pwd = 'Password_1';
        $scope.adminLoginMode = false;
        
        
        $scope.GoRegister = () =>{
            $state.go('register');
        }

        $scope.ExchangeToken = () => {
            var tokenRequest = {
                UserName: 'et@et.com',
                Password: 'Password_1',
                grant_type: 'password'
            };
            var loginStr = `UserName=${$scope.userName}&Password=${$scope.pwd}&grant_type=password`;
            ListService.GetList();
            $http.post(`${appConstants.BASE_URL}/token`, loginStr)
                .then((resp) => {
                    console.log('resp:' + $localStorage.token);
                    // $scope.$storage.token = resp.data.access_token;
                    $localStorage.token = resp.data.access_token;
                    $window.sessionStorage.token =  resp.data.access_token;
                    console.log('token updated:' + $localStorage.token);
                    $state.go('transactionList')
                },
                (err) => {
                    // $scope.token = err.data.error_description;
                    $localStorage.token = err.data.error_description;
                    console.log('failure:' + err.data.error_description);
                });


            // $http({
            //     url:'http://localhost:3237/token',
            //     method: 'POST',            
            //     data: tokenRequest    
            // })
            // .then((data)=>{
            //     console.log('resp:'+data);
            //     $scope.token = data;
            // },
            // (err)=>{
            //     console.log('failure:'+err);
            // });
        }

        $scope.ExchangeAdminToken = () => {
            var tokenRequest = {
                UserName: 'admin@admin.com',
                Password: 'Password_1',
                grant_type: 'password'
            };
            var loginStr = `UserName=${$scope.userName}&Password=${$scope.pwd}&grant_type=password`;
            ListService.GetList();
            $http.post(`${appConstants.BASE_URL}/token`, loginStr)
                .then((resp) => {
                    console.log('resp:' + $localStorage.token);
                    // $scope.$storage.token = resp.data.access_token;
                    $localStorage.token = resp.data.access_token;
                    $window.sessionStorage.token =  resp.data.access_token;
                    // console.log('token updated:' + $localStorage.token);
                    $state.go('admin');
                },
                (err) => {
                    // $scope.token = err.data.error_description;
                    $localStorage.token = err.data.error_description;
                    console.log('failure:' + err.data.error_description);
                });
        }
    }])
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
angular.module('app').controller('merchantAdminCtrl', ['$scope', '$http', '$state', '$filter', 'appConstants', '$stateParams',
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
angular.module('app').controller('paymentCtrl', function ($scope, $http, $timeout, $interval, $state, appConstants) {
    $scope.tranId;
    $scope.tranStatus;
    $scope.timer;
    $scope.msg;
    $scope.qr_codeGenUrl = 'http://qr.liantu.com/api.php?text='
    $scope.transactionId = '123456';
    $scope.MimicScan = MimicScan;

    init();

    function init() {
        $http.get(`${appConstants.BASE_URL}/api/payment`)
            .then(
            (resp) => {
                $scope.transactionId = resp.data;
                $scope.imgQr = $scope.qr_codeGenUrl + $scope.transactionId;
                setupInterval();
                setupTimeout();
            },
            (err) => {
                console.error(err);
            }
            )
    }

    function setupInterval() {
        $scope.timer = $interval(function () {
            checkTransactionStatus();
        }, 1000, 60);

    }

    function setupTimeout() {
        $timeout(function () {
            $scope.msg = 'QR Code TimeOut';
            $interval.cancel($scope.timer);
        }, 60*1000);
    }

    function checkTransactionStatus() {
        $http.get(`${appConstants.BASE_URL}/api/TransactionStatus/${$scope.transactionId}`)
            .then(
            (resp) => {
                console.log(resp);
                $scope.tranStatus = resp.data;
                if ($scope.tranStatus == "success") {
                    $interval.cancel($scope.timer);
                    $http.get(`${appConstants.BASE_URL}/api/Transaction/${$scope.transactionId}`)
                    .then(
                        (resp) =>{
                            $state.go('result', { 
                                msg: `Pay ${resp.data.merchantname} Successful, total amount: ${resp.data.amount}, you should pay ${resp.data.userpayamount}` 
                            });
                        },
                        (err) =>{
                            console.error(err);
                        }
                    );
                }
            },
            (err) => {
                console.error(err);
            }
            )
    }

    function MimicScan(){
        console.log('mimic scan');
        $http.post(`${appConstants.BASE_URL}/api/payment/mimicScan`,{id:$scope.transactionId})
            .then(
            (resp) => {
                console.log('scan success');
            },
            (err) => {
                console.error(err);
            }
            )
    }
})
angular.module('app').controller('rechargeCtrl', function ($scope, $http, $timeout, $interval, $state, appConstants) {
    $scope.tranId;
    $scope.tranStatus;
    $scope.timer;
    $scope.msg;
    $scope.qr_codeGenUrl = 'http://qr.liantu.com/api.php?text='
    $scope.transactionId = '123456';
    $scope.MimicScan = MimicScan;

    init();

    function init() {
        $http.get(`${appConstants.BASE_URL}/api/payment`)
            .then(
            (resp) => {
                $scope.transactionId = resp.data;
                $scope.imgQr = $scope.qr_codeGenUrl + $scope.transactionId;
                setupInterval();
                setupTimeout();
            },
            (err) => {
                console.error(err);
            }
            )
    }

    function setupInterval() {
        $scope.timer = $interval(function () {
            checkTransactionStatus();
        }, 1000, 60);

    }

    function setupTimeout() {
        $timeout(function () {
            $scope.msg = 'QR Code TimeOut';
            $interval.cancel($scope.timer);
        }, 60*1000);
    }

    function checkTransactionStatus() {
        $http.get(`${appConstants.BASE_URL}/api/TransactionStatus/${$scope.transactionId}`)
            .then(
            (resp) => {
                console.log(resp);
                $scope.tranStatus = resp.data;
                if ($scope.tranStatus == "success") {
                    $interval.cancel($scope.timer);
                    $http.get(`${appConstants.BASE_URL}/api/Transaction/${$scope.transactionId}`)
                    .then(
                        (resp) =>{
                            $state.go('result', { 
                                msg: `Recharge ${resp.data.userpayamount} successful` 
                            });
                        },
                        (err) =>{
                            console.error(err);
                        }
                    );
                }
            },
            (err) => {
                console.error(err);
            }
            )
    }

    function MimicScan(){
        console.log('mimic scan Recharge');
        $http.post(`${appConstants.BASE_URL}/api/payment/mimicScanRecharge`,{id:$scope.transactionId})
            .then(
            (resp) => {
                console.log('scan success');
            },
            (err) => {
                console.error(err);
            }
            )
    }
})
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
angular.module('app').controller('resultCtrl', function ($scope, $state, $stateParams) {
    $scope.msg = 'Message';

    init();

    function init(){
        $scope.msg = $stateParams.msg;
    }
})
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
angular.module('app').service('ListService',['$http',function($http){
    this.GetList = ()=>{
        console.log('list Method');
    }
}])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGhJbnRlcmNlcHRvci5qcyIsInJvdXRlLmpzIiwiY29udHJvbGxlci9hZG1pblVzZXJBY2N1bnRDdHJsLmpzIiwiY29udHJvbGxlci9hZG1pblVzZXJUcmFuc0N0cmwuanMiLCJjb250cm9sbGVyL2N0cmwuanMiLCJjb250cm9sbGVyL2xpc3RDdHJsLmpzIiwiY29udHJvbGxlci9tZXJjaGFudEFkbWluQ3RybC5qcyIsImNvbnRyb2xsZXIvbWVyY2hhbnRDdHJsLmpzIiwiY29udHJvbGxlci9tZXJjaGFudE1nckN0cmwuanMiLCJjb250cm9sbGVyL25hdkN0cmwuanMiLCJjb250cm9sbGVyL3BheW1lbnRDdHJsLmpzIiwiY29udHJvbGxlci9yZWNoYXJnZUN0cmwuanMiLCJjb250cm9sbGVyL3JlZ0N0cmwuanMiLCJjb250cm9sbGVyL3Jlc3VsdEN0cmwuanMiLCJjb250cm9sbGVyL3RyYW5zYWN0aW9uTGlzdEN0cmwuanMiLCJjb250cm9sbGVyL3VwZGF0ZUl0ZW1DdHJsLmpzIiwic2VydmljZXMvTGlzdFNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwQWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxbJ3VpLnJvdXRlcicsJ25nU3RvcmFnZScsJ3NtYXJ0LXRhYmxlJywnY2hhcnQuanMnXSk7XHJcblxyXG4gYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnN0YW50KCdhcHBDb25zdGFudHMnLHtcclxuICAgICBCQVNFX1VSTDonaHR0cDovL2xvY2FsaG9zdDozMjM3LydcclxuICAgIH0pO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnZhbHVlKCdhcHBWYWwnLHtcclxuICAgIHRva2VuOicnXHJcbn0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCAkd2luZG93LCAkbG9jYXRpb24sICRpbmplY3Rvcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXF1ZXN0OiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LnNlc3Npb25TdG9yYWdlLnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAkeyR3aW5kb3cuc2Vzc2lvblN0b3JhZ2UudG9rZW59YDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgbm90IGF1dGhlbnRpY2F0ZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8ICRxLndoZW4ocmVzcG9uc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy8gdmFyIHJvb3RTY29wZSA9ICRpbmplY3Rvci5nZXQoJyRyb290U2NvcGUnKTtcclxuICAgICAgICAgICAgLy8gdmFyIHN0YXRlID0gJGluamVjdG9yLmdldCgnJHJvb3RTb3BlJykuJHN0YXRlLmN1cnJlbnQubmFtZTtcclxuICAgICAgICAgICAgLy8gJHJvb3RTY29wZS4kc3RhdGUuZ28oJ3Rva2VuJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3Rva2VuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcclxuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3InKTtcclxuICAgIH0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvdG9rZW4nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3Rva2VuJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvdG9rZW4nLFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9Ub2tlbi5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3RybCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnbGlzdCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9saXN0JyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL2hlYWRlci9uYXYuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9MaXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbGlzdEN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvUmVnaXN0ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWdDdHJsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCd1cGRhdGVpdGVtJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3VwZGF0ZWl0ZW0nLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL2hlYWRlci9uYXYuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9VcGRhdGVJdGVtLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAndXBkYXRlSXRlbUN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ3BheW1lbnQnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGF5bWVudCcsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9oZWFkZXIvbmF2Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiduYXZDdHJsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvUGF5bWVudC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3BheW1lbnRDdHJsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdyZWNoYXJnZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9yZWNoYXJnZScsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9oZWFkZXIvbmF2Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiduYXZDdHJsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvcmVjaGFyZ2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWNoYXJnZUN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ3Jlc3VsdCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9yZXN1bHQnLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvaGVhZGVyL25hdi5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonbmF2Q3RybCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL1Jlc3VsdC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Jlc3VsdEN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ3RyYW5zYWN0aW9uTGlzdCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy90cmFuc2FjdGlvbkxpc3QnLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvaGVhZGVyL25hdi5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonbmF2Q3RybCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL3RyYW5zYWN0aW9uTGlzdC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3RyYW5zYWN0aW9uTGlzdEN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ21lcmNoYW50Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL21lcmNoYW50JyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL2hlYWRlci9uYXYuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6J25hdkN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9NZXJjaGFudC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21lcmNoYW50Q3RybCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW4nLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW5EYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvaGVhZGVyL25hdi1hZG1pbi5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonbmF2Q3RybCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL0FkbWluRGFzaGJvYXJkLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAndHJhbnNhY3Rpb25MaXN0Q3RybCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW5Vc2VyQWNjb3VudCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9hZG1pblVzZXJBY2NvdW50JyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL2hlYWRlci9uYXYtYWRtaW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6J25hdkN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9BZG1pblVzZXJBY2NvdW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRtaW5Vc2VyQWNjdW50Q3RybCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYWRtaW5Vc2VyVHJhbnMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW5Vc2VyVHJhbnMnLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9oZWFkZXIvbmF2LWFkbWluLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiduYXZDdHJsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvQWRtaW5Vc2VyVHJhbnNhY3Rpb24uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZG1pblVzZXJUcmFuc0N0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2FkbWlubWVyY2hhbnQnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWRtaW5tZXJjaGFudCcsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9oZWFkZXIvbmF2LWFkbWluLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiduYXZDdHJsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvQWRtaW5NZXJjaGFudC5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21lcmNoYW50QWRtaW5DdHJsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdhZG1pbm1lcmNoYW50bWdyJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FkbWlubWVyY2hhbnRtZ3InLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczpudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBob25lOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzY291bnQ6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBjb21wYW55UGF5UmF0ZTpudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvaGVhZGVyL25hdi1hZG1pbi5odG1sJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonbmF2Q3RybCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL0FkbWluTWVyY2hhbnRNZ3IuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtZXJjaGFudE1nckN0cmwnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ2FkbWluVXNlckFjY3VudEN0cmwnLCBbJyRzY29wZScsICckaHR0cCcsICckc3RhdGUnLCAnJGZpbHRlcicsICdhcHBDb25zdGFudHMnLCAnJHN0YXRlUGFyYW1zJyxcclxuICAgIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkc3RhdGUsICRmaWx0ZXIsIGFwcENvbnN0YW50cywgJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgJHNjb3BlLm5hbWUgPSAnbGlzdCc7XHJcbiAgICAgICAgJHNjb3BlLnVzZXJBY2NvdW50O1xyXG4gICAgICAgICRzY29wZS5Hb3RvVXNlclRyYW4gPSBHb3RvVXNlclRyYW47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5uYW1lID0gJ0xpc3Qgc2hvdyc7XHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9Vc2VyQWNjb3VudC9BbGxBY2NvdW50YClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YSA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBsb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGluaXQoKTtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIEdvdG9Vc2VyVHJhbihlbWFpbCl7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW5Vc2VyVHJhbnMnLHtlbWFpbDplbWFpbH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignYWRtaW5Vc2VyVHJhbnNDdHJsJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJHN0YXRlJywgJyRmaWx0ZXInLCAnYXBwQ29uc3RhbnRzJywgJyRzdGF0ZVBhcmFtcycsXHJcbiAgICBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJHN0YXRlLCAkZmlsdGVyLCBhcHBDb25zdGFudHMsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgICRzY29wZS5uYW1lID0gJ2xpc3QnO1xyXG4gICAgICAgICRzY29wZS51c2VyQWNjb3VudDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm5hbWUgPSAnTGlzdCBzaG93JztcclxuICAgICAgICAgICAgJHNjb3BlLmVtYWlsID0gJHN0YXRlUGFyYW1zLmVtYWlsO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICAkaHR0cC5wb3N0KGAke2FwcENvbnN0YW50cy5CQVNFX1VSTH0vYXBpL1VzZXJBY2NvdW50L1VzZXJUcmFuc2FjdGlvbmAse2VtYWlsOiRzY29wZS5lbWFpbH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignY3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICdhcHBDb25zdGFudHMnLCAnJGxvY2FsU3RvcmFnZScsJ0xpc3RTZXJ2aWNlJywnJHdpbmRvdycsXHJcbiAgICBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJHN0YXRlLCBhcHBDb25zdGFudHMsICRsb2NhbFN0b3JhZ2UsTGlzdFNlcnZpY2UsJHdpbmRvdykge1xyXG4gICAgICAgICRzY29wZS51c2VyTmFtZSA9ICdldEBldC5jb20nO1xyXG4gICAgICAgICRzY29wZS5wd2QgPSAnUGFzc3dvcmRfMSc7XHJcbiAgICAgICAgJHNjb3BlLmFkbWluTG9naW5Nb2RlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLkdvUmVnaXN0ZXIgPSAoKSA9PntcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdyZWdpc3RlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLkV4Y2hhbmdlVG9rZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0b2tlblJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICBVc2VyTmFtZTogJ2V0QGV0LmNvbScsXHJcbiAgICAgICAgICAgICAgICBQYXNzd29yZDogJ1Bhc3N3b3JkXzEnLFxyXG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ3Bhc3N3b3JkJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgbG9naW5TdHIgPSBgVXNlck5hbWU9JHskc2NvcGUudXNlck5hbWV9JlBhc3N3b3JkPSR7JHNjb3BlLnB3ZH0mZ3JhbnRfdHlwZT1wYXNzd29yZGA7XHJcbiAgICAgICAgICAgIExpc3RTZXJ2aWNlLkdldExpc3QoKTtcclxuICAgICAgICAgICAgJGh0dHAucG9zdChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L3Rva2VuYCwgbG9naW5TdHIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwOicgKyAkbG9jYWxTdG9yYWdlLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkc2NvcGUuJHN0b3JhZ2UudG9rZW4gPSByZXNwLmRhdGEuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudG9rZW4gPSByZXNwLmRhdGEuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2UudG9rZW4gPSAgcmVzcC5kYXRhLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG9rZW4gdXBkYXRlZDonICsgJGxvY2FsU3RvcmFnZS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCd0cmFuc2FjdGlvbkxpc3QnKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkc2NvcGUudG9rZW4gPSBlcnIuZGF0YS5lcnJvcl9kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnRva2VuID0gZXJyLmRhdGEuZXJyb3JfZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWx1cmU6JyArIGVyci5kYXRhLmVycm9yX2Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICRodHRwKHtcclxuICAgICAgICAgICAgLy8gICAgIHVybDonaHR0cDovL2xvY2FsaG9zdDozMjM3L3Rva2VuJyxcclxuICAgICAgICAgICAgLy8gICAgIG1ldGhvZDogJ1BPU1QnLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgZGF0YTogdG9rZW5SZXF1ZXN0ICAgIFxyXG4gICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICAvLyAudGhlbigoZGF0YSk9PntcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZXNwOicrZGF0YSk7XHJcbiAgICAgICAgICAgIC8vICAgICAkc2NvcGUudG9rZW4gPSBkYXRhO1xyXG4gICAgICAgICAgICAvLyB9LFxyXG4gICAgICAgICAgICAvLyAoZXJyKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2ZhaWx1cmU6JytlcnIpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5FeGNoYW5nZUFkbWluVG9rZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0b2tlblJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICBVc2VyTmFtZTogJ2FkbWluQGFkbWluLmNvbScsXHJcbiAgICAgICAgICAgICAgICBQYXNzd29yZDogJ1Bhc3N3b3JkXzEnLFxyXG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ3Bhc3N3b3JkJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgbG9naW5TdHIgPSBgVXNlck5hbWU9JHskc2NvcGUudXNlck5hbWV9JlBhc3N3b3JkPSR7JHNjb3BlLnB3ZH0mZ3JhbnRfdHlwZT1wYXNzd29yZGA7XHJcbiAgICAgICAgICAgIExpc3RTZXJ2aWNlLkdldExpc3QoKTtcclxuICAgICAgICAgICAgJGh0dHAucG9zdChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L3Rva2VuYCwgbG9naW5TdHIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwOicgKyAkbG9jYWxTdG9yYWdlLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkc2NvcGUuJHN0b3JhZ2UudG9rZW4gPSByZXNwLmRhdGEuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudG9rZW4gPSByZXNwLmRhdGEuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2UudG9rZW4gPSAgcmVzcC5kYXRhLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG9rZW4gdXBkYXRlZDonICsgJGxvY2FsU3RvcmFnZS50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbicpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkc2NvcGUudG9rZW4gPSBlcnIuZGF0YS5lcnJvcl9kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnRva2VuID0gZXJyLmRhdGEuZXJyb3JfZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWx1cmU6JyArIGVyci5kYXRhLmVycm9yX2Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdsaXN0Q3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICckZmlsdGVyJywgJ2FwcENvbnN0YW50cycsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJGZpbHRlciwgYXBwQ29uc3RhbnRzLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAkc2NvcGUubmFtZSA9ICdsaXN0JztcclxuICAgICAgICAvLyAkc2NvcGUuZGF0YSA9IFt7IGlkOiAxLCBuYW1lOiAnZXQxJyB9LCB7IGlkOiAyLCBuYW1lOiAnZXQyJyB9XTtcclxuXHJcbiAgICAgICAgJHNjb3BlLlBvc3REYXRhID0gKGlkLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygndXBkYXRlaXRlbScsIHsgaWQ6IGlkLCBuYW1lOiBuYW1lIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm5hbWUgPSAnTGlzdCBzaG93JztcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KGAke2FwcENvbnN0YW50cy5CQVNFX1VSTH1hcGkvdGFibGUxYClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YSA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBsb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdtZXJjaGFudEFkbWluQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICckZmlsdGVyJywgJ2FwcENvbnN0YW50cycsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJGZpbHRlciwgYXBwQ29uc3RhbnRzLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAkc2NvcGUubmFtZSA9ICdtZXJjaGFudGxpc3QnO1xyXG4gICAgICAgICRzY29wZS5NZXJjaGFudERldGFpbCA9IE1lcmNoYW50RGV0YWlsO1xyXG4gICAgICAgICRzY29wZS5BZGRNZXJjaGFudCA9ICgpPT57XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbyhcImFkbWlubWVyY2hhbnRtZ3JcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuUG9zdERhdGEgPSAoaWQsIG5hbWUpID0+IHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCd1cGRhdGVpdGVtJywgeyBpZDogaWQsIG5hbWU6IG5hbWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldCBtZXJjaGFudCBsaXN0Jyk7XHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudGApXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudC9kYXRhYClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwLmRhdGEgPSBKU09OLnBhcnNlKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXNwLmRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwLmRhdGEuaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGFydGxhYmVscyA9IHJlc3AuZGF0YS5pdGVtcztcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hhcnRkYXRhID0gcmVzcC5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudC90cmFuZGF0YWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcC5kYXRhID0gSlNPTi5wYXJzZShyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04ucGFyc2UocmVzcC5kYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcC5kYXRhLml0ZW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hhcnRUcmFubGFiZWxzID0gcmVzcC5kYXRhLml0ZW1zO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGFydFRyYW5kYXRhID0gcmVzcC5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9kLmlkLGQubmFtZSxkLmFkZHJlc3MsZC5waG9uZSxkLmRpc2NvdW50LGQuY29tcGFueVBheVJhdGVcclxuICAgICAgICBmdW5jdGlvbiBNZXJjaGFudERldGFpbChpZCwgbmFtZSwgYWRkcmVzcywgcGhvbmUsIGRpc2NvdW50LCBjb21wYW55UGF5UmF0ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2snKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbm1lcmNoYW50bWdyJywgeyBpZDogaWQsIG5hbWU6IG5hbWUsIGFkZHJlc3M6IGFkZHJlc3MscGhvbmU6cGhvbmUsIGRpc2NvdW50OiBkaXNjb3VudCwgY29tcGFueVBheVJhdGU6IGNvbXBhbnlQYXlSYXRlIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ21lcmNoYW50Q3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICckZmlsdGVyJywgJ2FwcENvbnN0YW50cycsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJGZpbHRlciwgYXBwQ29uc3RhbnRzLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAkc2NvcGUubmFtZSA9ICdtZXJjaGFudGxpc3QnO1xyXG4gICAgICAgICRzY29wZS5NZXJjaGFudERldGFpbCA9IE1lcmNoYW50RGV0YWlsO1xyXG4gICAgICAgICRzY29wZS5BZGRNZXJjaGFudCA9ICgpPT57XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbyhcImFkbWlubWVyY2hhbnRtZ3JcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuUG9zdERhdGEgPSAoaWQsIG5hbWUpID0+IHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCd1cGRhdGVpdGVtJywgeyBpZDogaWQsIG5hbWU6IG5hbWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldCBtZXJjaGFudCBsaXN0Jyk7XHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudGApXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudC9kYXRhYClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwLmRhdGEgPSBKU09OLnBhcnNlKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXNwLmRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwLmRhdGEuaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGFydGxhYmVscyA9IHJlc3AuZGF0YS5pdGVtcztcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hhcnRkYXRhID0gcmVzcC5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudC90cmFuZGF0YWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcC5kYXRhID0gSlNPTi5wYXJzZShyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04ucGFyc2UocmVzcC5kYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcC5kYXRhLml0ZW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hhcnRUcmFubGFiZWxzID0gcmVzcC5kYXRhLml0ZW1zO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGFydFRyYW5kYXRhID0gcmVzcC5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9kLmlkLGQubmFtZSxkLmFkZHJlc3MsZC5waG9uZSxkLmRpc2NvdW50LGQuY29tcGFueVBheVJhdGVcclxuICAgICAgICBmdW5jdGlvbiBNZXJjaGFudERldGFpbChpZCwgbmFtZSwgYWRkcmVzcywgcGhvbmUsIGRpc2NvdW50LCBjb21wYW55UGF5UmF0ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2snKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdhZG1pbm1lcmNoYW50bWdyJywgeyBpZDogaWQsIG5hbWU6IG5hbWUsIGFkZHJlc3M6IGFkZHJlc3MscGhvbmU6cGhvbmUsIGRpc2NvdW50OiBkaXNjb3VudCwgY29tcGFueVBheVJhdGU6IGNvbXBhbnlQYXlSYXRlIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ21lcmNoYW50TWdyQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICckZmlsdGVyJywgJ2FwcENvbnN0YW50cycsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJGZpbHRlciwgYXBwQ29uc3RhbnRzLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAkc2NvcGUubmFtZSA9ICdtZXJjaGFudGxpc3QnO1xyXG4gICAgICAgICRzY29wZS5Qb3N0RGF0YSA9ICgpID0+IHtcclxuICAgICAgICAgICAgJGh0dHAucG9zdChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudGAse1xyXG4gICAgICAgICAgICAgICAgaWQ6JHNjb3BlLmlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTokc2NvcGUubmFtZSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6JHNjb3BlLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBwaG9uZTokc2NvcGUucGhvbmUsXHJcbiAgICAgICAgICAgICAgICBkaXNjb3VudDokc2NvcGUuZGlzY291bnQsXHJcbiAgICAgICAgICAgICAgICBjb21wYW55UGF5UmF0ZTokc2NvcGUuY29tcGFueVBheVJhdGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWlubWVyY2hhbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICAkc2NvcGUuaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5uYW1lID0gJHN0YXRlUGFyYW1zLm5hbWU7XHJcbiAgICAgICAgICAgICRzY29wZS5hZGRyZXNzID0gJHN0YXRlUGFyYW1zLmFkZHJlc3M7XHJcbiAgICAgICAgICAgICRzY29wZS5waG9uZSA9ICRzdGF0ZVBhcmFtcy5waG9uZTtcclxuICAgICAgICAgICAgJHNjb3BlLmRpc2NvdW50ID0gJHN0YXRlUGFyYW1zLmRpc2NvdW50O1xyXG4gICAgICAgICAgICAkc2NvcGUuY29tcGFueVBheVJhdGUgPSAkc3RhdGVQYXJhbXMuY29tcGFueVBheVJhdGU7XHJcbiAgICAgICAgICAgIC8vICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9NZXJjaGFudGApXHJcbiAgICAgICAgICAgIC8vICAgICAudGhlbihcclxuICAgICAgICAgICAgLy8gICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJHNjb3BlLmRhdGEgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgbG9hZGVkJyk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZnVuY3Rpb24gTWVyY2hhbnREZXRhaWwoaWQpIHtcclxuICAgICAgICAvLyAgICAgJHN0YXRlLmdvKCdhZG1pbm1lcmNoYW50bWdyJywgeyBkYXRhOiB7IGlkOiBpZCwgbmFtZTogbmFtZSwgYWRkcmVzczogYWRkcmVzcywgcGhvbmU6IHBob25lLCBkaXNjb3VudDogZGlzY291bnQsIGNvbXBhbnlQYXlSYXRlOiBjb21wYW55UGF5UmF0ZSB9IH0pXHJcbiAgICAgICAgLy8gfTtcclxuXHJcbiAgICB9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignbmF2Q3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICckZmlsdGVyJywgJ2FwcENvbnN0YW50cycsICckbG9jYWxTdG9yYWdlJyxcclxuICAgIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkc3RhdGUsICRmaWx0ZXIsIGFwcENvbnN0YW50cywgJGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICRzY29wZS5uYW1lID0gJ2xpc3QnO1xyXG4gICAgICAgIC8vICRzY29wZS5kYXRhID0gW3sgaWQ6IDEsIG5hbWU6ICdldDEnIH0sIHsgaWQ6IDIsIG5hbWU6ICdldDInIH1dO1xyXG5cclxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gKGlkLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudG9rZW4gPSAnJztcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCd0b2tlbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm5hbWUgPSAnTGlzdCBzaG93JztcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KGAke2FwcENvbnN0YW50cy5CQVNFX1VSTH1hcGkvdGFibGUxYClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YSA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBsb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdwYXltZW50Q3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkdGltZW91dCwgJGludGVydmFsLCAkc3RhdGUsIGFwcENvbnN0YW50cykge1xyXG4gICAgJHNjb3BlLnRyYW5JZDtcclxuICAgICRzY29wZS50cmFuU3RhdHVzO1xyXG4gICAgJHNjb3BlLnRpbWVyO1xyXG4gICAgJHNjb3BlLm1zZztcclxuICAgICRzY29wZS5xcl9jb2RlR2VuVXJsID0gJ2h0dHA6Ly9xci5saWFudHUuY29tL2FwaS5waHA/dGV4dD0nXHJcbiAgICAkc2NvcGUudHJhbnNhY3Rpb25JZCA9ICcxMjM0NTYnO1xyXG4gICAgJHNjb3BlLk1pbWljU2NhbiA9IE1pbWljU2NhbjtcclxuXHJcbiAgICBpbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAkaHR0cC5nZXQoYCR7YXBwQ29uc3RhbnRzLkJBU0VfVVJMfS9hcGkvcGF5bWVudGApXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRyYW5zYWN0aW9uSWQgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1nUXIgPSAkc2NvcGUucXJfY29kZUdlblVybCArICRzY29wZS50cmFuc2FjdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgc2V0dXBJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgc2V0dXBUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBJbnRlcnZhbCgpIHtcclxuICAgICAgICAkc2NvcGUudGltZXIgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaGVja1RyYW5zYWN0aW9uU3RhdHVzKCk7XHJcbiAgICAgICAgfSwgMTAwMCwgNjApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFRpbWVvdXQoKSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubXNnID0gJ1FSIENvZGUgVGltZU91dCc7XHJcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoJHNjb3BlLnRpbWVyKTtcclxuICAgICAgICB9LCA2MCoxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uU3RhdHVzKCkge1xyXG4gICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9UcmFuc2FjdGlvblN0YXR1cy8keyRzY29wZS50cmFuc2FjdGlvbklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJhblN0YXR1cyA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHJhblN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoJHNjb3BlLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoYCR7YXBwQ29uc3RhbnRzLkJBU0VfVVJMfS9hcGkvVHJhbnNhY3Rpb24vJHskc2NvcGUudHJhbnNhY3Rpb25JZH1gKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzcCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Jlc3VsdCcsIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnOiBgUGF5ICR7cmVzcC5kYXRhLm1lcmNoYW50bmFtZX0gU3VjY2Vzc2Z1bCwgdG90YWwgYW1vdW50OiAke3Jlc3AuZGF0YS5hbW91bnR9LCB5b3Ugc2hvdWxkIHBheSAke3Jlc3AuZGF0YS51c2VycGF5YW1vdW50fWAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycikgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE1pbWljU2Nhbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtaW1pYyBzY2FuJyk7XHJcbiAgICAgICAgJGh0dHAucG9zdChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9wYXltZW50L21pbWljU2NhbmAse2lkOiRzY29wZS50cmFuc2FjdGlvbklkfSlcclxuICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NhbiBzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICB9XHJcbn0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3JlY2hhcmdlQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkdGltZW91dCwgJGludGVydmFsLCAkc3RhdGUsIGFwcENvbnN0YW50cykge1xyXG4gICAgJHNjb3BlLnRyYW5JZDtcclxuICAgICRzY29wZS50cmFuU3RhdHVzO1xyXG4gICAgJHNjb3BlLnRpbWVyO1xyXG4gICAgJHNjb3BlLm1zZztcclxuICAgICRzY29wZS5xcl9jb2RlR2VuVXJsID0gJ2h0dHA6Ly9xci5saWFudHUuY29tL2FwaS5waHA/dGV4dD0nXHJcbiAgICAkc2NvcGUudHJhbnNhY3Rpb25JZCA9ICcxMjM0NTYnO1xyXG4gICAgJHNjb3BlLk1pbWljU2NhbiA9IE1pbWljU2NhbjtcclxuXHJcbiAgICBpbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAkaHR0cC5nZXQoYCR7YXBwQ29uc3RhbnRzLkJBU0VfVVJMfS9hcGkvcGF5bWVudGApXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRyYW5zYWN0aW9uSWQgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW1nUXIgPSAkc2NvcGUucXJfY29kZUdlblVybCArICRzY29wZS50cmFuc2FjdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgc2V0dXBJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgc2V0dXBUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBJbnRlcnZhbCgpIHtcclxuICAgICAgICAkc2NvcGUudGltZXIgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaGVja1RyYW5zYWN0aW9uU3RhdHVzKCk7XHJcbiAgICAgICAgfSwgMTAwMCwgNjApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFRpbWVvdXQoKSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubXNnID0gJ1FSIENvZGUgVGltZU91dCc7XHJcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoJHNjb3BlLnRpbWVyKTtcclxuICAgICAgICB9LCA2MCoxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uU3RhdHVzKCkge1xyXG4gICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9UcmFuc2FjdGlvblN0YXR1cy8keyRzY29wZS50cmFuc2FjdGlvbklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJhblN0YXR1cyA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHJhblN0YXR1cyA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoJHNjb3BlLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5nZXQoYCR7YXBwQ29uc3RhbnRzLkJBU0VfVVJMfS9hcGkvVHJhbnNhY3Rpb24vJHskc2NvcGUudHJhbnNhY3Rpb25JZH1gKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVzcCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Jlc3VsdCcsIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnOiBgUmVjaGFyZ2UgJHtyZXNwLmRhdGEudXNlcnBheWFtb3VudH0gc3VjY2Vzc2Z1bGAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycikgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE1pbWljU2Nhbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtaW1pYyBzY2FuIFJlY2hhcmdlJyk7XHJcbiAgICAgICAgJGh0dHAucG9zdChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9wYXltZW50L21pbWljU2NhblJlY2hhcmdlYCx7aWQ6JHNjb3BlLnRyYW5zYWN0aW9uSWR9KVxyXG4gICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2FuIHN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgIH1cclxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcigncmVnQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICdhcHBDb25zdGFudHMnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJHN0YXRlLCBhcHBDb25zdGFudHMpIHtcclxuICAgICRzY29wZS5Vc2VyTmFtZSA9ICd1c2VybmFtZSc7XHJcbiAgICAkc2NvcGUuUGFzc3dvcmQgPSAnUGFzc3dvcmRfMSc7XHJcbiAgICAkc2NvcGUuQ29uZmlybVBhc3N3b3JkID0gJ1Bhc3N3b3JkXzEnO1xyXG4gICAgJHNjb3BlLlJlZ2lzdGVyID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciByZWdEYXRhID0ge1xyXG4gICAgICAgICAgICBFbWFpbDogJHNjb3BlLlVzZXJOYW1lLFxyXG4gICAgICAgICAgICBQYXNzd29yZDogJHNjb3BlLlBhc3N3b3JkLFxyXG4gICAgICAgICAgICBDb25maXJtUGFzc3dvcmQ6ICRzY29wZS5Db25maXJtUGFzc3dvcmRcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVnRGF0YSk7XHJcbiAgICAgICAgJGh0dHAucG9zdChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9hY2NvdW50L1JlZ2lzdGVyYCwgcmVnRGF0YSlcclxuICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Rva2VuJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcj09PT09PT09PT09PT0+Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdyZXN1bHRDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICRzY29wZS5tc2cgPSAnTWVzc2FnZSc7XHJcblxyXG4gICAgaW5pdCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKXtcclxuICAgICAgICAkc2NvcGUubXNnID0gJHN0YXRlUGFyYW1zLm1zZztcclxuICAgIH1cclxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcigndHJhbnNhY3Rpb25MaXN0Q3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgJyRzdGF0ZScsICckZmlsdGVyJywgJ2FwcENvbnN0YW50cycsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgJGZpbHRlciwgYXBwQ29uc3RhbnRzLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAkc2NvcGUubmFtZSA9ICdsaXN0JztcclxuICAgICAgICAkc2NvcGUuUG9zdERhdGEgPSAoaWQsIG5hbWUpID0+IHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCd1cGRhdGVpdGVtJywgeyBpZDogaWQsIG5hbWU6IG5hbWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUudXNlckFjY291bnQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5uYW1lID0gJ0xpc3Qgc2hvdyc7XHJcbiAgICAgICAgICAgICRodHRwLmdldChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9UcmFuc2FjdGlvbmApXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgIChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5nZXQoYCR7YXBwQ29uc3RhbnRzLkJBU0VfVVJMfS9hcGkvVXNlckFjY291bnRgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyQWNjb3VudCA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXNlciBkYXRhIGxvYWRlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgICAuY29udHJvbGxlcigndXBkYXRlSXRlbUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsIGFwcENvbnN0YW50cykge1xyXG4gICAgICAgICRzY29wZS5pZCA9ICRzdGF0ZVBhcmFtcy5pZDtcclxuICAgICAgICAkc2NvcGUubmFtZSA9ICRzdGF0ZVBhcmFtcy5uYW1lO1xyXG5cclxuICAgICAgICAkc2NvcGUuVXBkYXRlSXRlbSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZUl0ZW0nKTtcclxuICAgICAgICAgICAgJGh0dHAucG9zdChgJHthcHBDb25zdGFudHMuQkFTRV9VUkx9L2FwaS9UYWJsZTFgLCB7IGlkOiAkc2NvcGUuaWQsIG5hbWU6ICRzY29wZS5uYW1lIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmlkID0gJHN0YXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICAgICAkc2NvcGUubmFtZSA9ICRzdGF0ZVBhcmFtcy5uYW1lO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuc2VydmljZSgnTGlzdFNlcnZpY2UnLFsnJGh0dHAnLGZ1bmN0aW9uKCRodHRwKXtcclxuICAgIHRoaXMuR2V0TGlzdCA9ICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xpc3QgTWV0aG9kJyk7XHJcbiAgICB9XHJcbn1dKSJdfQ==
