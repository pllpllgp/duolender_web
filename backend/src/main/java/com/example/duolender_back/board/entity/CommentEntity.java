package com.example.duolender_back.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="dl_board_comment", schema = "duolender")
public class CommentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private int commentId;

	@Column(nullable = true)
	private int board_id;

	@Column(nullable = true)
	private String comment_cntn;

	@Column(nullable = true)
	private String comment_crtn_dtm;

	@Column(nullable = true)
	private String comment_crtn_id;

	@Column(nullable = true)
	private String comment_chng_dtm;

	@Column(nullable = true)
	private String comment_chng_id;

	@Column(nullable = true)
	private String comment_write_id;
}
