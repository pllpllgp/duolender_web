package com.example.duolender_back.board.repository;

import com.example.duolender_back.board.dto.BoardDto;
import com.example.duolender_back.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer>, BoardRepositoryCustom {
	Optional<BoardEntity> findBoardEntityByBoardId(int boardId);
}
