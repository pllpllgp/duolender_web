package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.schedule.dto.QScheduleDto;
import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.QScheduleEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	QScheduleEntity scheduleEntity = QScheduleEntity.scheduleEntity;
	QAuthEntity authEntity = QAuthEntity.authEntity;

	@Override
	public List<ScheduleDto> findScheduleList(String userId, String schDate) {
		return queryFactory
				.select(new QScheduleDto(
						scheduleEntity.scheduleId,
						scheduleEntity.scheduleNm,
						scheduleEntity.scheduleDtm,
						scheduleEntity.scheduleMemo,
						authEntity.scheduleColor))
				.from(scheduleEntity)
				.innerJoin(authEntity)
				.on(scheduleEntity.scheduleCrtnId.eq(authEntity.userId))
				.where(
					scheduleEntity.scheduleCrtnId.eq(userId),
					scheduleEntity.scheduleDtm.startsWith(schDate)
				)
				.fetch();
	}
}
