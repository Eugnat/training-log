package com.zazdravnykh.training.service;

import java.util.List;

import com.zazdravnykh.training.entity.TrainingDay;
import com.zazdravnykh.training.entity.TrainingSet;

public interface TrainingDayService {

	void saveTrainingDay(TrainingDay trainingDay);

	void deleteTrainingDay(int id);

	void removeTrainingSet(int trainingSetId, int trainingDayId);

	List<TrainingDay> findAll();

	TrainingDay findOne(int id);

	List<TrainingSet> findAllTrainingSets(int trainingDayId);
}
