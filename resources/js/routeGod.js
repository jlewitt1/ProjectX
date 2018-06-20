GreenPath = {};

// **************** Map Route Display *******************
GreenPath.updateRouteParameters = () => {
    GreenPath.waypts = [{ location: "chicago, il", stopover: true }, { location: "st louis, mo", stopover: true }];
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