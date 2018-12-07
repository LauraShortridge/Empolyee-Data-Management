// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQ31hL8lcmQdpJfcL2kLHdnT8IgXjcG5A",
    authDomain: "employee-data-management-89cf3.firebaseapp.com",
    databaseURL: "https://employee-data-management-89cf3.firebaseio.com",
    projectId: "employee-data-management-89cf3",
    storageBucket: "employee-data-management-89cf3.appspot.com",
    messagingSenderId: "661277844322"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = ""; 
var role = ""; 
var startDate = "";
var monthRate = ""; 

$("#employeeButton").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    name = $("#employeeName").val().trim();
    role= $("#role").val().trim();
    startDate= $("#employeeStart").val().trim();
    monthRate= $("#monthRate").val().trim();

    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthRate: monthRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    console.log(name);
    console.log(role);
    console.log(startDate);
    console.log(monthRate);
 
  });

// Firebase watcher

database.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthRate);

    var addEmployeeRow = $("#employee-table");

    var employeeData = "<tr>";
   employeeData += "<td>" + childSnapshot.val().name + "</td>";
   employeeData += "<td>" + childSnapshot.val().role + "</td>";
   employeeData += "<td>" + childSnapshot.val().startDate + "</td>";
   employeeData += "<td></td>";
   employeeData += "<td>" + childSnapshot.val().monthRate + "</td>";
   employeeData += "<td></td>";
   employeeData += "</tr>";

   addEmployeeRow.append(employeeData);

}, function(errorObject) {
       console.log("Errors handled: " + errorObject.code);
});

 database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    // change HTML to reflect current changes
    
    // $("#name-display").text(snapshot.val().name);
    
    
    });
    

    