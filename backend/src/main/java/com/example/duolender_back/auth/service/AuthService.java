package com.example.duolender_back.auth.service;

import com.example.duolender_back.auth.dto.AuthDto;
import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.auth.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
	@Autowired
	private AuthRepository authRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public boolean signup(AuthDto dto) {
		//중복 ID 체크
		if(authRepository.findById(dto.getUserId()).isPresent()) {
			return false;
		};

		AuthEntity entity = new AuthEntity();
		entity.setUserId(dto.getUserId());
		entity.setUserPw(passwordEncoder.encode(dto.getUserPw()));
		entity.setUserNm(dto.getUserNm());
		entity.setUserPhone(dto.getUserPhone());
		entity.setUserEmail(dto.getUserEmail());
		entity.setUserSnsLogin(dto.getUserSnsLogin());

		authRepository.save(entity);

		return true;

	}

	public AuthEntity login(AuthDto dto) {
		Optional<AuthEntity> userOpt = authRepository.findById(dto.getUserId());

		if(userOpt.isPresent()) {
			AuthEntity auth = userOpt.get();
			if(passwordEncoder.matches(dto.getUserPw(), auth.getUserPw())) {
				return auth;
			}
		}

		return new AuthEntity();

	}
}
