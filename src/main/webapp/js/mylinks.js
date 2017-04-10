$(".home").click(showHomePage);
$(".exercise-list").click(showExerciseList);
$(".training-log").click(showTrainingLog);
$(".add-entry").click(showAddEntry);
$(".overview").click(showOverview);

var contextPath = $("meta[name='ctx']").attr("content");

function showHomePage(e) {

  e.preventDefault();

  $("#contentArea").empty();

  $("<p>").text("It is a demo web site that demonstrates use of jQuery to create a single-page application (SPA) with the Spring backend. The SPA uses AJAX/JSON requests to query the database.")
          .appendTo("#contentArea");
  $("<p>").text("Used technologies:").appendTo("#contentArea");
  $("<p>").html("<ol><li>HTML/CSS/Bootstrap</li><li>jQuery 3</li><li>Spring Boot</li><li>JSON/REST</li><li>MySQL</li><li>Spring Data</li></ol>").appendTo("#contentArea");
  $("<p>").html("The source code is available at <a href='https://github.com/Eugnat/training-log.git'>here</a>. Create the database <i>training-day</i> in MySQL while using a local copy and use the relevant user name and password.").appendTo("#contentArea");

}

function showExerciseList(e) {
  e.preventDefault();

  $("#contentArea").empty();
  
  var $table = $("<table>").addClass("table table-bordered");
  
  $tr = $("<tr>");
  $tr.append($("<th>").text("ID"));
  $tr.append($("<th>").text("Name"));
  $tr.append($("<th>").text("Actions"));
  
  var $thead = $("<thead>");
  
  $thead.append($tr);
  
  $table.append($thead);

  
  var $tbody = $("<tbody>");
  
  $.getJSON(contextPath + "/showExercises", function (data) {
	  
	  $.each(data, function(key, exercise) {
		  
		  $tr1 = $("<tr>").attr("id", "tr" + exercise.id);
		  //$("<td>").text(exercise.id).appendTo($tr1);
		  $("<td>").appendTo($tr1);
		  $("<td>").text(exercise.name).appendTo($tr1);
		  
		  var inputValue = exercise.id;
		  
		  var $form = $("<form>");
		  
		  var $input = $("<input>").attr("type", "hidden").val(inputValue);
		  $input.appendTo($form);
		  
		  var $button = $("<input>").attr("type", "button").val("Remove").addClass("btn btn-warning");
		  $button.click(removeExercise);
		  $button.appendTo($form);
		  
		  $("<td>").append($form).appendTo($tr1);
		  
		  $tr1.appendTo($tbody);
		  
	  });
	  
	  $("td:first", "tr").each(function(index) {
		  
		  $(this).text(index + 1);
	  });
	  
	  
  });
  
  $table.append($tbody);
  
  $table.appendTo($("#contentArea"));
  
  $("<p>").attr("id", "statusLine").appendTo("#contentArea");

}

//This function displays a training log
function showTrainingLog(e) {

	e.preventDefault();

	$("#contentArea").empty();

	$("<p>").text("Training Log").appendTo("#contentArea");
  
	var $form = $("<form>").addClass("form-horizontal");
  
	var $div = $("<div>").addClass("form-group");
  
	var $label = $("<label>").text("Exercise").addClass("control-label col-sm-2");
  
	var $select = $("<select>").addClass("form-control");
  
	var $divSelect = $("<div>").addClass("col-sm-4");
  
	$select.append($("<option>").val("").text("....."));
  
	//a request that gets a list of exercises.
	$.getJSON(contextPath + "/showExercises", function(data) {

      $.each(data, function(key, exercise) {

        $select.append($("<option>").val(exercise.id).text(exercise.name));
      });
      
      //adds select block to div;
      $label.appendTo($div);
      $select.appendTo($divSelect);
      $divSelect.appendTo($div);
      
      $("<input>").attr("type", "number").attr("min", 1).val(1).appendTo($div);
      
    });
  
  
	var $button = $("<input>").attr("type", "button").val("+").addClass("btn btn-primary");
  
	$button.click(addLine);
  
	$button.prependTo($form);
	
	var $clearButton = $("<input>").attr("type", "button").val("Clear").addClass("btn btn-primary");
	
	$clearButton.click(showTrainingLog);
	
	$clearButton.insertAfter($button);
  
	$("<p>").appendTo($form);
  
	var $dateParagraph = $("<p>").appendTo($form);
	
	var attributes = {
			id : "trainingDate",
			pattern : "[0-3]{1}[0-9]{1}\.[0-1]{1}[0-9]{1}\.[0-9]{4}",
			maxlength : "10"
	}
  
	$("<input>").attr("type", "text").attr(attributes).val("01.01.2017").appendTo($dateParagraph);
  
	$div.appendTo($form);
  
	var $saveButton = $("<input>").attr("type", "button").val("Save").addClass("btn btn-primary");
  
	$saveButton.click(saveTrainingLog);
  
	$saveButton.appendTo($form);
  
	$("<p>").attr("id", "saveResult").appendTo($form);
  
	$form.appendTo("#contentArea");
  

}

//It displays the form to add an exercise to the list.
function showAddEntry(e) {

  e.preventDefault();
  $("#contentArea").empty();
  
  var $form = $("<form>").addClass("form-horizontal");
  
  $form.submit(function(event) {
	  event.preventDefault();
  });
  
  $form.append($("<p>").text("Enter the exercise name:"));
  
  var $div = $("<div>").addClass("form-group");
  
  var $label = $("<label>").text("Exercise name:").attr("for", "exerciseName").addClass("control-label col-sm-2");
  
  $div.append($label);
  
  var $innerDiv = $("<div>").addClass("col-sm-4");
  
  var $input = $("<input>").attr("type", "text").attr("id", "exerciseName").addClass("form-control");
  $input.focus(function() {
	  $("#addExercise").text("");
  });
  $input.appendTo($innerDiv);
  
  
  
  $div.append($innerDiv);
  
  var $button = $("<input>").attr("type", "button").attr("id", "buttonId").val("Save").addClass("btn btn-default");
  
  $button.click(saveExerciseForm);
  
  $div.append($button);
  
  var $p = $("<p>").attr("id", "addExercise").appendTo($innerDiv);
  
  
  $form.append($div).appendTo("#contentArea");

}

function saveExerciseForm() {
	
	if ($("#exerciseName").val().trim() == "")
		$("#addExercise").text("Empty string");
	
	else {
		
		var exercise = {};
		
		exercise.name = $("#exerciseName").val();
		
		var jsonString = JSON.stringify(exercise);
		
		//An Ajax POST request that saves an exercise (JSON format)
		$.ajax({
			method : "POST",
			url : contextPath + "/addExercise",
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

//adds a line in the Training Log section
function addLine() {
	
	var $div = $(".form-group:last").clone();
	
	$div.find("input[type=number]").val(1);
	
	$div.insertAfter(".form-group:last");
	 
}

function removeExercise(e) {
	
	var inputValue = $(e.target).prev("input").val();
	
	$.post({
		url : contextPath + "/removeExercise/" + inputValue,
		success : function() {
			$("#statusLine").text("Exercise removed. Besides all entries in the training log with this exercise were also removed.")
		}
	});
	
	var id = "#tr" + inputValue;
	
	//removes the exercise line from the DOM
	$(id).remove();
	
	$("td:first", "tr").each(function(index) {
		  
		  $(this).text(index + 1);
	  });
	
}

//It saves the training log entry in the database
function saveTrainingLog() {
	
	//check if the training data matches the pattern (the process is doubled in the HomeController)
	if ($("#trainingDate").val().match(/[0-3]{1}[0-9]{1}\.[0-1]{1}[0-9]{1}\.[0-9]{4}/) == null || $("input[type=number]").val() < 1 || $("input[type=number]").val() == "")
			$("#saveResult").text("Wrong date format or number less than 1 or missing!");
	else
	{	
		var s = [];
		var $options = $("option:selected");

	    $.each($options, function() {
	
	    //checks if the option with the exercise name is selected
	    if ($(this).val() != "")
	      {
	    	var trainingSetHelper = {};
	    	trainingSetHelper.id = $(this).val();
	    	
	    	//search for the input field with the required value;
	    	var $number = $(this).closest(".col-sm-4").next("input[type='number']");
	    	
	    	trainingSetHelper.quantity = $number.val();
	    	s.push(trainingSetHelper);
	      }
	
	  });
	    
	    var jsonString = JSON.stringify(s);
	    
	    //An Ajax request that saves the training log entry in the database
	    $.ajax({
			method : "POST",
			url : contextPath + "/saveTrainingLog" + "?date=" + $("#trainingDate").val(),
			data : jsonString,
			contentType : "application/json",
			success: function() {
				$("#saveResult").text("Training log saved " + $("#trainingDate").val());
			},
			error: function() {
				$("#saveResult").text("Failed to save the training log");
			}
		
		});
	}
	
}

function showOverview(e) {
	
	e.preventDefault();
	
	$("#contentArea").empty();
	
	var $table = $("<table>").addClass("table table-bordered");
	
	//create <thead> block
	var $thead = $("<thead>");
	var $tr = $("<tr>");
	$tr.append($("<td>").text("Date"), $("<td>").text("Exercise"), $("<td>").text("Quantity"), $("<td>").text("Actions"));
	$tr.appendTo($thead);
	$thead.appendTo($table);
	
	
	//create Training Day block <tbody>
	
	$.getJSON(contextPath + "/showAllTrainingDays", function(data) {
		
		$.each(data, function(index, trainingDay) {
			
			//length of the array of training sets
			var length = trainingDay.list.length;
			var $tbody = $("<tbody>").attr("id", "day" + trainingDay.id);
			
			$.each(trainingDay.list, function (setIndex, trainingSet) {
				
				var $trainingDay = $("<tr>");
				
				if (setIndex == 0)
				{
					var $removeButton = $("<input>").attr("type", "button").val("Remove").addClass("btn btn-warning");
					$removeButton.click({id : trainingDay.id}, removeTrainingDay);
					$("<td>").attr("rowspan", length).text(trainingDay.date.dayOfMonth + " " + trainingDay.date.month + " " + trainingDay.date.year)
							 .append($("<p>").append($removeButton))
							 .appendTo($trainingDay);
				}
				$("<td>").text(trainingSet.exercise.name).appendTo($trainingDay);
				$("<td>").text(trainingSet.number).appendTo($trainingDay);
				var $td = $("<td>");
				
				var $button = $("<input>").attr("type", "button").val("Remove").addClass("btn btn-warning");
				
				$button.click({trainingSetId: trainingSet.id, trainingDayId: trainingDay.id}, removeTrainingSet);
				
				$button.appendTo($td);
				
				$td.appendTo($trainingDay);
					
				$trainingDay.appendTo($tbody);
			});
			
			$tbody.appendTo($table);
			
		});
		
	});
	
	$table.appendTo("#contentArea");
	$("<p>").attr("id", "statusLine").appendTo("#contentArea");
	
}

function removeTrainingSet(event) {
	
	var trainingDayId = event.data.trainingDayId;
	var trainingSetId = event.data.trainingSetId;
	
	$.ajax({
		method : "POST",
		url : contextPath + "/removeTrainingSet/" + trainingDayId + "/" + trainingSetId,
		success: function() {
			
			$.getJSON(contextPath + "/showTrainingDay/" + trainingDayId, function(trainingDay) {
				
				var length = trainingDay.list.length;
				
				if (length > 0)
				{	
				var $tbody = $("<tbody>");
				
				$tbody.attr("id", "day" + trainingDay.id);
				
				$.each(trainingDay.list, function (setIndex, trainingSet) {
					
					var $trainingDay = $("<tr>");
					
					if (setIndex == 0)
					{
						var $removeButton = $("<input>").attr("type", "button").val("Remove").addClass("btn btn-warning");
						$removeButton.click({id : trainingDay.id}, removeTrainingDay);
						$("<td>").attr("rowspan", length).text(trainingDay.date.dayOfMonth + " " + trainingDay.date.month + " " + trainingDay.date.year)
								 .append($("<p>").append($removeButton))
								 .appendTo($trainingDay);
					}
					$("<td>").text(trainingSet.exercise.name).appendTo($trainingDay);
					$("<td>").text(trainingSet.number).appendTo($trainingDay);
					var $td = $("<td>");
					
					var $button = $("<input>").attr("type", "button").val("Remove").addClass("btn btn-warning");
					
					$button.click({trainingSetId: trainingSet.id, trainingDayId: trainingDay.id}, removeTrainingSet);
					
					$button.appendTo($td);
					
					$td.appendTo($trainingDay);
						
					$trainingDay.appendTo($tbody);
				});
				
				$("#day" + trainingDayId).replaceWith($tbody);
				$("#statusLine").text("Training set removed");
				}
				else
					{
						$("#day" + trainingDayId).remove();
						$("#statusLine").text("Training set removed");
					}
			});
			
		},
		error: function() {
			$("#statusLine").text("Failed to remove the training set");
		}
	
	});
	
}

function removeTrainingDay(event) {
	
	var id = event.data.id;
	
	$.ajax ({
		
		method : "DELETE",
		url	   : contextPath + "/removeTrainingDay/" + id,
		success : function() {
			$("#day" + id).remove();
			$("#statusLine").text("Training day removed");
		},
		error  : function() {
			$("#statusLine").text("Failed to remove the training day");
			}
		});
}
