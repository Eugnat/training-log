package com.zazdravnykh.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zazdravnykh.training.entity.Exercise;

public interface ExerciseDAO extends JpaRepository<Exercise, Integer> {

}
