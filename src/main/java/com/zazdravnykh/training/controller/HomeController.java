package com.zazdravnykh.training.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zazdravnykh.training.entity.Exercise;
import com.zazdravnykh.training.entity.TrainingDay;
import com.zazdravnykh.training.entity.TrainingSet;
import com.zazdravnykh.training.entity.TrainingSetHelper;
import com.zazdravnykh.training.service.ExerciseService;
import com.zazdravnykh.training.service.TrainingDayService;

@Controller
public class HomeController {

	@Autowired
	ExerciseService exerciseService;

	@Autowired
	TrainingDayService trainingDayService;

	@RequestMapping("/")
	public String home() {

		return "index";
	}

	@RequestMapping(value = "/addExercise", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody Exercise processExerciseForm(@RequestBody Exercise exercise) {

		exerciseService.saveExercise(exercise);

		return exercise;
	}

	@RequestMapping(value = "/showExercises", method = RequestMethod.GET)
	public @ResponseBody List<Exercise> showExercises() {

		return exerciseService.findAll();
	}

	@RequestMapping(value = "/removeExercise/{inputId}", method = RequestMethod.POST)
	public @ResponseBody List<Exercise> removeExercise(@PathVariable("inputId") int id) {

		exerciseService.removeExercise(id);

		return exerciseService.findAll();
	}

	@RequestMapping(value = "/saveTrainingLog", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody List<TrainingSet> saveTrainingLog(@RequestBody List<TrainingSetHelper> helperList,
			@RequestParam("date") String trainingDate) {

		List<TrainingSet> list = new ArrayList<>();

		for (TrainingSetHelper helper : helperList) {
			int id = helper.getId();
			int quantity = helper.getQuantity();

			TrainingSet trainingSet = new TrainingSet();

			Exercise exercise = exerciseService.findOne(id);

			trainingSet.setExercise(exercise);
			trainingSet.setNumber(quantity);

			list.add(trainingSet);

		}

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

		LocalDate date = LocalDate.parse(trainingDate, formatter);

		TrainingDay trainingDay = new TrainingDay();

		trainingDay.setList(list);
		trainingDay.setDate(date);

		trainingDayService.saveTrainingDay(trainingDay);

		return list;

	}

	@RequestMapping(value = "/showAllTrainingDays", method = RequestMethod.GET)
	public @ResponseBody List<TrainingDay> showAllTrainingDays() {

		return trainingDayService.findAll();
	}

	@RequestMapping(value = "/showTrainingDay/{id}", method = RequestMethod.GET)
	public @ResponseBody TrainingDay showTrainingDay(@PathVariable("id") int trainingDayId) {

		return trainingDayService.findOne(trainingDayId);
	}

	@RequestMapping(value = "/showTrainingSets/{id}", method = RequestMethod.GET)
	public @ResponseBody List<TrainingSet> showTrainingSets(@PathVariable("id") int trainingDayId) {

		return trainingDayService.findOne(trainingDayId).getList();
	}

	@RequestMapping(value = "/removeTrainingSet/{trainingDayId}/{trainingSetId}", method = RequestMethod.POST)
	public @ResponseBody TrainingDay removeTrainingSet(@PathVariable("trainingDayId") int trainingDayId,
			@PathVariable("trainingSetId") int trainingSetId) {

		trainingDayService.removeTrainingSet(trainingSetId, trainingDayId);

		return trainingDayService.findOne(trainingDayId);
	}

	@RequestMapping(value = "/removeTrainingDay/{id}", method = RequestMethod.DELETE)
	public @ResponseBody List<TrainingDay> removeTrainingDay(@PathVariable("id") int id) {

		trainingDayService.deleteTrainingDay(id);

		return trainingDayService.findAll();
	}

	@PostConstruct
	public void initializeDatabases() {

		trainingDayService.deleteAll();

		exerciseService.deleteAll();
	}

}
