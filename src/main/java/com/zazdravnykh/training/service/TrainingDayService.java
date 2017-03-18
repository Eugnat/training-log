package com.zazdravnykh.training.service;

import com.zazdravnykh.training.entity.TrainingDay;

public interface TrainingDayService {

	void addTrainingSet(int number, int exerciseId, TrainingDay trainingDay);

	void saveTrainingDay(TrainingDay trainingDay);

	void deleteTrainingDay(int id);
}
