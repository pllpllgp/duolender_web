package com.example.duolender_back.group.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupDto {
	int groupId;
	String groupNm;
	String groupCrtnId;
	String groupCrtnDtm;
	String groupMemo;
	String userNick;

	@QueryProjection
	public GroupDto(Integer groupId, String groupNm, String groupCrtnId, String groupMemo, String userNick) {
		this.groupId = groupId;
		this.groupNm = groupNm;
		this.groupCrtnId = groupCrtnId;
		this.groupMemo = groupMemo;
		this.userNick = userNick;
	}
}
