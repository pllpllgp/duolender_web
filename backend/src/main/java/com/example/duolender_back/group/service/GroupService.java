package com.example.duolender_back.group.service;

import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.ReqGroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.repository.GroupRepository;
import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.example.duolender_back.schedule.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;

	public List<GroupDto> groupSearch(ReqGroupDto dto) {
		List<GroupDto> groupList = new ArrayList<GroupDto>();

		groupList = groupRepository.searchGroupList(dto);

		return groupList;
	}

	public List<GroupDto> groupDetail(ReqGroupDto dto) {
		return null;
	}

	public boolean groupRegister(ReqGroupDto dto) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String toDate = now.format(formatter);

		GroupEntity entity = new GroupEntity();
		entity.setGroupNm(dto.getReqGroupNm());
		entity.setGroupMemo(dto.getReqGroupMemo());
		entity.setGroupCrtnId(dto.getUserId());
		entity.setGroupCrtnDtm(toDate);

		groupRepository.save(entity);

		return true;
	}

}
