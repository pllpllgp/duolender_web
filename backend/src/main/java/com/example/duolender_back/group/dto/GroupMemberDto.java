package com.example.duolender_back.group.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupMemberDto {
	String userId;
	String userNick;
	Integer groupId;
	String groupAdminGrade;
	String groupJoinState;

	@QueryProjection
	public GroupMemberDto(String userId, String userNick, Integer groupId, String groupAdminGrade, String groupJoinState) {
		this.userId = userId;
		this.userNick = userNick;
		this.groupId = groupId;
		this.groupAdminGrade = groupAdminGrade;
		this.groupJoinState = groupJoinState;
	}
}
