package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.schedule.entity.ScheduleEntity;

import java.util.List;

public interface ScheduleRepositoryCustom {
	List<ScheduleEntity> findScheduleList(String userId, String schDate);
}
