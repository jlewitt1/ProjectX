GreenPath = {};

$('#submit').click(function() {
    GreenPath.calculateRoute();
});

GreenPath.calculateRoute = () => {
    console.log("submit clicked");
    let userSettings = {
        startLocation: [10, 10],
        endLocation: [20,20],
        distance: 15
    }
    userSettings.startLocation = $('#start').val()
    userSettings.endLocation = $('#end').val()
    userSettings.distance = $('#range').val()
    
    $.post("/newroute", { "userPreferences": JSON.stringify(userSettings) }, function (result) {
        if (result["STATUS"] == "ERROR") {
            alert(result["MSG"]);
        } else {
            console.log(JSON.stringify(result));
            // GreenPath.updateRouteParameters(result["WAYPOINTS"]);
        }
    }, "json");
    return false;
}

// **************** Map Route Display *******************

GreenPath.updateRouteParameters = (waypointArray) => {
    for (let waypt in waypointArray) {
        GreenPath.waypts.push({
            location: new google.maps.LatLng(waypt.latitude, waypt.longitude),
            stopover: true
        });
    }
    // GreenPath.waypts = [{ location: "chicago, il", stopover: true }, { location: "st louis, mo", stopover: true }];
    GreenPath.startPoint = document.getElementById('start').value;
    GreenPath.endPoint = document.getElementById('end').value;
}

initMap = () => {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        GreenPath.displayRouteOnMap(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

GreenPath.displayRouteOnMap = (directionsService, directionsDisplay) => {
    GreenPath.updateRouteParameters();
    directionsService.route({
        origin: GreenPath.startPoint,
        destination: GreenPath.endPoint,
        travelMode: 'WALKING',
        waypoints: GreenPath.waypts,
        optimizeWaypoints: false
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}