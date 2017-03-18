package com.zazdravnykh.training.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zazdravnykh.training.dao.ExerciseDAO;
import com.zazdravnykh.training.entity.Exercise;
import com.zazdravnykh.training.service.ExerciseService;

@Service
public class ExerciseServiceImpl implements ExerciseService {

	@Autowired
	ExerciseDAO exerciseDAO;

	@Override
	public void saveExercise(Exercise exercise) {

		exerciseDAO.save(exercise);

	}

	@Override
	public List<Exercise> findAll() {

		return exerciseDAO.findAll();
	}

	@Override
	public void removeExercise(int id) {

		exerciseDAO.delete(id);

	}

}
