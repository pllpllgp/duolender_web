package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.schedule.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, String>, ScheduleRepositoryCustom {
}
