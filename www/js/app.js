// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services','starter.guest','ngCordova', 'topscroller'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider,$urlRouterProvider){
  $stateProvider

  .state('firstpage',{
    cache:false,
    url:'/firstpage',
    templateUrl:'templates/firstpage.html'
  })
  
  /*
  .state('guest-home',{
    cache:false,
    url:'/guest-home',
    templateUrl:'templates/guest/guest-home.html',
    controller:'homeGuestCtrl'
  })

  .state('guest-detailagro',{
    cache:false,
    url:'/guest-detailagro',
    templateUrl:'templates/guest/guest-detailagro.html',
    controller:'guestDetailCtrl'
  })

  .state('guest-map',{
    cache:false,
    url:'/guest-map',
    templateUrl:'templates/guest/guest-map.html',
    controller:'guestMapCtrl'
  })
  */

  .state('about',{
    cache:false,
    url:'/about',
    templateUrl:'templates/about.html'
  })

  .state('login',{
    cache:false,
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'LoginCtrl',

    resolve:{
      "check":function($location){  
        if(sessionStorage.getItem('loggedin_id')) { 
          $location.path('/home');   
        }else {  
          $location.path('/login');   
        }
      }
    }
  })

  .state('register',{
    cache:false,
    url:'/register',
    templateUrl:'templates/register.html',
    controller:'registerCtrl'
  })


  .state('tab',{
    url:'/tab',
    abstract:true,
    cache:false,
    templateUrl:function(){
      return'templates/tabs.html';
    }
  })

  .state('tab.home',{
    cache:false,
    url:'/home',
    views:{
      'tab-home':{
          templateUrl:'templates/home.html',
          controller: 'homeCtrl'
      }
    }
  })

  .state('tab.detailagro',{
    cache:false,
    url:'/detailagro',
    views:{
      'tab-home':{
        templateUrl:'templates/detailagro.html',
        controller:'detailCtrl'
      }
    }
  })

  .state('tab.map',{
    cache:false,
    url:'/map',
    views:{
      'tab-home':{
        templateUrl:'templates/map.html',
        controller:'MapCtrl'
      }
    }
  })

  .state('tab.comments',{
    cache:false,
    url:'/comments',
    views:{
      'tab-home':{
        templateUrl:'templates/comments.html',
        controller:'CommentCtrl'
      }
    }
  })


  .state('tab.add',{
    cache:false,
    url:'/add',
    views:{
      'tab-add':{
          templateUrl:'templates/add.html',
          controller:'addCtrl'
      }
    }
  })

  .state('tab.profile',{
    cache:false,
    url:'/profile',
    views:{
      'tab-profile':{
          templateUrl:'templates/profile.html',
          controller:'profileCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/firstpage');

})