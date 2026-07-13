package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.dto.GroupDetailDto;
import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.GroupMemberDto;
import com.example.duolender_back.group.dto.ReqGroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.schedule.dto.ScheduleDto;

import java.util.List;

public interface GroupRepositoryCustom {
	List<GroupDto> searchGroupList(ReqGroupDto dto);

	List<GroupDto> searchMyGroupList(ReqGroupDto dto);

	GroupDetailDto groupDetail(ReqGroupDto dto);

	List<GroupMemberDto> searchMemberList(ReqGroupDto dto);
}
