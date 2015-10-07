(function() {
	var app = angular.module('raApp', ['ngRoute', 'timer']);

	app.config(function($routeProvider) {
		$routeProvider
			.when('/questions', {
				controller: 'QuestionsController',
				templateUrl: '/app/views/questions/index.html'
			})
			.otherwise({ redirectTo: '/questions' });
	});
})();