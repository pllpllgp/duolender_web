package com.example.duolender_back.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="dl_board", schema = "duolender")
public class BoardEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "board_id")
	private int boardId;

	@Column(nullable = true)
	private String boardNm;

	@Column(nullable = true)
	private String boardCntn;

	@Column(nullable = true)
	private String boardType;

	@Column(nullable = true)
	private String boardCrtnDtm;

	@Column(nullable = true)
	private String boardCrtnId;

	@Column(nullable = true)
	private String boardChngDtm;

	@Column(nullable = true)
	private String boardChngId;

	@Column(nullable = true)
	private String boardWriteId;

	@Column(nullable = true)
	private int groupId;
}
