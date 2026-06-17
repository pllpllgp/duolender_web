package com.example.duolender_back.empty.repository;

import com.example.duolender_back.empty.entity.ScheduleEntity;

import java.util.List;

public interface ScheduleRepositoryCustom {
    List<ScheduleEntity> findScheduleList(String userId, String schDate);
}
