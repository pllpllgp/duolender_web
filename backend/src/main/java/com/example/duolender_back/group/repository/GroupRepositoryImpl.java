package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.entity.QGroupEntity;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	QGroupEntity qEntity = QGroupEntity.groupEntity;

	private BooleanExpression groupNmCondition(String groupNm) {
		// null이거나 isEmpty()가 true(공백)일 경우 null 반환
		if (groupNm == null || groupNm.isEmpty()) {
			return null;
		}
		return qEntity.groupNm.eq(groupNm);
	}

	@Override
	public List<GroupEntity> findGroupList(String groupNm) {
		return queryFactory
				.selectFrom(qEntity)
				.where(
					groupNmCondition(groupNm)
				)
				.fetch();
	}
}
