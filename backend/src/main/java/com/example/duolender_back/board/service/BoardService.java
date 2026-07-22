package com.example.duolender_back.board.service;

import com.example.duolender_back.board.dto.BoardDto;
import com.example.duolender_back.board.dto.ReqBoardDto;
import com.example.duolender_back.board.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;

	public List<BoardDto> boardList(ReqBoardDto dto) {
		return boardRepository.boardList(dto);
	}
}
