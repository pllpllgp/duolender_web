package com.example.duolender_back.group.service;

import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.repository.GroupRepository;
import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.example.duolender_back.schedule.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;

	public List<ScheduleDto> groupList(ScheduleDto dto) {

		return null;
	}

	public boolean groupRegister(GroupDto dto) {
		GroupEntity entity = new GroupEntity();
		entity.setGroupNm(dto.getGroupNm());
		entity.setGroupCrtnId(dto.getUserId());
		entity.setGroupMemo(dto.getGroupMemo());
		entity.setGroupCrtnDtm(dto.getGroupCrtnDtm());

		groupRepository.save(entity);

		return true;
	}

}
