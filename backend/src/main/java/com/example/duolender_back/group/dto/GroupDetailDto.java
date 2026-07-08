package com.example.duolender_back.group.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupDetailDto {
	Integer groupId;
	String groupNm;
	String groupMemo;
	String userNick;
	String groupJoinState;
	String groupCrtnId;

	@QueryProjection
	public GroupDetailDto(Integer groupId, String groupNm, String groupMemo, String userNick, String groupJoinState, String groupCrtnId) {
		this.groupId = groupId;
		this.groupNm = groupNm;
		this.groupMemo = groupMemo;
		this.userNick = userNick;
		this.groupJoinState = groupJoinState;
		this.groupCrtnId = groupCrtnId;
	}
}
