package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.entity.QGroupEntity;
import com.example.duolender_back.schedule.entity.QScheduleEntity;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.example.duolender_back.schedule.repository.ScheduleRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	QGroupEntity qEntity = QGroupEntity.groupEntity;

	@Override
	public List<GroupEntity> findScheduleList(String userId, String schDate) {
		return queryFactory
				.selectFrom(qEntity)
				.fetch();
	}
}
