import React, {Component} from 'react';
import LocationList from './LocationList';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'alllocations': [
                {
                    'name': "Costa Coffee",
                    'latitude': 29.9745586,
                    'longitude': 30.9423731,
                },
                {
                    'name': "Bel Mondo Café",
                    'latitude': 29.972696,
                    'longitude': 30.952188,
                },
                {
                    'name': "Cascade",
                    'latitude': 29.9748732,
                    'longitude': 30.9438362,
                },
                {
                    'name': "Beano's Cafe",
                    'latitude': 29.9817344,
                    'longitude': 30.9476232,
                },
                {
                    'name': "Starbucks",
                    'latitude': 29.9633756,
                    'longitude': 30.9267778,
                },
                {
                    'name': "Arabian Cafe",
                    'latitude': 29.9739804,
                    'longitude': 30.9480546,
                },
                {
                    'name': "Broummana",
                    'latitude': 29.9725573,
                    'longitude': 30.9528581,
                }
            ],
            'map': '',
            'infowindow': '',
            'prevmarker': ''
        };

        // retain object instance when used in function
        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        // Connect initMap() function within this class to global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load Google Maps script, passing in the callback reference
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyArsEOqvTbI-0SLOnfiwCvF9N4jE19ZN18&callback=initMap')
    }

    /**
     * Initialize map
     */
    initMap() {
        const self = this;

        const mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        const map = new window.google.maps.Map(mapview, {
            center: {lat: 29.9858556, lng: 30.936976},
            zoom: 13,
            mapTypeControl: false
        });

        const InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            const center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });

        const alllocations = [];
        this.state.alllocations.forEach(function (location) {
            const longname = location.name;
            const marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            alllocations.push(location);
        });
        this.setState({
            'alllocations': alllocations
        });
    }

    /**
     * Open marker infowindow
     */
    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }

    /**
     * Retrieve location data from foursquare api and display it in infowindow
     */
    getMarkerInfo(marker) {
        const self = this;
        const clientId = "IS240AO2XOZRK3UCUKMYP5KUH5551VLRAXVGAQCJKZHN04RH";
        const clientSecret = "DCMIWF5DNZJTM2ZAWXX1A52YJEY53K0TER31YHJBUU34EBLX";
        const url = "https://api.foursquare.com/v2/venues/search?ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&client_id=" + clientId  + "&client_secret=" + clientSecret + "&v=20180323&limit=1";

        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }

                    // Examine text in response
                    response.json().then(function (data) {
                        const location_data = data.response.venues[0];
                        const name = '<b>Name: </b>' + location_data.name + '<br>';
                        const address = '<b>Address: </b>' + location_data.location.address + '<br>';
                        const category = '<b>Category: </b>' + location_data.categories[0].name + '<br>';
                        const readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Foursquare Page</a>'
                        self.state.infowindow.setContent(name + address + category + readMore);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry data can't be loaded");
            });
    }

    /**
     * Close marker infowindow
     */
    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    /**
     * Render function of App
     */
    render() {
        return (
            <div>
                <LocationList key="100" alllocations={this.state.alllocations} openInfoWindow={this.openInfoWindow}
                              closeInfoWindow={this.closeInfoWindow}/>
                <div id="map"></div>
            </div>
        );
    }
}

export default App;

/**
 * Load google maps Asynchronously
 */
function loadMapJS(src) {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}