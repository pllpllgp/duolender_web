package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.querydsl.core.Tuple;

import java.util.List;

public interface ScheduleRepositoryCustom {
	List<ScheduleDto> findSchedulePri(String userId, String reqScheduleDate);

	List<ScheduleDto> findScheduleGro(String userId, String reqScheduleDate);

	ScheduleEntity findScheduleView(int reqScheduleId);
}
