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