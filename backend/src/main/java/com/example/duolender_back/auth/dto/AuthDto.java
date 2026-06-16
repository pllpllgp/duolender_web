package com.example.duolender_back.auth.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDto {
	private String userId;
	private String userNm;
	private String userPw;
	private String userPhone;
	private String userEmail;
	private String userSnsLogin;
	private String userCrtnDtm;
	private String userChngDtm;
	private String userToken;

}
