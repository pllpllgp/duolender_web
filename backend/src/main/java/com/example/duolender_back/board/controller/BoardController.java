package com.example.duolender_back.board.controller;

import com.example.duolender_back.board.dto.BoardDto;
import com.example.duolender_back.board.dto.BoardListDto;
import com.example.duolender_back.board.dto.ReqBoardDto;
import com.example.duolender_back.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

	@Autowired
	private BoardService boardService;

	@PostMapping("/boardList")
	public BoardListDto boardList(@RequestBody ReqBoardDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setReqUserId(userDetails.getUsername());
		return boardService.boardList(dto);
	}

	@PostMapping("/save")
	public void boardSave(@RequestBody ReqBoardDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setReqUserId(userDetails.getUsername());
		boardService.boardSave(dto);
	}

	@PostMapping("/view")
	public BoardDto boardView(@RequestBody ReqBoardDto dto) {
		return boardService.boardView(dto);
	}

	@PostMapping("/delete")
	public void boardDelete(@RequestBody ReqBoardDto dto) {
		boardService.boardDelete(dto);
	}
}
