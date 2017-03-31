package com.zazdravnykh.training.entity;

public class TrainingSetHelper {

	private int id;

	private int quantity;

	public TrainingSetHelper() {
	};

	public TrainingSetHelper(int id, int quantity) {
		super();
		this.id = id;
		this.quantity = quantity;
	}

	public TrainingSetHelper(int id) {
		super();
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
