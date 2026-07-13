package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.auth.entity.QAuthEntity;
import com.example.duolender_back.group.entity.QGroupEntity;
import com.example.duolender_back.group.entity.QUserGroupLinkEntity;
import com.example.duolender_back.schedule.dto.QScheduleDto;
import com.example.duolender_back.schedule.dto.ScheduleDto;
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

	QScheduleEntity scheduleEntity = QScheduleEntity.scheduleEntity;
	QAuthEntity authEntity = QAuthEntity.authEntity;
	QUserGroupLinkEntity groupLinkEntity = QUserGroupLinkEntity.userGroupLinkEntity;

	@Override
	public List<ScheduleDto> findSchedulePri(String userId, String reqScheduleDate) {
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
					scheduleEntity.scheduleType.eq("P"),
					scheduleEntity.scheduleCrtnId.eq(userId),
					scheduleEntity.scheduleDtm.startsWith(reqScheduleDate)
				)
				.fetch();
	}

	@Override
	public List<ScheduleDto> findScheduleGro(String userId, String reqScheduleDate) {
		return queryFactory
				.select(new QScheduleDto(
						scheduleEntity.scheduleId,
						scheduleEntity.scheduleNm,
						scheduleEntity.scheduleDtm,
						scheduleEntity.scheduleMemo,
						groupLinkEntity.scheduleColor))
				.from(scheduleEntity)
				.innerJoin(groupLinkEntity)
					.on(scheduleEntity.scheduleGroupId.eq(groupLinkEntity.groupId))
					.on(groupLinkEntity.userId.eq(userId))
					.on(groupLinkEntity.groupJoinState.eq("Y"))
				.where(
					scheduleEntity.scheduleType.eq("G"),
					scheduleEntity.scheduleDtm.startsWith(reqScheduleDate)
				)
				.fetch();
	}

	@Override
	public ScheduleEntity findScheduleView(int reqScheduleId) {
		return queryFactory
				.selectFrom(scheduleEntity)
				.where(scheduleEntity.scheduleId.eq(reqScheduleId))
				.fetchOne();
	}
}
