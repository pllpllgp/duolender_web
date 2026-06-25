package com.example.duolender_back.group.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="dl_group", schema = "duolender")
public class GroupEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "group_id")
	private int groupId;

	@Column(nullable = true)
	private String groupNm;

	@Column(nullable = true)
	private String groupCrtnId;

	@Column(nullable = true)
	private String groupCrtnDtm;

	@Column(nullable = true)
	private String groupMemo;

}
