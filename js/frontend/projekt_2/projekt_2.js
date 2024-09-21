var watchId = null;
var map = null;
var loc = document.getElementById("location");
var ourCoords =  {
	latitude: 49.926,
	longitude: 9.0068
};
var prevCoords = null;

//window.onload = getMyLocation;

function frontend_projekt_2_begins_wert() {
//	var interval = setInterval(getMyLocation, 50000);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(displayLocation,displayError); 

	}
	else {
		alert("Geo Location wird von Ihrem Browser leider nicht unterstützt");
	}
}

function displayLocation(position) {

	var openweathermap_weatherKey = 'cd040ad334dcc1b5bc83ea13a4d9d294';

	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

//	var weatherUrl = "http://openweathermap.org/api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+openweathermap_weatherKey+"&units=metric";

//	var weatherUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+openweathermap_weatherKey+"&units=metric";

var weatherUrl = "https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+openweathermap_weatherKey+"&units=metric";




	$.ajax({
	url : weatherUrl,
	type: 'GET',
	dataType : 'json',

	success : function(data) {

	var city = data["name"];  
	var tempC = data.main['temp'];
	var iconCode = data.weather[0].icon;
	var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

	$('#city_info').text("Sie sind in "+ city); 
	$('#wetter_info').text("Momentan ist "+ Math.round(tempC) +" °C");  

	var oldScriptElement = document.getElementById("loc_img");

	if (oldScriptElement == null) {	
		$('#loc_img').prepend("<img src='" + iconUrl  + "'>");
	}
	else 
	{
		oldScriptElement.innerHTML = '';
		$('#loc_img').prepend("<img src='" + iconUrl  + "'>");
	}
	}

	});


	loc.innerHTML = "Breitengrad: " + Math.round(latitude * 1000) / 1000 + "°<br> Längengrad: " + Math.round(longitude * 1000) / 1000 + '°';
	loc.innerHTML += "<br> Genauigkeit Ihrer Location ist etwa " + position.coords.accuracy  + " m *";

    var km = computeDistance(position.coords, ourCoords); 
	var distance = document.getElementById("distance");  
	distance.innerHTML = "<br>Ihre Location ist etwa " + Math.round(km) + " km von meinem zu Hause entfernt";

	if (map == null) {
		showMap(position.coords);
		prevCoords = position.coords;
	}
	else {
		var meters = computeDistance(position.coords, prevCoords) * 1000;
		if (meters > 10) {
			scrollMapToPosition(position.coords);
			prevCoords = position.coords;
		}
	}


	var projekt_2_text = document.getElementById("projekt_2_text");
	projekt_2_text.style.visibility = 'visible';

	var watchButton = document.getElementById("watch");
	watchButton.onclick = watchLocation;
	watchButton.style.visibility = 'visible';


	var clearWatchButton = document.getElementById("clearWatch");
	clearWatchButton.onclick = clearWatch;
	clearWatchButton.style.visibility = 'visible';
}


function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}


function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, 
												  coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	mapDiv.style.borderStyle = "1px solid black";
	//mapDiv.style.width = "430px";
	//mapDiv.style.height = "430px";
	mapDiv.style.margin = "10px 0 20px 0";

	map = new google.maps.Map(mapDiv, mapOptions);

	// add the user marker
	var title = "Ihre Location";

	var content = "Sie sind hier: " + Math.round(coords.latitude * 1000) / 1000 + ", " + Math.round(coords.longitude * 1000) / 1000;
	addMarker(map, googleLatAndLong, title, content);

			$(document).ready(
            function() {
                setInterval(function() {
                 	
                	var currentDate = new Date();

                	var hh = currentDate.getHours();
                	if (hh<10) hh  = "0"+""+hh;

                	var min = currentDate.getMinutes();
                 	if (min<10) min = "0"+""+min;

                 	var ss = currentDate.getSeconds(); 
                 	if (ss<10) ss = "0"+""+ss;


                    $('#time').text(
                            "Lokalzeit: "+ hh +":"+ min +":"+ ss);
                }, 1);
            });

}

function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);

	var infoWindowOptions = {
		content: content,
		position: latlong
	};

	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map);
	});
}

function displayError(error) {
	var errorTypes = {
		0: "Fehler: Es wurde ein unbekannter Fehler aufgetreten",
		1: "Den Zugriff zum Definieren von Ihrer Location wurde leider verweigert",
		2: "Position is not available",
		3: "Request timeout"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}   
  //  document.getElementById('exportButton_pdf_3').style.visibility = 'hidden';

	//var div = document.getElementById("location");

	loc.innerHTML = errorMessage;
}


//
// Code to watch the user's location
//
function watchLocation() {

	var dialog = bootbox.dialog({
    message: '<p class="text-center">Ab jetzt können Sie sich bewegen und auf die Karte anschauen wie Ihr Reiseweg aussieht. Wenn Sie fertig mit Ihrer Reise sind drücken Sie bitte den Knopf "Reise stoppen"</p>',
    closeButton: false
});

setTimeout(function() {
    // that's enough of that
    dialog.modal('hide');
}, 9000)


watchId = navigator.geolocation.watchPosition(
					displayLocation, 
					displayError);
}

function scrollMapToPosition(coords) {
	var latitude = coords.latitude;
	var longitude = coords.longitude;

	var latlong = new google.maps.LatLng(latitude, longitude);
	map.panTo(latlong);

	// add the new marker
	addMarker(map, latlong, "Ihre neue Location", "Sie bewegen sich zur " + 
								Math.round(coords.latitude * 1000) / 1000 + ", " + Math.round(coords.longitude * 1000) / 1000);
}

function clearWatch() {
	if (watchId) {
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}
