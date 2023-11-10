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

function save() {
  var charging_place = document.getElementById('charging_place').value
  var charge_type = document.getElementById('charge_type').value
  var charger_address = document.getElementById('charger_address').value
  var operating_hour = document.getElementById('operating_hour').value

  // Check if any of the required fields are left blank
  if (!charging_place || !charge_type || !charger_address || !operating_hour) {
    alert('Please fill in all required fields');
    return; // Exit the function without saving data
  }

  database.ref('contactForm/' + charging_place).set({
    charging_place: charging_place,
    charge_type: charge_type,
    charger_address: charger_address,
    operating_hour: operating_hour
  });

  alert('Saved');
}

function get() {
  var chargingPlace = document.getElementById('charging_place').value;

  // Check if charging_place is empty
  if (!chargingPlace.trim()) {
    alert('Please enter a valid charging place.');
    return;
  }

  // Reference the charging place in the database
  var placeRef = database.ref('contactForm/' + chargingPlace);

  // Attach a value listener to the placeRef
  placeRef.on('value', function(snapshot) {
    if (snapshot.exists()) {
      // Charging place exists, retrieve data
      var data = snapshot.val();
      var chargeType = data.charge_type;
      var chargerAddress = data.charger_address;
      var operatingHour = data.operating_hour;

      // Display retrieved data
      document.getElementById('charge_type').value = chargeType;
      document.getElementById('charger_address').value = chargerAddress;
      document.getElementById('operating_hour').value = operatingHour;
    } else {
      // Charging place does not exist, display error message
      alert('Charging place ' + chargingPlace + ' does not exist.');
    }
  });
}

function update() {
  var chargingPlace = document.getElementById('charging_place').value;
  var chargeType = document.getElementById('charge_type').value;
  var chargerAddress = document.getElementById('charger_address').value;
  var operatingHour = document.getElementById('operating_hour').value;

  // Check if any of the required fields are left blank
  if (!chargingPlace) {
    alert('Please fill in place to charge');
    return; // Exit the function without saving data
  }

  // Check if the place exists in the database
  database.ref('contactForm/' + chargingPlace).once('value').then(function(snapshot) {
    if (snapshot.exists()) {
      // Place exists, proceed with updating the data
      database.ref('contactForm/' + chargingPlace).set({
        charging_place: chargingPlace,
        charge_type: chargeType,
        charger_address: chargerAddress,
        operating_hour: operatingHour
      });

      alert('Updated');
    } else {
      // Place does not exist, display an error message
      alert('Place ' + chargingPlace + ' does not exist, and it cannot be updated.');
    }
  }).catch(function(error) {
    console.error('Error checking place existence:', error);
  });
}

function remove() {
  let i = 1;
  var chargingPlace = document.getElementById('charging_place').value;

  if (chargingPlace.trim() === '') {
    alert('Please enter a valid charging place.');
    return; // Stop execution if no charging place is entered
  }

  // Check if the data exists before attempting to remove it
  database.ref('contactForm/' + chargingPlace).once('value').then(function(snapshot) {
    if (snapshot.exists()) {
      // Data exists, ask for confirmation before deleting
      if (confirm('Are you sure you want to delete data for ' + chargingPlace + '?')) {
        // User confirmed deletion, proceed with removing the data
        database.ref('contactForm/' + chargingPlace).remove();
        alert('Data for ' + chargingPlace + ' deleted.');
        i=0;
        return;
      } else {
        // User canceled deletion, abort the process
        console.log('Deletion canceled by user.');
      }
    } else {
      if (i == 1){
        // Data does not exist, display an error message
        alert('Data for ' + chargingPlace + ' does not exist, and it cannot be deleted.');
        return;
      } else{
        return;
      }
    }
  }).catch(function(error) {
    console.error('Error checking data existence:', error);
  });
}

function verify(){
  var charging_place = document.getElementById('charging_place').value
  var charge_type = document.getElementById('charge_type').value
  var charger_address = document.getElementById('charger_address').value
  var operating_hour = document.getElementById('operating_hour').value

  // Check if any of the required fields are left blank
  if (!charging_place || !charge_type || !charger_address || !operating_hour) {
    alert('Please fill in all required fields');
    return; // Exit the function without saving data
  }

  database.ref('ChargingLocations/' + charging_place).set({
    charging_place: charging_place,
    charge_type: charge_type,
    charger_address: charger_address,
    operating_hour: operating_hour
  });

  var chargingPlace = document.getElementById('charging_place').value;
  database.ref('contactForm/' + chargingPlace).remove();
  alert('Verified. Thank you!');
}

