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