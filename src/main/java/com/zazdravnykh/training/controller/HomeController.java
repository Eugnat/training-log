package com.zazdravnykh.training.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zazdravnykh.training.entity.Exercise;
import com.zazdravnykh.training.service.ExerciseService;

@Controller
public class HomeController {

	@Autowired
	ExerciseService exerciseService;

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

}
