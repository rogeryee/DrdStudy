define(['durandal/app','knockout'],function (app,ko) {

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
	}

	// DurandalJS already do the binding on behalf of KO, so no need to do the binding explicitly.
	//ko.applyBindings(myViewModel);
	return myViewModel;
});