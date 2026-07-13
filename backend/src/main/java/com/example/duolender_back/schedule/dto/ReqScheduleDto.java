package com.example.duolender_back.schedule.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqScheduleDto {
	String userId;
	String reqScheduleStatus;

	int reqScheduleId;
	String reqScheduleNm;
	String reqScheduleDate;
	int reqScheduleGroupId;
	String reqScheduleDtm;
	String reqScheduleMemo;
	String reqSchedulePlace;
	String reqScheduleType;
}
