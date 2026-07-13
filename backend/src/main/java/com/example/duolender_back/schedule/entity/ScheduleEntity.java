package com.example.duolender_back.schedule.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="dl_schedule", schema = "duolender")
public class ScheduleEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "schedule_id")
	private int scheduleId;

	@Column(nullable = false)
	private String scheduleNm;

	@Column(nullable = true)
	private int scheduleGroupId;

	@Column(nullable = true)
	private String scheduleDtm;

	@Column(nullable = true)
	private String scheduleMemo;

	@Column(nullable = true)
	private String scheduleCrtnId;

	@Column(nullable = true)
	private String scheduleCrtnDtm;

	@Column(nullable = true)
	private String scheduleChngId;

	@Column(nullable = true)
	private String scheduleChngDtm;

	@Column(nullable = true)
	private String schedulePlace;

	@Column(nullable = true)
	private String scheduleType;

}
