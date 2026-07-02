package com.example.duolender_back.schedule.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleDto {
	String userId;
	int scheduleId;
	String scheduleNm;
	String scheduleGroupId;
	String scheduleColor;
	String scheduleDtm;
	String scheduleMemo;
	String scheduleCrtnId;
	String scheduleCrtnDtm;
	String scheduleChngId;
	String scheduleChngDtm;

	String schScheduleDate;
}
