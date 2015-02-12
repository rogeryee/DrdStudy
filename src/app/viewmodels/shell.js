define(['plugins/router'],function (router) {
  return {
     router: router,
     activate: function () {
       router.map([
         { route: '', title:'Home', moduleId: 'viewmodels/home', nav: true },
         { route:'observableSample', title:'Observable Sample', moduleId:'viewmodels/ko/observableSample', nav:true },
         { route: 'op', title:'Options Play', moduleId: 'viewmodels/op/opEntry', nav: true },
         { route:'about', title:'About', moduleId:'viewmodels/about/about', nav:true }
       ]).buildNavigationModel();
 
       return router.activate();
     }
   };
});