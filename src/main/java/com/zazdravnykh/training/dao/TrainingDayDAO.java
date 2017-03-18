package com.zazdravnykh.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zazdravnykh.training.entity.TrainingDay;

public interface TrainingDayDAO extends JpaRepository<TrainingDay, Integer> {

}
