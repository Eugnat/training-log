package com.zazdravnykh.training.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "training_day")
public class TrainingDay {

	@Id
	@GeneratedValue
	private int id;

	private LocalDate date;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TrainingSet> list = new ArrayList<>();

	public TrainingDay() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public List<TrainingSet> getList() {
		return list;
	}

	public void setList(List<TrainingSet> list) {
		this.list = list;
	}

}
