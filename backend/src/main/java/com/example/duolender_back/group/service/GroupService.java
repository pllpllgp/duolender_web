package com.example.duolender_back.group.service;

import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.repository.GroupRepository;
import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.example.duolender_back.schedule.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;

	public List<GroupDto> groupList(GroupDto dto) {
		List<GroupEntity> groupEntity = groupRepository.findGroupList(dto.getGroupNm());

		List<GroupDto> groupDtoList = groupEntity.stream()
				.map(entity -> {
					GroupDto groupDto = new GroupDto();
					groupDto.setGroupId(entity.getGroupId());
					groupDto.setGroupNm(entity.getGroupNm());
					groupDto.setGroupMemo(entity.getGroupMemo());

					return groupDto;
				})
				.collect(Collectors.toList());;

		return groupDtoList;
	}

	public boolean groupRegister(GroupDto dto) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String toDate = now.format(formatter);

		GroupEntity entity = new GroupEntity();
		entity.setGroupNm(dto.getGroupNm());
		entity.setGroupMemo(dto.getGroupMemo());
		entity.setGroupCrtnId(dto.getUserId());
		entity.setGroupCrtnDtm(toDate);

		groupRepository.save(entity);

		return true;
	}

}
