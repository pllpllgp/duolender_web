package com.example.duolender_back.empty.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="dl_schedule", schema = "duolender")
public class ScheduleEntity {
	@Id
	private String scheduleId;

	@Column(nullable = false)
	private String scheduleNm;

	@Column(nullable = false)
	private String scheduleGroupId;

	@Column(nullable = false)
	private String scheduleColor;

	@Column(nullable = false)
	private String scheduleStartDtm;

	@Column(nullable = false)
	private String scheduleEndDtm;

	@Column(nullable = false)
	private String scheduleMemo;

	@Column(nullable = false)
	private String scheduleCrtnId;

	@Column(nullable = false)
	private String scheduleCrtnDtm;

	@Column(nullable = false)
	private String scheduleChngId;

	@Column(nullable = false)
	private String scheduleChngDtm;

}
