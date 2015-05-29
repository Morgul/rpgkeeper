// ---------------------------------------------------------------------------------------------------------------------
// HomeController
//
// @module home.js
// ---------------------------------------------------------------------------------------------------------------------

function HomeController($scope, $http)
{
    $http.get('/news')
        .success(function(news)
        {
            $scope.news = news;
        });
} // end HomeController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('rpgkeeper.controllers').controller('HomeController', [
    '$scope',
    '$http',
    HomeController
]);

// ---------------------------------------------------------------------------------------------------------------------