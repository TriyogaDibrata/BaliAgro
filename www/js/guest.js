angular.module('starter.guest',[])

.controller('homeGuestCtrl', function($scope,$http,$timeout,$state,$ionicPopup, $ionicScrollDelegate) {

		$scope.sttButton=false;

		$http.get('http://10.164.160.99/api_agrowisata/selectAgro.php')
		.then(function (response){
			$scope.model_object = response.data;

		});

		$scope.scrollToTop = function() {//ng-click for back to top button
		  $ionicScrollDelegate.scrollTop();
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
		$http.get("http://10.164.160.99/api_agrowisata/selectAgro.php")
		.then(function (response){
			$scope.model_object = response.data;

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
			$state.go('guest-detailagro',{reload:true});
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
			$state.go('guest-map',{},{reload:true});
		};
})

.controller('guestDetailCtrl', function($scope, $timeout) {
	angular.element(document).ready(function(){
		$scope.id =  sessionStorage.getItem('agro_info_id');
		$scope.nama =  sessionStorage.getItem('agro_info_nama');
		$scope.deskripsi =  sessionStorage.getItem('agro_info_deskripsi');
		$scope.kabupaten =  sessionStorage.getItem('agro_info_kabupaten');
		$scope.alamat =  sessionStorage.getItem('agro_info_alamat');
		$scope.harga =  sessionStorage.getItem('agro_info_harga');
		$scope.lat =  sessionStorage.getItem('agro_info_lat');
		$scope.lon =  sessionStorage.getItem('agro_info_lon');
		$scope.gambar1 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar1');
		$scope.gambar2 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar2');
		$scope.gambar3 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar3');
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
		$scope.gambar1 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar1');
		$scope.gambar2 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar2');
		$scope.gambar3 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar3');
		$scope.status =  sessionStorage.getItem('agro_info_status');

		});
			console.log('Refreshing!');
			$timeout(function() {
				 $scope.$broadcast('scroll.refreshComplete');
			},1000);

		};
})

.controller('guestMapCtrl', function($scope, $cordovaGeolocation,$ionicPopup) {

angular.element(document).ready(function(){
	$scope.id =  sessionStorage.getItem('agro_info_id');
	$scope.nama =  sessionStorage.getItem('agro_info_nama');
	$scope.deskripsi =  sessionStorage.getItem('agro_info_deskripsi');
	$scope.kabupaten =  sessionStorage.getItem('agro_info_kabupaten');
	$scope.alamat =  sessionStorage.getItem('agro_info_alamat');
	$scope.harga =  sessionStorage.getItem('agro_info_harga');
	$scope.lat =  sessionStorage.getItem('agro_info_lat');
	$scope.lon =  sessionStorage.getItem('agro_info_lon');
	$scope.gambar1 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar1');
	$scope.gambar2 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar2');
	$scope.gambar3 =  "http://10.164.160.99/agrowisata/uploads/"+sessionStorage.getItem('agro_info_gambar3');
	$scope.status =  sessionStorage.getItem('agro_info_status');
});


    $scope.direction= function() {
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
    	});
    };

});
