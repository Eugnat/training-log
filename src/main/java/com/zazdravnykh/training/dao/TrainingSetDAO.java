package com.zazdravnykh.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zazdravnykh.training.entity.TrainingSet;

public interface TrainingSetDAO extends JpaRepository<TrainingSet, Integer> {

}
