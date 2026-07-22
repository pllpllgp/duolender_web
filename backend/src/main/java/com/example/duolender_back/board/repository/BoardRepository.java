package com.example.duolender_back.board.repository;

import com.example.duolender_back.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer>, BoardRepositoryCustom {
}
