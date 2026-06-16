package com.example.duolender_back.empty.repository;

import com.example.duolender_back.empty.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository  extends JpaRepository<ScheduleEntity, String> {
}
