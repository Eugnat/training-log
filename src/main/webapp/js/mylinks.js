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
  
  var $table = $("<table>").addClass("table");
  
  $tr = $("<tr>");
  $tr.append($("<th>").text("ID"));
  $tr.append($("<th>").text("Name"));
  $tr.append($("<th>").text("Actions"));
  
  var $thead = $("<thead>");
  
  $thead.append($tr);
  
  $table.append($thead);

  
  var $tbody = $("<tbody>");
  
  $.getJSON("/showExercises", function (data) {
	  
	  $.each(data, function(key, exercise) {
		  
		  $tr1 = $("<tr>").attr("id", "tr" + exercise.id);
		  $("<td>").text(exercise.id).appendTo($tr1);
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
	  
  });
  
  $table.append($tbody);
  
  $table.appendTo($("#contentArea"));

}

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
  
  $.getJSON("/showExercises", function(data) {

      $.each(data, function(key, exercise) {

        $select.append($("<option>").val(exercise.id).text(exercise.name));
      });
      
      //adds select block to div;
      $label.appendTo($div);
      $select.appendTo($divSelect);
      $divSelect.appendTo($div);
      
      $("<input>").attr("type", "number").appendTo($div);
      
    });
  
  
  var $button = $("<input>").attr("type", "button").val("+").addClass("btn btn-primary");
  
  $button.click(addLine);
  
  $button.prependTo($form);
  
  $div.appendTo($form);
  
  var $saveButton = $("<input>").attr("type", "button").val("Save").addClass("btn btn-primary");
  
  $saveButton.click(saveTrainingLog);
  
  $saveButton.appendTo($form);
  
  $("<p>").attr("id", "saveResult").appendTo($form);
  
  $form.appendTo("#contentArea");
  

}

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

function addLine() {
	
	var $div = $(".form-group:last").clone();
	
	$div.find("input[type='button']").remove();
	
	$div.insertAfter(".form-group:last");
	 
}

function removeExercise(e) {
	
	var inputValue = $(e.target).prev("input").val();
	
	//console.log(inputValue);
	
	$.post({
		url : "/removeExercise/" + inputValue
	});
	
	var id = "#tr" + inputValue;
	
	$(id).remove();
	
	
}

function saveTrainingLog() {
	
	var s = [];
    var $options = $("option:selected");

    $.each($options, function() {

    if ($(this).val() != "")
      {
    	var trainingSetHelper = {};
    	trainingSetHelper.id = $(this).val();
    	
    	var $number = $(this).parent().parent().next("input[type='number']");
    	
    	trainingSetHelper.quantity = $number.val();
    	s.push(trainingSetHelper);
      }

  });
    
    var jsonString = JSON.stringify(s);
    console.log(jsonString);
    
    $.ajax({
		method : "POST",
		url : "/saveTrainingLog",
		data : jsonString,
		contentType : "application/json",
		success: function() {
			$("#saveResult").text("Training log saved");
		},
		error: function() {
			$("#saveResult").text("Failed to save the training log");
		}
	
	});
	
}
