package com.example.duolender_back.auth.repository;

import com.example.duolender_back.auth.entity.AuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository  extends JpaRepository<AuthEntity, String> {
	Optional<AuthEntity> findById(String userId);

	Optional<AuthEntity> findByUserNick(String userNick);
}
