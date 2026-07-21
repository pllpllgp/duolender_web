package com.example.duolender_back.board.repository;

import com.example.duolender_back.board.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Integer, CommentEntity> {
}
