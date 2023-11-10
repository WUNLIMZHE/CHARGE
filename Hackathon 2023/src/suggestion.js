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

  alert('Submitted. Thank you!');
}



