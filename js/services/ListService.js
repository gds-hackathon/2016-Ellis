angular.module('app').service('ListService',['$http',function($http){
    this.GetList = ()=>{
        console.log('list Method');
    }
}])