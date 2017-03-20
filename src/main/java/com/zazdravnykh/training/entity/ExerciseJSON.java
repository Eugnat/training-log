package com.zazdravnykh.training.entity;

public class ExerciseJSON {

	private int id;
	private int number;

	public ExerciseJSON() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public ExerciseJSON(int id, int number) {
		super();
		this.id = id;
		this.number = number;
	}

}
