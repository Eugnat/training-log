$(".home").click(showHomePage);
$(".exercise-list").click(showExerciseList);
$(".training-log").click(showTrainingLog);
$(".add-entry").click(showAddEntry);


function showHomePage(e) {

  e.preventDefault();

  $("#contentArea").empty();

  $("<p>").text("Home page").appendTo("#contentArea");

}

function showExerciseList(e) {
  e.preventDefault();

  $("#contentArea").empty();

  $("<p>").text("Exercise list").appendTo("#contentArea");

}

function showTrainingLog(e) {

  e.preventDefault();

  $("#contentArea").empty();

  $("<p>").text("Training Log").appendTo("#contentArea");

}

function showAddEntry(e) {

  e.preventDefault();
  $("#contentArea").empty();

  $("<p>").text("Add entry form").appendTo("#contentArea");

}