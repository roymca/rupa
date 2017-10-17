//Cordova Ionic bar code scanner App

var myapp = angular.module('starter', ['ionic', 'ngCordova'])

myapp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


myapp.config(function($stateProvider, $urlRouterProvider) {

		  $stateProvider.state('home', {
			cache:false,
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: 'homeCtrl'   
		  });
		  
		  $stateProvider.state('about', {
			cache:false,
			url: '/about',
			templateUrl: 'templates/about.html',
			controller: 'aboutCtrl'   
		  });
		  
		  $stateProvider.state('brand', {
			cache:false,
			url: '/brand',
			templateUrl: 'templates/brand.html',
			//controller: 'brandCtrl'   
		  });

		  //console.log("1");
		$urlRouterProvider.otherwise('/home');
	});


	
	
myapp.controller('menuCtrl', function($scope, $state){
		$scope.home=function(){
			console.log("Home Controll");
			$state.go('home');
		}
		
		$scope.about=function(){
			$state.go('about');
		}
		
		$scope.brand=function(){
			$state.go('brand');
		}
	})


myapp.controller("homeCtrl", function($scope, $ionicPopup, $cordovaBarcodeScanner) {
 
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            //alert(imageData.text);
			console.log("Scan successful");
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
			
			if(imageData.cancelled === false){
				var scanResult = imageData.text;
					
					if((scanResult.indexOf(':') > -1)){
					   var codeType = scanResult.split(':'); 
					   // if imageData is an url
						if(codeType[1].charAt(0) === '/'){
							resultType = 'url';
							resultHeaderText = 'FOUND URL';
						
							var row1 = '<div class="list row padding" style="font-size:20px"><i class="icon ion-link" style="color:#e51219"></i> &nbsp URL Details</div>';
							var row2 = '<div class="list row padding" style="overflow:scroll"><input type="hidden" id="result-value" value="'+scanResult+'">'+scanResult+'</div>';
							var row3 = '<div class="list row padding"><button id="action-button" class="w3-button w3-white w3-border w3-block w3-border-red w3-round-large"><i class="icon ion-link" style="font-size:20px"></i>&nbsp OPEN IN BROWSER</button></div>';
						
							var finalDisplay = row1+row2+row3;
						}
						
						
						if(codeType[1].charAt(0) !== '/'){
							
							resultHeaderText = 'URL Not Found!';
							var finalDisplay = '';
						}
					}
					
					else{
						// plain text
						resultType = 'text';
						resultHeaderText = 'URL Not Found!'; 
						
						
						var finalDisplay = '';
					}

					var scanResultHeader = document.getElementById('scan-result-header');
					scanResultHeader.innerHTML = resultHeaderText;

					var readResult = document.getElementById('scanResult');
					readResult.innerHTML = finalDisplay;
					
					actionAfterResult(resultType);
					
			}		   		   
        }, function(error) {
            console.log("An error happened -> " + error);
			
			var alertPopup = $ionicPopup.alert({
				 title: 'Warning!',
				 template: 'An error has occurred!'
			  });

			  alertPopup.then(function(res) {
				 // Custom functionality....
			  });
		});
    };
	
	
	
	function actionAfterResult(type){
		var actionButton  = document.getElementById('action-button');
		if(type === 'url'){
			actionButton.addEventListener('click',function(){
				var location = document.getElementById('result-value');
				window.open(location.value, "_system");
			});
			
			return false;
		}
    }
	
})


myapp.controller("aboutCtrl", function($scope, $state) {
 
   
 
})
