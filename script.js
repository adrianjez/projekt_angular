//** Additional Module - filters provider 
var additionalModule = angular.module("filtersProvider", [])
additionalModule.filter('appendLength', function() {
    return function(x) {
    	var result = x + " o dlugosci: " + x.length;
    	return result;
    };
});
additionalModule.filter('makeMirror', function() {
	return function(x) {
		var result = x + '_';

		for(var i = x.length - 1; i >= 0; i--){
			result += x[i];
		}
		return result;
	}
});


var app = angular.module("mainModule", ["filtersProvider"]);

//** Factories **/
app.factory("services", ['$http', function($http) {
	var BASE_URL = 'https://quiet-castle-94433.herokuapp.com/'
	var obj = {};
	obj.getDogs = function(){
    	return $http.get(BASE_URL + 'dogs');
	}

	obj.insertDog = function (dog) {
  		return $http.post(BASE_URL + 'dogs/add', dog).then(function (results) {
      		return results;
  		})
	};
	return obj;
}]);

/** Controllers **/
app.controller('DogsCreationController', function ($scope, services) {
	$scope.addDog = function(){
		var dog = {};
		dog.rasa = $scope.creator_Rasa;
		dog.sredniWiekZycia = $scope.creator_SredniWiekZycia;
		dog.maksymalnaPredkoscBiegu = $scope.creator_MaksymalnaPredkoscBiegu;
		dog.zdjecie = $scope.creator_Zdjecie;
		dog.opis = $scope.creator_Opis;
		dog.cena = $scope.creator_Cena;

		$scope.creator_Rasa = "";
		$scope.creator_SredniWiekZycia = "";
		$scope.creator_MaksymalnaPredkoscBiegu = "";
		$scope.creator_Zdjecie = "";
		$scope.creator_Cena = "";
		$scope.creator_Opis = "";

		services.insertDog(dog).then(function(data){
			$scope.dogs.push(data.data);
		});
	}
});

app.controller("DateTodayController", function($scope) {
	$scope.dzisiejszaData = new Date();
});

app.controller("FiltersProviderTester", function($scope){
	$scope.testData = ["Adrian", "Pawel", "Robert", "Dominik", "Jan", "Andrzej", "Krzysztof"];
});

/** Directives **/
app.directive("dogsList", ['services', function(services) {
	return {
    	controller: function ($scope) {
     		services.getDogs().then(function(data){
				$scope.dogs = data.data;
			});
    	},
		templateUrl : "szablony/dogs_list.html"
  	};
}]);

app.directive("dogItem", function(){
	return {
		scope: {
        	ngModel: '='
    	},
		templateUrl : "szablony/dog_item.html"
	};
});

