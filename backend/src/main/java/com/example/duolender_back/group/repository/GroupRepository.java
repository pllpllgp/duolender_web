package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, String>, GroupRepositoryCustom {
}
