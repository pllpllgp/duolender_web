package com.example.duolender_back.auth.service;

import com.example.duolender_back.auth.dto.AuthDto;
import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.auth.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthService {
	@Autowired
	private AuthRepository authRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Pattern PASSWORD_PATTERN = Pattern.compile(
			"^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,20}$"
	);


	public boolean idDupleCheck(AuthDto dto) {
		//중복 ID 체크
		if(authRepository.findById(dto.getUserId()).isPresent()) {
			return false;
		};

		return true;

	}

	public String signup(AuthDto dto) {
		String result = "";

		boolean pwValid = PASSWORD_PATTERN.matcher(dto.getUserPw()).matches();

		//비밀번호 유효성 검사
		if(!pwValid) {
			result = "notPwValid";

		} else {
			AuthEntity entity = new AuthEntity();
			entity.setUserId(dto.getUserId());
			entity.setUserPw(passwordEncoder.encode(dto.getUserPw()));
			entity.setUserNick(dto.getUserId());

			authRepository.save(entity);

			result = "success";
		}

		return result;

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
