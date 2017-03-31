package com.zazdravnykh.training.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	public @ResponseBody List<TrainingSet> saveTrainingLog(@RequestBody List<TrainingSetHelper> helperList) {

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

		TrainingDay trainingDay = new TrainingDay();

		trainingDay.setList(list);

		trainingDayService.saveTrainingDay(trainingDay);

		return list;

	}

}
