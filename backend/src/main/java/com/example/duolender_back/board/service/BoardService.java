package com.example.duolender_back.board.service;

import com.example.duolender_back.board.dto.BoardDto;
import com.example.duolender_back.board.dto.BoardListDto;
import com.example.duolender_back.board.dto.ReqBoardDto;
import com.example.duolender_back.board.entity.BoardEntity;
import com.example.duolender_back.board.repository.BoardRepository;
import com.example.duolender_back.config.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;

	public BoardListDto boardList(ReqBoardDto dto) {
		return boardRepository.boardList(dto);
	}

	@Transactional
	public String boardSave(ReqBoardDto dto) {
		if(dto.getReqCmd().equals("write")) {
			BoardEntity entity = new BoardEntity();
			entity.setBoardNm(dto.getReqBoardNm());
			entity.setBoardCntn(dto.getReqBoardCntn());
			entity.setBoardType(dto.getReqBoardType());
			entity.setBoardCrtnDtm(CommonUtil.toDate());
			entity.setBoardCrtnId(dto.getReqUserId());
			entity.setBoardWriteId(dto.getReqUserId());

			if(dto.getReqBoardType().equals("group")) {
				entity.setGroupId(dto.getReqGroupId());
			}

			boardRepository.save(entity);

		} else if(dto.getReqCmd().equals("modify")) {

		}


		return null;
	}
}
