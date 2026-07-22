package com.example.duolender_back.board.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardDto {
	int boardId;
	String boardNm;
	String boardCntn;
	String boarType;
	String boardCrtnDtm;
	String boardWriteNm;
	int groupId;
	int page;

	@QueryProjection
	public BoardDto(Integer boardId, String boardNm, String boardCntn, String boarType, String boardCrtnDtm, String boardWriteNm, Integer groupId) {
		this.boardId = boardId;
		this.boardNm = boardNm;
		this.boardCntn = boardCntn;
		this.boarType = boarType;
		this.boardCrtnDtm = boardCrtnDtm;
		this.boardWriteNm = boardWriteNm;
		this.groupId = groupId;
	}
}
