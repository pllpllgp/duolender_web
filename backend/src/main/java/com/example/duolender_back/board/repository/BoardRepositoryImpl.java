package com.example.duolender_back.board.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.board.dto.BoardDto;
import com.example.duolender_back.board.dto.BoardListDto;
import com.example.duolender_back.board.dto.QBoardDto;
import com.example.duolender_back.board.dto.ReqBoardDto;
import com.example.duolender_back.board.entity.BoardEntity;
import com.example.duolender_back.board.entity.QBoardEntity;
import com.example.duolender_back.group.dto.GroupDto;
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

	public QBoardDto boardDtoPro() {
		return new QBoardDto(
				boardEntity.boardId,
				boardEntity.boardNm,
				boardEntity.boardCntn,
				boardEntity.boardType,
				boardEntity.boardCrtnDtm,
				boardEntity.boardWriteId,
				JPAExpressions
						.select(authEntity.userNick)
						.from(authEntity)
						.where(boardEntity.boardWriteId.eq(authEntity.userId)),
				boardEntity.groupId
		);
	}

	@Override
	public BoardListDto boardList(ReqBoardDto dto) {
		List<BoardDto> list = queryFactory
				.select(boardDtoPro())
				.from(boardEntity)
				.where(
						boardEntity.boardType.eq(dto.getReqBoardType()),
						dto.getReqBoardType().equals("group") ? boardEntity.groupId.eq(dto.getReqGroupId()) : null
				)
				.orderBy(boardEntity.boardCrtnDtm.desc())
				.offset((dto.getReqPage()-1)*7L)
				.limit(7)
				.fetch();

		long totalCount = queryFactory
				.select(
					boardEntity.boardId.count()
				)
				.from(boardEntity)
				.where(
					boardEntity.boardType.eq(dto.getReqBoardType()),
					dto.getReqBoardType().equals("group") ? boardEntity.groupId.eq(dto.getReqGroupId()) : null
				)
				.fetchOne();

		return new BoardListDto(list, totalCount);
	}

	@Override
	public BoardDto boardView(ReqBoardDto dto) {
		JPAQuery<BoardDto> query;

		query = queryFactory
				.select(boardDtoPro())
				.from(boardEntity)
				.where(boardEntity.boardId.eq(dto.getReqBoardId()));

		BoardDto boardDto = query.fetchOne();

		return boardDto;
	}
}
