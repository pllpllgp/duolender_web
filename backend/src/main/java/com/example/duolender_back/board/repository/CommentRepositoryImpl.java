package com.example.duolender_back.board.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.board.dto.*;
import com.example.duolender_back.board.entity.QCommentEntity;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	QCommentEntity commentEntity = QCommentEntity.commentEntity;
	QAuthEntity authEntity = QAuthEntity.authEntity;

	public QCommentDto commentDtoPro() {
		return new QCommentDto(
				commentEntity.commentId,
				commentEntity.boardId,
				commentEntity.commentCntn,
				commentEntity.commentCrtnDtm,
				commentEntity.commentWriteId,
				JPAExpressions
						.select(authEntity.userNick)
						.from(authEntity)
						.where(commentEntity.commentWriteId.eq(authEntity.userId))
		);
	}

	@Override
	public List<CommentDto> commentList(ReqBoardDto dto) {
		return queryFactory
				.select(commentDtoPro())
				.from(commentEntity)
				.where(commentEntity.boardId.eq(dto.getReqBoardId()))
				.fetch();
	}
}
