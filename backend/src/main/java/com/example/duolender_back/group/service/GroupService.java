package com.example.duolender_back.group.service;

import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.config.CommonUtil;
import com.example.duolender_back.group.dto.GroupDetailDto;
import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.GroupMemberDto;
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
		//모임 생성
		GroupEntity entity = new GroupEntity();
		entity.setGroupNm(dto.getReqGroupNm());
		entity.setGroupMemo(dto.getReqGroupMemo());
		entity.setGroupCrtnId(dto.getUserId());
		entity.setGroupCrtnDtm(CommonUtil.toDate());
		entity.setGroupSecretYn(dto.getReqGroupSecretYn());

		groupRepository.save(entity);

		//유저 모임 관계 생성자 데이터 입력
		userGroupLinkInsert(dto, entity.getGroupId(), "A", "Y");

		return true;
	}


	//모임 가입 신청 or 모임 가입 신청 취소
	public GroupDto joinReq(ReqGroupDto dto) {
		//모임 가입 신청
		if(dto.getReqGroupJoinState() == null) {
			userGroupLinkInsert(dto, dto.getGroupId(), "M", "W");

		//모임 가입 신청 취소
		} else {
			userGroupLinkLeave(dto);
		}

		return null;
	}


	//모임 탈퇴
	public void leaveReq(ReqGroupDto dto) {
		userGroupLinkLeave(dto);
	}

	//모임 색상 변경
	@Transactional
	public boolean updateColor(ReqGroupDto dto) {
		Optional<UserGroupLinkEntity> linkOpt = userGroupLinkRepository.findByGroupIdAndUserId(dto.getGroupId(), dto.getUserId());

		if(linkOpt.isPresent()) {
			UserGroupLinkEntity userGroupLinkEntity = linkOpt.get();
			userGroupLinkEntity.setScheduleColor(dto.getReqScheduleColor());
		}

		return true;
	}

	//모임 가입 신청
	public boolean userGroupLinkInsert(ReqGroupDto dto, int groupId, String grade, String state) {
		UserGroupLinkEntity entity = new UserGroupLinkEntity();
		entity.setGroupId(groupId);
		entity.setUserId(dto.getUserId());
		entity.setGroupAdminGrade(grade);
		entity.setGroupJoinCrtnDtm(CommonUtil.toDate());
		entity.setGroupJoinState(state);
		entity.setScheduleColor("#6b7280");

		userGroupLinkRepository.save(entity);

		return true;
	}

	//모임원 조회
	public List<GroupMemberDto> memberList(ReqGroupDto dto) {
		return groupRepository.searchMemberList(dto);
	}

	//모임 탈퇴 및 가입 신청 취소
	@Transactional
	public void approveMember(ReqGroupDto dto) {
		//가입 승인
		if(dto.getReqYn().equals("Y")) {
			Optional<UserGroupLinkEntity> linkOpt = userGroupLinkRepository.findByGroupIdAndUserId(dto.getGroupId(), dto.getUserId());

			if(linkOpt.isPresent()) {
				UserGroupLinkEntity userGroupLinkEntity = linkOpt.get();
				userGroupLinkEntity.setGroupJoinState("Y");
			}
		//가입 거절
		} else {
			userGroupLinkLeave(dto);

		}
	}

	//모임 탈퇴 및 가입 신청 취소
	public void userGroupLinkLeave(ReqGroupDto dto) {
		Optional<UserGroupLinkEntity> linkOpt = userGroupLinkRepository.findByGroupIdAndUserId(dto.getGroupId(), dto.getUserId());

		if(linkOpt.isPresent()) {
			UserGroupLinkEntity link = linkOpt.get();
			userGroupLinkRepository.delete(link);

		}
	}


	//모임 정보 수정
	@Transactional
	public boolean updateGroup(ReqGroupDto dto) {
		Optional<GroupEntity> groupOpt = groupRepository.findByGroupId(dto.getGroupId());

		if(groupOpt.isPresent()) {
			GroupEntity groupEntity = groupOpt.get();
			groupEntity.setGroupNm(dto.getReqGroupNm());
			groupEntity.setGroupMemo(dto.getReqGroupMemo());
			groupEntity.setGroupSecretYn(dto.getReqGroupSecretYn());
		}

		return true;
	}

}
