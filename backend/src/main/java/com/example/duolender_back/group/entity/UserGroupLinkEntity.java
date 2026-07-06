package com.example.duolender_back.group.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="dl_user_group_link", schema = "duolender")
public class UserGroupLinkEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_group_link_id")
	private int userGroupLinkId;

	@Column(nullable = false)
	private String groupId;

	@Column(nullable = false)
	private String userId;

	@Column(nullable = false)
	private String groupJoinState;

	@Column(nullable = false)
	private String groupJoinCrtnDtm;

	@Column(nullable = false)
	private String groupAdminGrade;

	@Column(nullable = false)
	private String scheduleColor;

}
