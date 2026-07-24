package com.example.duolender_back.board.repository;

import com.example.duolender_back.board.dto.CommentDto;
import com.example.duolender_back.board.dto.CommentListDto;
import com.example.duolender_back.board.dto.ReqBoardDto;

import java.util.List;

public interface CommentRepositoryCustom {
	List<CommentDto> commentList(ReqBoardDto dto);
}
