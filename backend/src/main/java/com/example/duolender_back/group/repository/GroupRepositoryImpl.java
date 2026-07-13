package com.example.duolender_back.group.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.group.dto.*;
import com.example.duolender_back.group.entity.QGroupEntity;
import com.example.duolender_back.group.entity.QUserGroupLinkEntity;
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

	//그룹 멤버원 수 조회 서브쿼리
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
				authEntity.userNick,
				leftUserGroupLink.groupJoinState,
				groupEntity.groupCrtnId
		);
	}


	//그룹 검색
	@Override
	public List<GroupDto> searchGroupList(ReqGroupDto dto) {
		if(dto.getReqGroupNm() == null) {
			dto.setReqGroupNm("");
		}

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
						groupEntity.groupNm.contains(dto.getReqGroupNm())
				);

		List<GroupDto> result = query.fetch();

		return result;
	}


	//내 그룹 검색
	@Override
	public List<GroupDto> searchMyGroupList(ReqGroupDto dto) {
		JPAQuery<GroupDto> query;

		query = queryFactory
				.select(groupDtoPro())
				.from(groupEntity)
				.innerJoin(innerUserGroupLink)
					.on(groupEntity.groupId.eq(innerUserGroupLink.groupId))
					.on(innerUserGroupLink.userId.eq(dto.getUserId()))
				.innerJoin(authEntity)
					.on(groupEntity.groupCrtnId.eq(authEntity.userId))
				.orderBy(innerUserGroupLink.groupJoinCrtnDtm.desc());

		List<GroupDto> result = query.fetch();

		return result;
	}


	//그룹 상세보기
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
}
