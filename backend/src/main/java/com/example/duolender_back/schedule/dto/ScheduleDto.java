package com.example.duolender_back.schedule.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleDto {
	int scheduleId;
	String scheduleNm;
	int scheduleGroupId;
	String scheduleColor;
	String schedulePlace;
	String scheduleDtm;
	String scheduleMemo;
	String scheduleCrtnId;
	String scheduleCrtnDtm;
	String scheduleChngId;
	String scheduleChngDtm;
	String scheduleType;



	@QueryProjection
	public ScheduleDto(Integer scheduleId, String scheduleNm, String scheduleDtm, String scheduleMemo, String scheduleColor) {
		this.scheduleId = scheduleId;
		this.scheduleNm = scheduleNm;
		this.scheduleDtm = scheduleDtm;
		this.scheduleMemo = scheduleMemo;
		this.scheduleColor = scheduleColor;
	}

}
