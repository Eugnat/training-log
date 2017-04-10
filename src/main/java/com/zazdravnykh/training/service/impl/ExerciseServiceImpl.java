package com.zazdravnykh.training.service.impl;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zazdravnykh.training.dao.ExerciseDAO;
import com.zazdravnykh.training.entity.Exercise;
import com.zazdravnykh.training.entity.TrainingDay;
import com.zazdravnykh.training.entity.TrainingSet;
import com.zazdravnykh.training.service.ExerciseService;
import com.zazdravnykh.training.service.TrainingDayService;

@Service
public class ExerciseServiceImpl implements ExerciseService {

	@Autowired
	ExerciseDAO exerciseDAO;

	@Autowired
	TrainingDayService trainingDayService;

	@Override
	public void saveExercise(Exercise exercise) {

		exerciseDAO.save(exercise);

	}

	@Override
	public List<Exercise> findAll() {

		return exerciseDAO.findAll();
	}

	@Override
	public void removeExercise(int exerciseId) {

		List<TrainingDay> trainingDayList = trainingDayService.findAll();

		for (TrainingDay trainingDay : trainingDayList) {
			List<TrainingSet> trainingSetList = trainingDay.getList();

			Iterator<TrainingSet> iterator = trainingSetList.iterator();

			while (iterator.hasNext()) {

				if (iterator.next().getExercise().getId() == exerciseId)
					iterator.remove();
			}

			trainingDayService.saveTrainingDay(trainingDay);
		}

		exerciseDAO.delete(exerciseId);

	}

	@Override
	public Exercise findOne(int id) {

		return exerciseDAO.findOne(id);
	}

	@Override
	public void deleteAll() {

		exerciseDAO.deleteAll();

	}

}
