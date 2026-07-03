package com.example.duolender_back.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="dl_user", schema = "duolender")
public class AuthEntity {
	@Id
	private String userId;

	@Column(nullable = true)
	private String userNm;

	@Column(nullable = true)
	private String userPw;

	@Column(nullable = true)
	private String userPhone;

	@Column(nullable = true)
	private String userEmail;

	@Column(nullable = false)
	private String userSnsLogin;

	@Column(nullable = false)
	private String userCrtnDtm;

	@Column(nullable = false)
	private String userChngDtm;

	@Column(nullable = false)
	private String scheduleColor;

}
