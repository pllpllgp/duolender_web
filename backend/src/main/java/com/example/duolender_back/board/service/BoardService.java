package com.example.duolender_back.board.service;

import com.example.duolender_back.board.dto.*;
import com.example.duolender_back.board.entity.BoardEntity;
import com.example.duolender_back.board.entity.CommentEntity;
import com.example.duolender_back.board.repository.BoardRepository;
import com.example.duolender_back.board.repository.CommentRepository;
import com.example.duolender_back.config.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private CommentRepository commentRepository;

	public BoardListDto boardList(ReqBoardDto dto) {
		return boardRepository.boardList(dto);
	}

	@Transactional
	public boolean boardSave(ReqBoardDto dto) {
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
			Optional<BoardEntity> boardOpt = boardRepository.findBoardEntityByBoardId(dto.getReqBoardId());

			if(boardOpt.isEmpty()) {
				return false;
			}

			BoardEntity entity = boardOpt.get();
			entity.setBoardNm(dto.getReqBoardNm());
			entity.setBoardCntn(dto.getReqBoardCntn());
			entity.setBoardChngDtm(CommonUtil.toDate());
			entity.setBoardChngId(dto.getReqUserId());
		}

		return true;
	}

	public BoardDto boardView(ReqBoardDto dto) {
		return boardRepository.boardView(dto);
	}

	@Transactional
	public void boardDelete(ReqBoardDto dto) {
		BoardEntity entity = new BoardEntity();
		entity.setBoardId(dto.getReqBoardId());
		entity.setBoardWriteId(dto.getReqUserId());

		boardRepository.delete(entity);
	}

	public List<CommentDto> commentList(ReqBoardDto dto) {
		return commentRepository.commentList(dto);
	}

	@Transactional
	public boolean commentSave(ReqBoardDto dto) {
		if(dto.getReqCmd().equals("write")) {
			CommentEntity entity = new CommentEntity();
			entity.setBoardId(dto.getReqBoardId());
			entity.setCommentCntn(dto.getReqCommentCntn());
			entity.setCommentCrtnDtm(CommonUtil.toDate());
			entity.setCommentCrtnId(dto.getReqUserId());
			entity.setCommentWriteId(dto.getReqUserId());

			commentRepository.save(entity);

		} else if(dto.getReqCmd().equals("modify")) {
			Optional<CommentEntity> commentOpt = commentRepository.findCommentEntityByCommentId(dto.getReqCommentId());

			if(commentOpt.isEmpty()) {
				return false;
			}

			CommentEntity entity = commentOpt.get();
			entity.setCommentCntn(dto.getReqBoardCntn());
			entity.setCommentChngDtm(CommonUtil.toDate());
			entity.setCommentChngId(dto.getReqUserId());
		}

		return true;
	}

	@Transactional
	public void commentDelete(ReqBoardDto dto) {
		CommentEntity entity = new CommentEntity();
		entity.setCommentId(dto.getReqCommentId());
		entity.setCommentWriteId(dto.getReqUserId());

		commentRepository.delete(entity);
	}
}
