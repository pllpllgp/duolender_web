package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, String>, GroupRepositoryCustom {
	Optional<GroupEntity> findByGroupId(int groupId);
}
