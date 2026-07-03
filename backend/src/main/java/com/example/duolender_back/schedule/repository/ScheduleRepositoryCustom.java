package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.querydsl.core.Tuple;

import java.util.List;

public interface ScheduleRepositoryCustom {
	List<ScheduleDto> findScheduleList(String userId, String schScheduleDate);

	ScheduleEntity findScheduleView(int schScheduleId);
}
