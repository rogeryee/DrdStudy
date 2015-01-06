define(['durandal/app'],function (app) {

	var myViewModel = {
    	personName: 'Roger1234',
    	personAge: 1234
	};

	// DurandalJS already do the binding on behalf of KO, so no need to do the binding explicitly.
	//ko.applyBindings(myViewModel);

	// 24*3*2 = 144
	// (12+20+24)*3*2 = 336
	// (16+16+20)*3*2 = 312
	// 792m + 80z = 50*2+100*5+80 = 680z
	// 24*10+120+60*2+50+150+120=800

	return myViewModel;
});