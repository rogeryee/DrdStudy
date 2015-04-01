define(function (require) {

	var app = require('durandal/app');
	var ko = require('knockout');
	var $ = require('jquery');

	function myViewModel(){

		var self =  this;

		// 1. Observable
		self.personName = "Roger Yi";
		self.personAge = 33;

		// 2. Computed Variable
		self.firstName = ko.observable('Roger');
		self.lastName = ko.observable('Yee');

		self.fullName = ko.computed(function(){
			return self.firstName() + "." + self.lastName();
		});


		self.checkboxValue = ko.observable(true);
		self.clickCheck = function(){
			self.checkboxValue(!self.checkboxValue());
		}

		self.checkboxValue.subscribe(function(){
			console.log("self.checkboxValue = " + self.checkboxValue());
		});

		self.getName = function(){
			$.ajax({

				type: "get",

				url: "http://www.cnblogs.com/rss",

				beforeSend: function(XMLHttpRequest){

					console.log('beforeSend');
				},
				success: function(data, textStatus){

					console.log('getName success');

				},

				complete: function(XMLHttpRequest, textStatus){
					console.log('getName complete');
				},
				error: function(){
					console.log('getName error');
				}
			});

			// $.ajax('app/viewmodels/ko/test.json')
			// 	.done(function(){

			// 		console.log('getName done!');
			// 	})
			// 	.fail(function(){

			// 		console.log('getName fail!');
			// 	})
			// 	.always(function(){
			// 		console.log('getName always!')
			// 	});

		};
	}

	// DurandalJS already does the binding on behalf of KO, so no need to do the binding explicitly.
	//ko.applyBindings(myViewModel);
	return myViewModel;
});