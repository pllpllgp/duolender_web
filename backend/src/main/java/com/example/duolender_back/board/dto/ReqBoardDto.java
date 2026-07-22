package com.example.duolender_back.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqBoardDto {
	private String reqUserId;
	private int reqBoardId;
	private String reqBoardNm;
	private String reqBoardCntn;
	private String reqBoardType;
	private String reqWriteId;
	private int reqGroupId;
	private int reqPage;

}
