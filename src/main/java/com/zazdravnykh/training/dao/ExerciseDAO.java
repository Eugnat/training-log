package com.zazdravnykh.training.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zazdravnykh.training.entity.Exercise;

//just a test comment
public interface ExerciseDAO extends JpaRepository<Exercise, Integer> {

}
