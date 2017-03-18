package com.zazdravnykh.training.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zazdravnykh.training.dao.ExerciseDAO;
import com.zazdravnykh.training.dao.TrainingDayDAO;
import com.zazdravnykh.training.entity.Exercise;
import com.zazdravnykh.training.entity.TrainingDay;
import com.zazdravnykh.training.entity.TrainingSet;
import com.zazdravnykh.training.service.TrainingDayService;

@Service
public class TrainingDayServiceImpl implements TrainingDayService {

	@Autowired
	ExerciseDAO exerciseDAO;

	@Autowired
	TrainingDayDAO trainingDayDAO;

	@Override
	public void addTrainingSet(int number, int exerciseId, TrainingDay trainingDay) {

		Exercise exercise = exerciseDAO.findOne(exerciseId);

		TrainingSet trainingSet = new TrainingSet(exercise, number);

		trainingDay.getList().add(trainingSet);

	}

	@Override
	public void saveTrainingDay(TrainingDay trainingDay) {

		trainingDayDAO.save(trainingDay);

	}

	@Override
	public void deleteTrainingDay(int id) {

		trainingDayDAO.delete(id);

	}

}
