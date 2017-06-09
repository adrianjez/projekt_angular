//Config properties
var BASE_URL = "http://gameofthrones.wikia.com/";

var app = angular.module("mainModule", []);

app.controller('ArticlesController', function ($scope, $http) {

	$scope.rates = {};
    $http.get(BASE_URL + 'api/v1/Articles/Popular?expand=1&limit=10')
		.then(function(res) {
			$scope.articles = data.results;
		});
            

});


app.controller("HttpController", [ '$scope', '$resource',
		function($scope, $resource) {
			//
			// GET Action Method
			//
			var User = $resource('/user/:userId', {userId:'@userId'});
			User.get( {userId:25}, function(user){
				$scope.profile = user;
			})
			//
			// Query Action Method
			//
			var UserProfiles = $resource(BASE_URL + 'api/v1/Articles/Popular?expand=1&limit=10');
			UserProfiles.query(function(profiles){
				$scope.profiles = profiles;					
			});
		} ]);
