package com.example.duolender_back.group.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupDto {
	Integer groupId;
	String groupNm;
	String groupMemo;
	Long groupMemCnt;
	String groupJoinState;
	String groupAdminGrade;
	String scheduleColor;
	String groupCrtnId;
	String groupCrtnDtm;

	@QueryProjection
	public GroupDto(Integer groupId, String groupNm, String groupMemo, Long groupMemCnt, String groupJoinState, String groupAdminGrade, String scheduleColor, String groupCrtnId) {
		this.groupId = groupId;
		this.groupNm = groupNm;
		this.groupMemo = groupMemo;
		this.groupMemCnt = groupMemCnt;
		this.groupJoinState = groupJoinState;
		this.groupAdminGrade = groupAdminGrade;
		this.scheduleColor = scheduleColor;
		this.groupCrtnId = groupCrtnId;
	}
}
