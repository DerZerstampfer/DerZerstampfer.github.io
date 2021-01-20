var mymap = L.map('mapid').setView([49.204217122198, 8.041906356811523], 13);

if (localStorage.getItem('mapId') == '' || !localStorage.getItem('mapId')) {
    localStorage.setItem('mapId', 'mapbox/dark-v10')
}

setTileStyle();

var markSize = 12;
var iconPos = ((512/markSize) / 4)*-1;

var truckIcon = L.icon({
    iconUrl: 'truck.svg',

    iconSize:     [512/markSize, 512/markSize], // size of the icon
    iconAnchor:   [256/markSize, 256/markSize], // point of the icon which will correspond to marker's location
    popupAnchor:  [-4, iconPos] // point from which the popup should open relative to the iconAnchor
});

L.marker([49.204217122198, 8.041909356811523], {icon: truckIcon}).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.");

    addTruck([49.205833, 8.073772], "Bernd");
    jens = addTruck([49.267789, 8.085611], "Jens");
    addTruck([49.209403, 8.184875], "Bernd");
    
    function onMapClick(e) {
        document.getElementById("geo").innerHTML = e.latlng;
        if (localStorage.getItem('mapId') == 'mapbox/dark-v10') {
            localStorage.setItem('mapId', 'mapbox/streets-v11');
            setTileStyle();
        } else {
            localStorage.setItem('mapId', 'mapbox/dark-v10');
            setTileStyle();
        }
    }
    
    mymap.on('click', onMapClick);

    function setTileStyle(id) {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVyemVyc3RhbXBmZXIiLCJhIjoiY2tqN2pxMXR1MG8xazJwcnU4enZia3hqNCJ9.I4mAP-xy-s0VoI5CwgXayA', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: localStorage.getItem('mapId'),
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);
    }

    function changeCLicked(marker) {
        document.getElementById("geo").innerHTML = marker.alt;
        console.log(marker.alt);
        mymap.fitBounds(marker.getBounds());
    }

    function addTruck(pos, name) {

        var latlngs = [
            pos,
            [pos[0]-0.008, pos[1]+0.008],
            [pos[0]-0.009, pos[1]+0.0245],
            [pos[0]-0.018, pos[1]+0.018]
        ];

        var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);

        var marker = L.marker(pos, {icon: truckIcon}).addTo(mymap)
            .bindPopup("<b>Hello world!</b><br />I am " + name);
        marker.alt = name;
        marker.on('click', function() {
            changeCLicked(marker)
        });
        return marker;
    }