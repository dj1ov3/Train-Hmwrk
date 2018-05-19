$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAvbfgOuoqI2z2zalyiPv_APyE0LwZ25Tw",
        authDomain: "train-42bd0.firebaseapp.com",
        databaseURL: "https://train-42bd0.firebaseio.com",
        projectId: "train-42bd0",
        storageBucket: "train-42bd0.appspot.com",
        messagingSenderId: "871637018047"
        };
    firebase.initializeApp(config);

    var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").format("hh:mm");
    var frequency = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: destination,
      time: time,
      frequency: frequency
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
 
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
  
    
    var firstTime = "03:30";

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

     var tRemainder = diffTime % trainFreq;
     console.log(tRemainder);

    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
  });



  











});