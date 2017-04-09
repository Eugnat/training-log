package com.zazdravnykh.training.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zazdravnykh.training.dao.TrainingDayDAO;
import com.zazdravnykh.training.dao.TrainingSetDAO;
import com.zazdravnykh.training.entity.TrainingDay;
import com.zazdravnykh.training.entity.TrainingSet;
import com.zazdravnykh.training.service.TrainingDayService;

@Service
public class TrainingDayServiceImpl implements TrainingDayService {

	@Autowired
	TrainingDayDAO trainingDayDAO;

	@Autowired
	TrainingSetDAO trainingSetDAO;

	@Override
	public void saveTrainingDay(TrainingDay trainingDay) {

		trainingDayDAO.save(trainingDay);

	}

	@Override
	public void deleteTrainingDay(int id) {

		trainingDayDAO.delete(id);

	}

	@Override
	public void removeTrainingSet(int trainingSetId, int trainingDayId) {

		TrainingDay trainingDay = trainingDayDAO.findOne(trainingDayId);

		TrainingSet trainingSet = trainingSetDAO.findOne(trainingSetId);

		List<TrainingSet> list = trainingDay.getList();

		list.remove(trainingSet);

		// trainingDay.setList(list); // remove?

		trainingDayDAO.save(trainingDay);

	}

	@Override
	public List<TrainingDay> findAll() {

		return trainingDayDAO.findAll();
	}

	@Override
	public TrainingDay findOne(int id) {

		return trainingDayDAO.findOne(id);
	}

	@Override
	public List<TrainingSet> findAllTrainingSets(int id) {

		TrainingDay trainingDay = trainingDayDAO.findOne(id);

		return trainingDay.getList();
	}

}
