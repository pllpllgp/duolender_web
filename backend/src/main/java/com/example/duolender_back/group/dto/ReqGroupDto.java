package com.example.duolender_back.group.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqGroupDto {
	String userId;
	int groupId;

	String reqGroupNm;
	String reqGroupMemo;
	String reqActiveTab;
	String reqGroupJoinState;
	String reqScheduleColor;
	String reqGroupSecretYn;
	String reqYn;
}
