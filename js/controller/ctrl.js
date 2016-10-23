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