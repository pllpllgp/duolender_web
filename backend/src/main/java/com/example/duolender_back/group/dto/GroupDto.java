package com.example.duolender_back.group.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupDto {
	String userId;
	int groupId;
	String groupNm;
	String groupCrtnId;
	String groupCrtnDtm;
	String groupMemo;
}
