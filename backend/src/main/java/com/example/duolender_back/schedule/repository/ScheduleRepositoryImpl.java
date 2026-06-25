package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.schedule.entity.QScheduleEntity;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	QScheduleEntity qEntity = QScheduleEntity.scheduleEntity;

	@Override
	public List<ScheduleEntity> findScheduleList(String userId, String schDate) {
		return queryFactory
				.selectFrom(qEntity)
				.where(
					qEntity.scheduleCrtnId.eq(userId),
					qEntity.scheduleDtm.startsWith(schDate)
				)
				.fetch();
	}
}
