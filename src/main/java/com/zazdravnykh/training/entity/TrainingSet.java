package com.zazdravnykh.training.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "training_set")
public class TrainingSet {

	@Id
	@GeneratedValue
	private int id;

	@OneToOne
	private Exercise exercise;

	private int number;

	public TrainingSet(Exercise exercise, int number) {
		super();
		this.exercise = exercise;
		this.number = number;
	}

	public TrainingSet() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

}
