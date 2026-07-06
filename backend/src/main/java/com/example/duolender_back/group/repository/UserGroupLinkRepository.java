package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.UserGroupLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserGroupLinkRepository extends JpaRepository<UserGroupLinkEntity, String> {
}
