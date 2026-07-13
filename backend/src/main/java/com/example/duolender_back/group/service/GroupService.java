package com.example.duolender_back.group.service;

import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.group.dto.GroupDetailDto;
import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.ReqGroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.entity.UserGroupLinkEntity;
import com.example.duolender_back.group.repository.GroupRepository;
import com.example.duolender_back.group.repository.UserGroupLinkRepository;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private UserGroupLinkRepository userGroupLinkRepository;

	public List<GroupDto> groupSearch(ReqGroupDto dto) {
		return groupRepository.searchGroupList(dto);
	}

	public List<GroupDto> myGroupSearch(ReqGroupDto dto) {
		return groupRepository.searchMyGroupList(dto);
	}

	public GroupDetailDto groupDetail(ReqGroupDto dto) {
		return groupRepository.groupDetail(dto);
	}

	public boolean groupRegister(ReqGroupDto dto) {
		//그룹 생성
		GroupEntity entity = new GroupEntity();
		entity.setGroupNm(dto.getReqGroupNm());
		entity.setGroupMemo(dto.getReqGroupMemo());
		entity.setGroupCrtnId(dto.getUserId());
		entity.setGroupCrtnDtm(toDate());

		groupRepository.save(entity);

		//유저 그룹 관계 생성자 데이터 입력
		userGroupLinkInsert(dto, entity.getGroupId(), "A", toDate(), "Y");

		return true;
	}


	//그룹 가입 신청 or 그룹 가입 신청 취소
	public GroupDto joinReq(ReqGroupDto dto) {
		//그룹 가입 신청
		if(dto.getReqGroupJoinState() == null) {
			userGroupLinkInsert(dto, dto.getGroupId(), "M", toDate(), "W");

		//그룹 가입 신청 취소
		} else {
			userGroupLinkLeave(dto);
		}

		return null;
	}


	//그룹 탈퇴
	public void leaveReq(ReqGroupDto dto) {
		userGroupLinkLeave(dto);
	}

	//그룹 탈퇴
	@Transactional
	public boolean updateColor(ReqGroupDto dto) {
		Optional<UserGroupLinkEntity> linkOpt = userGroupLinkRepository.findByGroupIdAndUserId(dto.getGroupId(), dto.getUserId());

		if(linkOpt.isPresent()) {
			System.out.println("gro:::::::::"+dto.getReqScheduleColor());
			UserGroupLinkEntity userGroupLinkEntity = linkOpt.get();
			userGroupLinkEntity.setScheduleColor(dto.getReqScheduleColor());
		}

		return true;
	}

	//오늘 날짜 구하기
	public String toDate() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String toDate = now.format(formatter);

		return toDate;
	}

	//그룹 가입 신청
	public boolean userGroupLinkInsert(ReqGroupDto dto, int groupId, String grade, String date, String state) {
		UserGroupLinkEntity entity = new UserGroupLinkEntity();
		entity.setGroupId(groupId);
		entity.setUserId(dto.getUserId());
		entity.setGroupAdminGrade(grade);
		entity.setGroupJoinCrtnDtm(date);
		entity.setGroupJoinState(state);

		userGroupLinkRepository.save(entity);

		return true;
	}

	//그룹 탈퇴 및 가입 신청 취소
	public void userGroupLinkLeave(ReqGroupDto dto) {
		Optional<UserGroupLinkEntity> linkOpt =  userGroupLinkRepository.findByGroupIdAndUserId(dto.getGroupId(), dto.getUserId());

		if(linkOpt.isPresent()) {
			UserGroupLinkEntity link = linkOpt.get();
			userGroupLinkRepository.delete(link);

		}

	}

}
