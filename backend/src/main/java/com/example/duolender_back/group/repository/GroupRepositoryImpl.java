package com.example.duolender_back.group.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.QGroupDto;
import com.example.duolender_back.group.dto.ReqGroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.entity.QGroupEntity;
import com.example.duolender_back.group.entity.QUserGroupLinkEntity;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
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

	@Override
	public List<GroupDto> searchGroupList(ReqGroupDto dto) {
		JPAQuery<GroupDto> query;

		//그룹 검색
		if(dto.getReqActiveTab().equals("searchGroup")) {
			query = queryFactory
					.select(new QGroupDto(
						groupEntity.groupId,
						groupEntity.groupNm,
						groupEntity.groupMemo,
						groupEntity.groupCrtnId,
						authEntity.userNick))
					.from(groupEntity)
					.innerJoin(authEntity)
					.on(groupEntity.groupCrtnId.eq(authEntity.userId))
					.where(
						groupEntity.groupId.notIn(
								JPAExpressions
								.select(userGroupLinkEntity.groupId)
								.from(userGroupLinkEntity)
								.where(userGroupLinkEntity.userId.eq(dto.getUserId()))),
						groupEntity.groupNm.contains(dto.getReqGroupNm())
					);

		//내 그룹 검색
		} else {
			query = queryFactory
					.select(new QGroupDto(
						groupEntity.groupId,
						groupEntity.groupNm,
						groupEntity.groupMemo,
						groupEntity.groupCrtnId,
						authEntity.userNick))
					.from(groupEntity)
					.innerJoin(userGroupLinkEntity)
					.on(groupEntity.groupId.eq(userGroupLinkEntity.groupId))
					.on(userGroupLinkEntity.userId.eq(dto.getUserId()))
					.innerJoin(authEntity)
					.on(userGroupLinkEntity.userId.eq(authEntity.userId));

		}

		List<GroupDto> result = query.fetch();

		return result;
	}
}
