angular.module('starter.controllers',[])

.controller('LoginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
		$scope.user = {
		};  //declares the object user
		
		$scope.login = function(form) {
			if (form.$valid){
			str="http://192.168.137.1/api_agrowisata/login.php?email="+$scope.user.email+"&password="+$scope.user.password;
			$http.get(str)
			.success(function (response){   // if login request is Accepted
			
				// records is the 'server response array' variable name.
				$scope.user_details = response.records;  // copy response values to user-details object.
				
				//stores the data in the session. if the user is logged in, then there is no need to show login again.
				sessionStorage.setItem('loggedin_id', $scope.user_details.id_member);
				sessionStorage.setItem('loggedin_name', $scope.user_details.nama);
				sessionStorage.setItem('loggedin_phone', $scope.user_details.phone);
				sessionStorage.setItem('loggedin_email', $scope.user_details.email);

				$ionicPopup.alert({
				title:"You're Logged In",
				template:'<p style="text-align:center;">Hallo, ' + $scope.user_details.nama +'</p>'
				});
				
				
				// remove the instance of login page, when user moves to profile page.
				// if you dont use it, you can get to login page, even if you are already logged in .
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				
				$state.go('tab.home', [], {location: "replace", reload: true});
				
			}).error(function() {   						//if login failed
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: '<p style="text-align:center;">Incorrect Email and Password !</p>'
					});
			});
		} else  {
			$ionicPopup.alert({
				title:'Oopps!',
				template:'<p style="text-align:center;">Email and Password must be filled correctly</p>'
			});
		}
		};
		
})

.controller('registerCtrl', function($scope,$stateParams,$http,$ionicPopup,$state,$ionicHistory) {
 
	var url ="http://192.168.137.1/api_agrowisata/";

	$scope.dataUser={};

	$scope.signUp=function(form){

		var user_name=$scope.dataUser.name;
		var user_phone=$scope.dataUser.phone;
		var user_email=$scope.dataUser.email;
		var user_password=$scope.dataUser.password;

		if(form.$valid) {
			str = url+"register.php?name="+user_name+"&phone="+user_phone+"&email="+user_email+"&password="+ user_password;

			$http.get(str)
			.success(function(response){

				if(response==true){
					$ionicPopup.alert({
					title:'Register Succeed',
					template:'<p style="text-align:center;">Your Register Success, Now you are member in this application</p>'
			});

				$state.go('login',[],{location:"replace",reload:true});

				}else{
				$ionicPopup.alert({
				title:'Register Failed',
				template:'<p style="text-align:center;">Email already used</p>'
			});
				}

			}).error(function(){
				$ionicPopup.alert({
				title:'Oopps!',
				template:'<p style="text-align:center;">Register Failed</p>'
			});

			})

		} else {
			$ionicPopup.alert({
				title:'Oopps!',
				template:'<p style="text-align:center;">All data must be filled !</p>'
			});
		}
	};

	$scope.ClearForm = function (){
		$state.go($state.current,{},{reload:true})
	};

})

.controller('profileCtrl', function($scope,$rootScope,$ionicHistory,$state, $ionicPopup) {
	
		// loads value from the loggin session
	$scope.loggedin_name= sessionStorage.getItem('loggedin_name');
	$scope.loggedin_phone= sessionStorage.getItem('loggedin_phone');
	$scope.loggedin_email= sessionStorage.getItem('loggedin_email');
	
		//logout function
	$scope.logout=function(){
		
		var confirmPopup = $ionicPopup.confirm({
			title:'Log Out',
			template: '<p style="text-align:center;">Are you sure to logout ?</p>'
		});

		confirmPopup.then(function(res) {
			if(res) {
				delete sessionStorage.loggedin_name;
				delete sessionStorage.loggedin_phone;
				delete sessionStorage.loggedin_email;
				
				// remove the profile page backlink after logout.
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				
				// After logout you will be redirected to the menu page,with no backlink
				$state.go('firstpage', {}, {location: "replace", reload: true});
			} else {
				console.log('You are not sure');
			}
		});

	};
})

.controller('addCtrl', function($scope,$stateParams,$http,$ionicPopup,$state,$ionicHistory,$cordovaGeolocation,$ionicLoading){

	$scope.show = function() {
		$ionicLoading.show({
		template: '<p>Loading...</p><ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
		});
	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};

	$scope.form={};
	$scope.files=[];
	$scope.insert=function() {

		if (
			$scope.files1 &&
			$scope.files2 &&
			$scope.files3 &&
			$scope.form.nama &&
			$scope.form.deskripsi &&
			$scope.form.kabupaten &&
			$scope.form.alamat &&
			$scope.form.harga &&
			$scope.form.lat &&
			$scope.form.lon
			) {	

		$scope.form.image1=$scope.files1[0];
		$scope.form.image2=$scope.files2[0];
		$scope.form.image3=$scope.files3[0];

		$http({
			method:'POST',
			url:"http://192.168.137.1/api_agrowisata/rekomendasi.php",
			processData:false,
			transformRequest:function(data){
				var formData= new FormData();
				formData.append("image1", $scope.form.image1);
				formData.append("image2", $scope.form.image2);
				formData.append("image3", $scope.form.image3);
				formData.append("nama", $scope.form.nama);
				formData.append("deskripsi", $scope.form.deskripsi);
				formData.append("kabupaten", $scope.form.kabupaten);
				formData.append("alamat", $scope.form.alamat);
				formData.append("harga", $scope.form.harga);
				formData.append("lat", $scope.form.lat);
				formData.append("lon", $scope.form.lon);

				return formData;
			},
			data : $scope.form,
			headers: {
				'Content-Type': undefined
			}
		}).success(function(data){
			$ionicPopup.alert({
				title: 'Message',
				template : '<p style="text-align:center;">'+(data)+'</p>'
			});

			$state.go('tab.home',[],{location:"replace",reload:true});
			
		}).error(function(data){
			$ionicPopup.alert({
				title:'Ooops',
				template: '<p style="text-align:center;">'+(data)+'</p>'
			});
		});

	} else {
		$ionicPopup.alert({
			title : 'Ooops',
			template : '<p style="text-align:center;">Please make sure all forms is filled</p>'
		});
	}

};

	$scope.getLocation=function(){

		$scope.show($ionicLoading);

		var geocoder = new google.maps.Geocoder;
		var options = {timeout: 10000, enableHighAccuracy: true};
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                $scope.form.lat = lat;
                $scope.form.lon = lng;
                console.log(lat,lng);

            geocoder.geocode({'latLng': latlng}, function(results, status){
            	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
	                if(status == google.maps.GeocoderStatus.OK){
	                	$scope.form.alamat = results[0].formatted_address;
					console.log(results[0].formatted_address);
	                }
            	})
            })

            }, function(error){
            	$ionicPopup.alert({
            		title : 'Error',
            		template : '<p style="text-align:center;">Could not find your location</p>'
            	})
            }).finally(function($ionicLoading) { 
		      // On both cases hide the loading
		      $scope.hide($ionicLoading);  
		    }); 



	}

	$scope.uploadedFile1=function(element)
	{
		$scope.currentFile = element.files[0];
	var reader = new FileReader();

	reader.onload = function(event) {
		var output = document.getElementById('output');
		output.src = URL.createObjectURL(element.files[0]);

		$scope.image_source = event.target.result
		$scope.$apply(function($scope){
			$scope.files1 = element.files;
		});
	}
		reader.readAsDataURL(element.files[0]);
	}

	$scope.uploadedFile2=function(element)
	{
		$scope.currentFile = element.files[0];
	var reader = new FileReader();

	reader.onload = function(event) {
		var output = document.getElementById('output2');
		output.src = URL.createObjectURL(element.files[0]);

		$scope.image_source = event.target.result
		$scope.$apply(function($scope){
			$scope.files2 = element.files;
		});
	}
		reader.readAsDataURL(element.files[0]);
	}

	$scope.uploadedFile3=function(element)
	{
		$scope.currentFile = element.files[0];
	var reader = new FileReader();

	reader.onload = function(event) {
		var output = document.getElementById('output3');
		output.src = URL.createObjectURL(element.files[0]);

		$scope.image_source = event.target.result
		$scope.$apply(function($scope){
			$scope.files3 = element.files;
		});
	}
		reader.readAsDataURL(element.files[0]);
	}

	$scope.ClearForm=function(){
		$scope.form.image1 = "";
		$scope.form.image2 = "";
		$scope.form.image3 = "";
		$scope.form.nama = "";
		$scope.form.deskripsi = "";
		$scope.form.kabupaten = "";
		$scope.form.alamat = "";
		$scope.form.harga = "";
		$scope.form.lat = "";
		$scope.form.lon	= "";

		$state.go($state.current,{},{reload:true});
	}
})
 
	

.controller('homeCtrl', function($scope,$http,$timeout,$state,$ionicPopup, $ionicScrollDelegate) {

		$scope.sttButton=false;

		$http.get('http://192.168.137.1/api_agrowisata/selectAgro.php')
		.then(function (response){
			$scope.model_object = response.data;

		});

		$http.get('http://192.168.137.1/api_agrowisata/countComment.php')
		.then(function (response){
			$scope.count_comment = response.data;

		});

		
		$scope.scrollToTop = function() {//ng-click for back to top button
		  $ionicScrollDelegate.scrollTop(animate=true);
		  $scope.sttButton=false;
		};

		 $scope.getScrollPosition = function() {
		 //monitor the scroll
		  var moveData = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
		  // console.log(moveData);
		    
		      if(moveData>150 && $scope.sttButton==false){
		        $scope.$apply(function(){
		          $scope.sttButton=true;
		        });//apply
		      }
		      if(moveData < 150 && $scope.sttButton == true) {
				$scope.$apply(function() {
				$scope.sttButton = false;
				});
			  }
		  };

		$scope.doRefresh = function () {
		$http.get("http://192.168.137.1/api_agrowisata/selectAgro.php")
		.then(function (response){
			$scope.model_object = response.data;

		$http.get('http://192.168.137.1/api_agrowisata/countComment.php')
		.then(function (response){
			$scope.count_comment = response.data;

		});

		});
			console.log('Refreshing!');
			$timeout(function() {
				 $scope.$broadcast('scroll.refreshComplete');
			},1000);

		};

		$scope.showAgroInfo=function(id, nama, deskripsi, kabupaten, alamat, harga, lat, lon, gambar1, gambar2, gambar3, status) {
			sessionStorage.setItem('agro_info_id', id);
			sessionStorage.setItem('agro_info_nama', nama);
			sessionStorage.setItem('agro_info_deskripsi', deskripsi);
			sessionStorage.setItem('agro_info_kabupaten', kabupaten);
			sessionStorage.setItem('agro_info_alamat', alamat);
			sessionStorage.setItem('agro_info_harga', harga);
			sessionStorage.setItem('agro_info_lat', lat);
			sessionStorage.setItem('agro_info_lon', lon);
			sessionStorage.setItem('agro_info_gambar1', gambar1);
			sessionStorage.setItem('agro_info_gambar2', gambar2);
			sessionStorage.setItem('agro_info_gambar3', gambar3);
			sessionStorage.setItem('agro_info_status', status);
			$state.go('tab.detailagro',{reload:true});
		};

		$scope.showAgroDet=function(id, nama, deskripsi, kabupaten, alamat, harga, lat, lon, gambar1, gambar2, gambar3, status) {
			sessionStorage.setItem('agro_info_id', id);
			sessionStorage.setItem('agro_info_nama', nama);
			sessionStorage.setItem('agro_info_deskripsi', deskripsi);
			sessionStorage.setItem('agro_info_kabupaten', kabupaten);
			sessionStorage.setItem('agro_info_alamat', alamat);
			sessionStorage.setItem('agro_info_harga', harga);
			sessionStorage.setItem('agro_info_lat', lat);
			sessionStorage.setItem('agro_info_lon', lon);
			sessionStorage.setItem('agro_info_gambar1', gambar1);
			sessionStorage.setItem('agro_info_gambar2', gambar2);
			sessionStorage.setItem('agro_info_gambar3', gambar3);
			sessionStorage.setItem('agro_info_status', status);
			$state.go('tab.map',{},{reload:true});
		};

		$scope.showCommentDet=function(id, nama, deskripsi, kabupaten, alamat, harga, lat, lon, gambar1, gambar2, gambar3, status) {
			sessionStorage.setItem('agro_info_id', id);
			sessionStorage.setItem('agro_info_nama', nama);
			sessionStorage.setItem('agro_info_deskripsi', deskripsi);
			sessionStorage.setItem('agro_info_kabupaten', kabupaten);
			sessionStorage.setItem('agro_info_alamat', alamat);
			sessionStorage.setItem('agro_info_harga', harga);
			sessionStorage.setItem('agro_info_lat', lat);
			sessionStorage.setItem('agro_info_lon', lon);
			sessionStorage.setItem('agro_info_gambar1', gambar1);
			sessionStorage.setItem('agro_info_gambar2', gambar2);
			sessionStorage.setItem('agro_info_gambar3', gambar3);
			sessionStorage.setItem('agro_info_status', status);
			$state.go('tab.comments',{reload:true});
		};

		$scope.like=function(id) {
			sessionStorage.setItem('agro_info_id', id);
			$scope.idAgro = sessionStorage.getItem('agro_info_id');
			$scope.idMember = sessionStorage.getItem('loggedin_id');
			var url ="http://192.168.137.1/api_agrowisata/";

			var idAgro = $scope.idAgro;
			var idMember = $scope.idMember;

			if(idAgro && idMember){
				str = url+"addLike.php?idAgro="+idAgro+"&idMember="+idMember;
				$http.get(str)
				.success(function(response){
					if(response==true){
						$ionicPopup.alert({
							title:'Thankyou',
							template:'Thanks for like this post'
						});

						$state.go($state.current, {}, {reload: true});

					} else if (response==false) {
						$ionicPopup.alert({
							title:'Oops',
							template:'You already like this post'
						});
					} else {
						$ionicPopup.alert({
							title:'Error',
							template:'undefined Error'
						});
					}
				})
			} 

		};
})

.controller('detailCtrl', function($scope, $timeout) {
	angular.element(document).ready(function(){
		$scope.id =  sessionStorage.getItem('agro_info_id');
		$scope.nama =  sessionStorage.getItem('agro_info_nama');
		$scope.deskripsi =  sessionStorage.getItem('agro_info_deskripsi');
		$scope.kabupaten =  sessionStorage.getItem('agro_info_kabupaten');
		$scope.alamat =  sessionStorage.getItem('agro_info_alamat');
		$scope.harga =  sessionStorage.getItem('agro_info_harga');
		$scope.lat =  sessionStorage.getItem('agro_info_lat');
		$scope.lon =  sessionStorage.getItem('agro_info_lon');
		$scope.gambar1 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar1');
		$scope.gambar2 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar2');
		$scope.gambar3 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar3');
		$scope.status =  sessionStorage.getItem('agro_info_status');
	});

	$scope.doRefresh = function () {
	angular.element(document).ready(function(){
		$scope.id =  sessionStorage.getItem('agro_info_id');
		$scope.nama =  sessionStorage.getItem('agro_info_nama');
		$scope.deskripsi =  sessionStorage.getItem('agro_info_deskripsi');
		$scope.kabupaten =  sessionStorage.getItem('agro_info_kabupaten');
		$scope.alamat =  sessionStorage.getItem('agro_info_alamat');
		$scope.harga =  sessionStorage.getItem('agro_info_harga');
		$scope.lat =  sessionStorage.getItem('agro_info_lat');
		$scope.lon =  sessionStorage.getItem('agro_info_lon');
		$scope.gambar1 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar1');
		$scope.gambar2 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar2');
		$scope.gambar3 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar3');
		$scope.status =  sessionStorage.getItem('agro_info_status');

		});
			console.log('Refreshing!');
			$timeout(function() {
				 $scope.$broadcast('scroll.refreshComplete');
			},1000);

		};
})

.controller('CommentCtrl', function($scope,$stateParams,$http,$ionicPopup,$state, $window){
		$scope.idAgro =  sessionStorage.getItem('agro_info_id');
		$scope.idMember = sessionStorage.getItem('loggedin_id');

		var url ="http://192.168.137.1/api_agrowisata/";

		$http.get(url+"selectComment.php?idAgro="+$scope.idAgro)
		.then(function (response){
			$scope.item_comment = response.data;

		});

		$scope.form={};
		$scope.addComment=function(){
			var idAgro = $scope.idAgro;
			var idMember = $scope.idMember;
			var comment = $scope.form.Comments;

			if(idAgro && idMember && comment) {
				str = url+"addComment.php?idAgro="+idAgro+"&idMember="+idMember+"&comment="+comment;
				$http.get(str)
				.success(function(response){
					if(response==true){
						$ionicPopup.alert({
							title:'Message',
							template:'<p style="text-align:center;">Comment Added</p>'
						});

						$state.go($state.current,{},{reload:true});

					} else {
						$ionicPopup.alert({
							title:'Error',
							template:'<p style="text-align:center;">Comment cannot be added</p>'
						});
					}
				}).error(function(){
					$ionicPopup.alert({
						title:'Error',
						template:'<p style="text-align:center;">Comment cannot be added</p>'
					});
				})

			} else {
				$ionicPopup.alert({
				title:"Oopps!",
				template:"<p style='text-align:center;'>Comment form must be filled !</p>"
			});
			}
		};

		$scope.backButton = function(){
			$state.go('tab.home',[],{location:"replace",reload:true});
		};
})



.controller('MapCtrl', function($scope, $state, $cordovaGeolocation,$ionicPopup, $ionicLoading) {

angular.element(document).ready(function(){
	$scope.id =  sessionStorage.getItem('agro_info_id');
	$scope.nama =  sessionStorage.getItem('agro_info_nama');
	$scope.deskripsi =  sessionStorage.getItem('agro_info_deskripsi');
	$scope.kabupaten =  sessionStorage.getItem('agro_info_kabupaten');
	$scope.alamat =  sessionStorage.getItem('agro_info_alamat');
	$scope.harga =  sessionStorage.getItem('agro_info_harga');
	$scope.lat =  sessionStorage.getItem('agro_info_lat');
	$scope.lon =  sessionStorage.getItem('agro_info_lon');
	$scope.gambar1 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar1');
	$scope.gambar2 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar2');
	$scope.gambar3 =  "http://192.168.137.1/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar3');
	$scope.status =  sessionStorage.getItem('agro_info_status');
});

$scope.show = function() {
	$ionicLoading.show({
	template: '<p>Loading...</p><ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
	});
};

$scope.hide = function(){
	$ionicLoading.hide();
};

	
    $scope.direction= function() {

    $scope.show($ionicLoading);

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var markerArray = [];
    var stepDisplay = new google.maps.InfoWindow;

        directionsDisplay = new google.maps.DirectionsRenderer();
        var options = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        $scope.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
	      center: $scope.latLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsDisplay.setMap(map);     

        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map); 



     function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {

	  var end = new google.maps.LatLng($scope.lat, $scope.lon);
	  var request = {
	      origin: $scope.latLng,
	      destination: end,
	      travelMode: google.maps.TravelMode.DRIVING
	  };
	  directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      document.getElementById('warnings-panel').innerHTML =
                '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);
            showSteps(response, markerArray, stepDisplay, map);	    }
	  });
	}

	function showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(myRoute.steps[i].start_location);
          attachInstructionText(
              stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
      }

      function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text
          // of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, marker);
        });
      }

    	}, function(error){
    		$ionicPopup.alert({
    			title:'Error',
    			template: '<p style="text-align:center;">Can Not Find Your Location</p>'
    		});
    	}).finally(function($ionicLoading) { 
		      // On both cases hide the loading
		      $scope.hide($ionicLoading);  
		    }); 
    };
    

    /*

    $scope.direction= function() {

    $scope.show($ionicLoading);

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

        directionsDisplay = new google.maps.DirectionsRenderer();
        var options = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        $scope.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
	      center: $scope.latLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsDisplay.setMap(map);      


	  var end = new google.maps.LatLng($scope.lat, $scope.lon);
	  var request = {
	      origin: $scope.latLng,
	      destination: end,
	      travelMode: google.maps.TravelMode.DRIVING
	  };
	  directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	    }
	  });

    	}, function(error){
    		$ionicPopup.alert({
    			template: 'Error',
    			title:'Can Not Find Your Location'
    		});
    	}).finally(function($ionicLoading) { 
		      // On both cases hide the loading
		      $scope.hide($ionicLoading);  
		    });
    };
    */


    $scope.location = function(){

    $scope.show($ionicLoading);

    var options = {timeout: 10000, enableHighAccuracy: true};

	 
	  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
	    var latLng = new google.maps.LatLng($scope.lat, $scope.lon);
	 
	    var mapOptions = {
	      center: latLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	 	
	    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);   

	    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
	 
			var marker = new google.maps.Marker({
			  map: $scope.map,
			  animation: google.maps.Animation.DROP,
			  position: latLng,
			  draggable: false
			});

			var direction = '<a href = "https://www.google.com/maps?saddr=My+Location&daddr='+$scope.lat+','+$scope.lon+'">'+$scope.nama+ '</a>'  
			var infoWindow = new google.maps.InfoWindow({
			      content: direction
			});
	 
		google.maps.event.addListener(marker, 'click', function () {
		  infoWindow.open($scope.map, marker);
		});
	 
		});
	 
	  }, function(error){
	    $ionicPopup.alert({
			title: 'Error',
			template:'<p style="text-align:center;">Can Not Find Your Location</p>'
		});
	  }).finally(function($ionicLoading) { 
		      // On both cases hide the loading
		      $scope.hide($ionicLoading);  
		    }); 

	};

	$scope.backButton = function(){
	$state.go('tab.home',[],{location:"replace",reload:true});
};

});
