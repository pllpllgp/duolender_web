package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.UserGroupLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserGroupLinkRepository extends JpaRepository<UserGroupLinkEntity, Integer> {
	Optional<UserGroupLinkEntity> findByGroupIdAndUserId(int groupId, String userId);
}
