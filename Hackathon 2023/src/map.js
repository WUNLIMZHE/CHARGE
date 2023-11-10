// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkQIwSNERatxV9hI7avboGFsSqlqcMOfw",
  authDomain: "public-charger-port.firebaseapp.com",
  databaseURL: "https://public-charger-port-default-rtdb.firebaseio.com",
  projectId: "public-charger-port",
  storageBucket: "public-charger-port.appspot.com",
  messagingSenderId: "307782772004",
  appId: "1:307782772004:web:a6f0832f1b53ae83307fb1",
  measurementId: "G-C85K43YWMT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()

function initMap() {

  // Customize the map further if needed
  // Example: Adding a marker
  var marker = new google.maps.Marker({
    position: { lat: -34.397, lng: 150.644 },
    map: map,
    title: 'Marker Title'
  });

  // Add a marker for Penang
  var marker = new google.maps.Marker({
    position: penang,
    map: map,
    title: 'Penang, Malaysia'
  });

  // Add an info window to display additional information when the marker is clicked
  var infoWindow = new google.maps.InfoWindow({
    content: 'Penang, Malaysia'
  });

  // Open the info window when the marker is clicked
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
  
  // Reference to the ChargingLocations node in the database
  var chargingLocationsRef = database.ref('ChargingLocations/' + charger_address);

  // Retrieve data from Firebase and plot markers
  chargingLocationsRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var location = childSnapshot.val();
      
      // Use the Geocoding service to convert address to coordinates
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location.address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: location.name
          });

          // Add an info window to display the address when the marker is clicked
          var infoWindow = new google.maps.InfoWindow({
            content: location.address
          });

          marker.addListener('click', function() {
            infoWindow.open(map, marker);
          });
        } else {
          console.error('Geocoding failed:', status);
        }
      });
    });
  });
}

// Import the Google Maps JavaScript API library
// import { GoogleMap, Marker, InfoWindow } from "@googlemaps/react-wrapper";

// Create a Firebase reference to the public charger port data
// const database = firebase.database();
// const chargerPortRef = database.ref("ChargingLocations");

// Initialize the Google Maps map
// const map = useRef(null);

// Create a marker for the public charger port
// const marker = useRef(null);

// Create an info window for the public charger port
// const infoWindow = useRef(null);

// Update the marker and info window whenever the public charger port data changes
// chargerPortRef.on("value", (snapshot) => {
//   const chargerPortData = snapshot.val();

//   const chargerPortLocation = new google.maps.LatLng(
//     chargerPortData.latitude,
//     chargerPortData.longitude
//   );

//   marker.current.setPosition(chargerPortLocation);

//   infoWindow.current.setContent(`
//     <h2>${chargerPortData.charging_place}</h2>
//     <p>${chargerPortData.charge_type}</p>
//     <p>${chargerPortData.operating_hour}</p>
//   `);
// });

// Render the Google Maps map
// return (
//   <GoogleMap
//     ref={map}
//     center={{ lat: 5.3522, lng: 100.2931 }}
//     zoom={12}
//   >
//     <Marker ref={marker} position={{ lat: 5.3517, lng: 100.3006 }} />
//     <InfoWindow ref={infoWindow} />
//   </GoogleMap>
// );