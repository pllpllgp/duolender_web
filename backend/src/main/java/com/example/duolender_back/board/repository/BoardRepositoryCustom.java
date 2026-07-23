package com.example.duolender_back.board.repository;

import com.example.duolender_back.board.dto.BoardDto;
import com.example.duolender_back.board.dto.BoardListDto;
import com.example.duolender_back.board.dto.ReqBoardDto;

import java.util.List;

public interface BoardRepositoryCustom {

	BoardListDto boardList(ReqBoardDto dto);

	BoardDto boardView(ReqBoardDto dto);
}
