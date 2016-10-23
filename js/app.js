 var app = angular.module('app',['ui.router','ngStorage','smart-table','chart.js']);

 angular.module('app').constant('appConstants',{
     BASE_URL:'http://localhost:3237/'
    });

angular.module('app').value('appVal',{
    token:''
});
