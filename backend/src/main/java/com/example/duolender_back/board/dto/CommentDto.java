package com.example.duolender_back.board.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDto {
	private int commentId;
	private int boardId;
	private String commentCntn;
	private String commentCrtnDtm;
	private String commentWriteId;
	private String commentWriteNm;

	@QueryProjection
	public CommentDto(Integer commentId, Integer boardId, String commentCntn, String commentCrtnDtm, String commentWriteId, String commentWriteNm) {
		this.commentId = commentId;
		this.boardId = boardId;
		this.commentCntn = commentCntn;
		this.commentCrtnDtm = commentCrtnDtm;
		this.commentWriteId = commentWriteId;
		this.commentWriteNm = commentWriteNm;
	}
}
