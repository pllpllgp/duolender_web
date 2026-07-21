package com.example.duolender_back.group.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.group.dto.*;
import com.example.duolender_back.group.entity.QGroupEntity;
import com.example.duolender_back.group.entity.QUserGroupLinkEntity;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	QGroupEntity groupEntity = QGroupEntity.groupEntity;

	QUserGroupLinkEntity userGroupLinkEntity = QUserGroupLinkEntity.userGroupLinkEntity;

	QAuthEntity authEntity = QAuthEntity.authEntity;

	//alias 테이블
	QUserGroupLinkEntity innerUserGroupLink = new QUserGroupLinkEntity("innerUserGroupLink");
	QUserGroupLinkEntity subUserGroupLink = new QUserGroupLinkEntity("subUserGroupLink");
	QUserGroupLinkEntity leftUserGroupLink = new QUserGroupLinkEntity("leftUserGroupLink");

	//모임 멤버원 수 조회 서브쿼리
	private JPQLQuery<Long> groupMemCntSubQuery() {
		return JPAExpressions
				.select(subUserGroupLink.count())
				.from(subUserGroupLink)
				.where(
					groupEntity.groupId.eq(subUserGroupLink.groupId),
					subUserGroupLink.groupJoinState.eq("Y")
				);
	}

	//QGroupDto 공통부분
	private QGroupDto groupDtoPro() {
		return new QGroupDto(
				groupEntity.groupId,
				groupEntity.groupNm,
				groupEntity.groupMemo,
				groupMemCntSubQuery(),
				innerUserGroupLink.groupJoinState,
				innerUserGroupLink.groupAdminGrade,
				innerUserGroupLink.scheduleColor,
				groupEntity.groupCrtnId
		);
	}

	private QGroupDetailDto groupDetailDtoPro() {
		return new QGroupDetailDto(
				groupEntity.groupId,
				groupEntity.groupNm,
				groupEntity.groupMemo,
				groupMemCntSubQuery(),
				authEntity.userNick,
				leftUserGroupLink.groupJoinState,
				groupEntity.groupSecretYn
		);
	}

	//검색 조건 유무
	private BooleanExpression secretYn(boolean isSearch) {
		return isSearch ? null : groupEntity.groupSecretYn.eq("N");
	}


	//모임 검색
	@Override
	public List<GroupDto> searchGroupList(ReqGroupDto dto) {
		boolean isSearch = !dto.getReqGroupNm().isEmpty();

		JPAQuery<GroupDto> query;

		query = queryFactory
				.select(groupDtoPro())
				.from(groupEntity)
				.innerJoin(authEntity)
					.on(groupEntity.groupCrtnId.eq(authEntity.userId))
				.leftJoin(innerUserGroupLink)
					.on(groupEntity.groupId.eq(innerUserGroupLink.groupId))
					.on(innerUserGroupLink.userId.eq(dto.getUserId()))
				.where(
						groupEntity.groupId.notIn(
								JPAExpressions
										.select(userGroupLinkEntity.groupId)
										.from(userGroupLinkEntity)
										.where(
											userGroupLinkEntity.userId.eq(dto.getUserId()),
											userGroupLinkEntity.groupJoinState.eq("Y"))),
						groupEntity.groupNm.contains(dto.getReqGroupNm()),
						secretYn(isSearch)
				);

		List<GroupDto> result = query.fetch();

		return result;
	}


	//내 모임 검색
	@Override
	public List<GroupDto> searchMyGroupList(ReqGroupDto dto) {
		JPAQuery<GroupDto> query;

		query = queryFactory
				.select(groupDtoPro())
				.from(groupEntity)
				.innerJoin(innerUserGroupLink)
					.on(groupEntity.groupId.eq(innerUserGroupLink.groupId))
					.on(innerUserGroupLink.userId.eq(dto.getUserId()))
				.orderBy(innerUserGroupLink.groupJoinCrtnDtm.desc());

		List<GroupDto> result = query.fetch();

		return result;
	}


	//모임 상세보기
	@Override
	public GroupDetailDto groupDetail(ReqGroupDto dto) {
		JPAQuery<GroupDetailDto> query;

		query = queryFactory
				.select(groupDetailDtoPro())
				.from(groupEntity)
				.innerJoin(authEntity)
					.on(groupEntity.groupCrtnId.eq(authEntity.userId))
				.leftJoin(leftUserGroupLink)
					.on(groupEntity.groupId.eq(leftUserGroupLink.groupId))
					.on(leftUserGroupLink.userId.eq(dto.getUserId()))
				.where(groupEntity.groupId.eq(dto.getGroupId()));

		GroupDetailDto result = query.fetchOne();

		return result;
	}

	//모임원 조회
	@Override
	public List<GroupMemberDto> searchMemberList(ReqGroupDto dto) {
		JPAQuery<GroupMemberDto> query;

		query = queryFactory
				.select(new QGroupMemberDto(
						innerUserGroupLink.userId,
						authEntity.userNick,
						innerUserGroupLink.groupId,
						innerUserGroupLink.groupAdminGrade,
						innerUserGroupLink.groupJoinState))
				.from(innerUserGroupLink)
				.innerJoin(authEntity)
					.on(innerUserGroupLink.userId.eq(authEntity.userId))
				.innerJoin(groupEntity)
					.on(innerUserGroupLink.groupId.eq(groupEntity.groupId))
					.on(groupEntity.groupCrtnId.eq(dto.getUserId()))
				.where(
					innerUserGroupLink.groupId.eq(dto.getGroupId())
				)
				.orderBy(innerUserGroupLink.groupJoinCrtnDtm.asc());

		List<GroupMemberDto> result = query.fetch();

		return result;
	}
}
