package com.example.duolender_back.group.service;

import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.ReqGroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.entity.UserGroupLinkEntity;
import com.example.duolender_back.group.repository.GroupRepository;
import com.example.duolender_back.group.repository.UserGroupLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private UserGroupLinkRepository userGroupLinkRepository;

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

		//그룹 생성
		GroupEntity entity = new GroupEntity();
		entity.setGroupNm(dto.getReqGroupNm());
		entity.setGroupMemo(dto.getReqGroupMemo());
		entity.setGroupCrtnId(dto.getUserId());
		entity.setGroupCrtnDtm(toDate);

		groupRepository.save(entity);

		//유저 그룹 관계 생성자 데이터 입력
		userGroupLinkInsert(dto, entity.getGroupId(), "A", toDate);

		return true;
	}

	public boolean userGroupLinkInsert(ReqGroupDto dto, int groupId, String grade, String date) {
		UserGroupLinkEntity entity = new UserGroupLinkEntity();
		entity.setGroupId(groupId);
		entity.setUserId(dto.getUserId());
		entity.setGroupAdminGrade(grade);
		entity.setGroupJoinCrtnDtm(date);
		entity.setGroupJoinState("W");

		userGroupLinkRepository.save(entity);

		return true;
	}

}
