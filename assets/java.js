var firebaseConfig = {
    apiKey: "AIzaSyA7mcsjAA6iYiENPJ2NPBaAerr86umPkKA",
    authDomain: "in-class-firebasedu.firebaseapp.com",
    databaseURL: "https://in-class-firebasedu.firebaseio.com",
    projectId: "in-class-firebasedu",
    storageBucket: "in-class-firebasedu.appspot.com",
    messagingSenderId: "128151677961",
    appId: "1:128151677961:web:1f35aa974fea914e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var TrainName = ""
  var Destination = ""
  var FirstTrain = ""
  var TrainFrequency = ""

  $("#sumbit").on("click", function(event){
      event.preventDefault();

      TrainName = $("#TrainName").val().trim();
      Destination = $("#Destination").val().trim();
      FirstTrain = $("#TrainTime").val().trim();
      TrainFrequency = $("#TrainFrequency").val().trim();

      database.ref().push({
          TrainName: TrainName,
          Destination: Destination,
          FirstTrain: FirstTrain,
          TrainFrequency: TrainFrequency,

      });

      $("#TrainName").val("")
      $("#Destination").val("")
      $("#TrainTime").val("")
      $("#TrainFrequency").val("")

  });

  database.ref().on("child-added", function(snapshot){

    var sv = snapshot.val();
    var tablerow = $("<tr>")
    var newTrainName = $("<td>").text(sv.TrainName)
    var newDestination = $("<td>").text(sv.Destination)
    var newFirstTrain = $("<td>").text(sv.FirstTrain)
    var newTrainFrequency = $("<td>").text(sv.TrainFrequency)

    tablerow.append(newTrainName, newDestination, newFirstTrain, newTrainFrequency)

    $("#table").append(tablerow)
  })

 var currentTime = moment()
 var DiffTime = currentTime.diff(moment(FirstTrain), "minutes");
 var tRemainder = DiffTime % TrainFrequency;
 var tMinutesTillTrain = TrainFrequency - tRemainder;
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 nextTrain = $("#new-Arrival")
 
