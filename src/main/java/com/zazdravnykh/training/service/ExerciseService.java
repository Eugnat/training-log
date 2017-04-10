package com.zazdravnykh.training.service;

import java.util.List;

import com.zazdravnykh.training.entity.Exercise;

public interface ExerciseService {

	void saveExercise(Exercise exercise);

	List<Exercise> findAll();

	void removeExercise(int id);

	Exercise findOne(int id);

	void deleteAll();

}
