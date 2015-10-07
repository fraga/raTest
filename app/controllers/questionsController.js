(function() {

	var questionsController = ['$scope', 'questionsService', function($scope, questionsService){		
		var that = this;

		$scope.questions = [];
		var index = 0;
		
		questionsService.getQuestions().success(function(data) {
		  	console.log(data);
			$scope.questions = data;
			that.nextQuestion();
		}).error(function(data, status, headers, config) {
			alert('error');
		});
		
		this.verify = function(choice, correct){
			this.isCorrect = choice === correct;
			this.answered = true;
			//$scope.$broadcast('timer-stop');
		};

		$scope.shuffleQuestion = function() {
			return $scope.questions[index++];
			//return $scope.questions[$scope.getRandomInt(0, $scope.questions.length)];
		};

		$scope.getRandomInt = function(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		};

		this.nextQuestion = function() {
			this.reset();
			this.question = $scope.shuffleQuestion();
			$scope.$broadcast('timer-start');
		}
		
		this.previousQuestion = function() {
			this.reset();
			this.question = $scope.questions[index--];
			$scope.$broadcast('timer-start');
		}

		this.reset = function() {
			this.question = null;
			this.choice = '';
			this.isCorrect = false;
			this.answered = false;
		}
	}];

	angular.module('raApp').controller('QuestionsController', questionsController);
}());