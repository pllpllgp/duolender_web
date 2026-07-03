package com.example.duolender_back.schedule.repository;

import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.schedule.dto.ReqScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Integer>, ScheduleRepositoryCustom {
	Optional<ScheduleEntity> findByScheduleId(int reqScheduleId);

}
