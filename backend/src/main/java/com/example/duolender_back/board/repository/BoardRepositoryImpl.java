package com.example.duolender_back.board.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.board.dto.BoardDto;
import com.example.duolender_back.board.dto.QBoardDto;
import com.example.duolender_back.board.dto.ReqBoardDto;
import com.example.duolender_back.board.entity.QBoardEntity;
import com.querydsl.core.QueryFactory;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	QBoardEntity boardEntity = QBoardEntity.boardEntity;
	QAuthEntity authEntity = QAuthEntity.authEntity;

	@Override
	public List<BoardDto> boardList(ReqBoardDto dto) {
		JPAQuery<BoardDto> query;

		query = queryFactory
				.select(new QBoardDto(
						boardEntity.boardId,
						boardEntity.boardNm,
						boardEntity.boardCntn,
						boardEntity.boardType,
						boardEntity.boardCrtnDtm,
						JPAExpressions
							.select(authEntity.userNick)
							.from(authEntity)
							.where(boardEntity.boardWriteId.eq(authEntity.userId)),
						boardEntity.groupId))
				.from(boardEntity)
				.where(
						boardEntity.boardType.eq(dto.getReqBoardType()),
						dto.getReqBoardType().equals("group") ? boardEntity.groupId.eq(dto.getReqGroupId()) : null
				)
				.orderBy(boardEntity.boardChng_dtm.desc());

		List<BoardDto> result = query.fetch();


		return result;
	}
}
