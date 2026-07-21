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
	private String board_nm;

	@Column(nullable = true)
	private String board_cntn;

	@Column(nullable = true)
	private String board_type;

	@Column(nullable = true)
	private String board_crtn_dtm;

	@Column(nullable = true)
	private String board_crtn_id;

	@Column(nullable = true)
	private String board_chng_dtm;

	@Column(nullable = true)
	private String board_chng_id;

	@Column(nullable = true)
	private String board_write_id;

	@Column(nullable = true)
	private int group_id;
}
