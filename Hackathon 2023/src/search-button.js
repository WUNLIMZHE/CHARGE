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


// Function to search for a charging location in Firebase
function searchChargingLocation() {
  var chargingPlace = document.getElementById('charging_place').value;

  // Check if charging_place is empty
  if (!chargingPlace.trim()) {
    alert('Please enter a valid charging place.');
    return;
  }

  // Convert the user input to lowercase
  chargingPlace = chargingPlace.toUpperCase();

  // Reference the charging place in the database
  var placeRef = database.ref('ChargingLocations/' + chargingPlace);

  // Attach a value listener to the placeRef
  placeRef.once('value', function(snapshot) {
    if (snapshot.exists()) {
      alert('Charging place ' + chargingPlace + ' exists.');
    } else {
      // Charging place does not exist, display error message
      alert('Charging place ' + chargingPlace + ' does not exist.');
    }
  });
}

