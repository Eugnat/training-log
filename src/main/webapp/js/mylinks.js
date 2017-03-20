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
  
  var $table = $("<table>");
  
  $tr = $("<tr>");
  $tr.append($("<td>").text("ID"));
  $tr.append($("<td>").text("Name"));
  
  $table.append($tr);

  //$("<p>").text("Exercise list").appendTo("#contentArea");
  
  $.getJSON("/showExercises", function (data) {
	  
	  $.each(data, function(key, exercise) {
		  
		  $tr1 = $("<tr>");
		  $("<td>").text(exercise.id).appendTo($tr1);
		  $("<td>").text(exercise.name).appendTo($tr1);
		  $tr1.appendTo($table);
		  
	  });
	  
  });
  
  $table.appendTo($("#contentArea"));

}

function showTrainingLog(e) {

  e.preventDefault();

  $("#contentArea").empty();

  $("<p>").text("Training Log").appendTo("#contentArea");

}

function showAddEntry(e) {

  e.preventDefault();
  $("#contentArea").empty();
  
  var $form = $("<form>").addClass("form-horizontal");
  
  $form.append($("<p>").text("Enter the exercise name:"));
  
  var $div = $("<div>").addClass("form-group");
  
  var $label = $("<label>").text("Exercise name:").attr("for", "exerciseName").addClass("control-label col-sm-2");
  
  $div.append($label);
  
  var $innerDiv = $("<div>").addClass("col-sm-4");
  
  var $input = $("<input>").attr("type", "text").attr("id", "exerciseName").addClass("form-control").appendTo($innerDiv);
  
  
  
  $div.append($innerDiv);
  
  var $button = $("<input>").attr("type", "button").attr("id", "buttonId").val("Save").addClass("btn btn-default");
  
  $button.click(saveExerciseForm);
  
  $div.append($button);
  
  var $p = $("<p>").attr("id", "addExercise").appendTo($innerDiv);
  
  
  $form.append($div).appendTo("#contentArea");

}

function saveExerciseForm() {
	
	if ($("#exerciseName").val() == "")
		$("#addExercise").text("Empty string");
	
	else {
		
		var exercise = {};
		
		exercise.name = $("#exerciseName").val();
		
		var jsonString = JSON.stringify(exercise);
		
		$.ajax({
			method : "POST",
			url : "/addExercise",
			data : jsonString,
			contentType : "application/json",
			success: function() {
				$("#addExercise").text("Exercise added");
			},
			error: function() {
				$("#addExercise").text("Failed to add the exercise");
			}
		
		});
		
		
	}
}
