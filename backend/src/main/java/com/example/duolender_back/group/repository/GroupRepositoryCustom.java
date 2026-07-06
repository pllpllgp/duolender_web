package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.schedule.dto.ScheduleDto;

import java.util.List;

public interface GroupRepositoryCustom {
	List<GroupEntity> searchGroupList(String reqGroupNm);
}
