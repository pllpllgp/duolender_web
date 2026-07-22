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
	private int boardId;

	@Column(nullable = true)
	private String commentCntn;

	@Column(nullable = true)
	private String commentCrtnDtm;

	@Column(nullable = true)
	private String commentCrtnId;

	@Column(nullable = true)
	private String commentChngDtm;

	@Column(nullable = true)
	private String commentChngId;

	@Column(nullable = true)
	private String commentWriteId;
}
