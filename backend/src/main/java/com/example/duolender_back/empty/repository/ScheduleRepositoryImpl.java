package com.example.duolender_back.empty.repository;

import com.example.duolender_back.empty.entity.QScheduleEntity;
import com.example.duolender_back.empty.entity.ScheduleEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    QScheduleEntity schedule = QScheduleEntity.scheduleEntity;

    @Override
    public List<ScheduleEntity> findScheduleList(String userId, String schDate) {
        return queryFactory
                .selectFrom(schedule)
                .where(
    schedule.scheduleCrtnId.eq(userId))
                .fetch();
    }
}
