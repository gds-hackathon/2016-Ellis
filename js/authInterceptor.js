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