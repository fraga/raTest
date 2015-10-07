(function () {

	var questionsService = function($http){
		var factory = {};
		var url = '/app/questions.json';

		factory.getQuestions = function() {
			return $http.get(url);
		}

		factory.addQuestion = function(question) {
			this.getQuestions().then(function(results) {
				results.data.push({
					type: question.type,
					description: question.desc,
					answers: [
						question.answer1,
						question.answer2,
						question.answer3,
						question.answer4,
						question.answer5
					],
					correct: question.correct
				});
			});

			return question;
		}

		return factory;
	};

	questionsService.$inject = ['$http'];

    angular.module('raApp').factory('questionsService', questionsService);

}());