package com.example.duolender_back.auth.controller;

import com.example.duolender_back.auth.dto.AuthDto;
import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.auth.service.AuthService;
import com.example.duolender_back.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	@Autowired
	private AuthService authService;

	private final JdbcTemplate jdbcTemplate;

	@Autowired
	private JwtUtil jwtUtil;

	@GetMapping("/duoConnect")
	public ResponseEntity<String> DuoConnect() {
		try {
			jdbcTemplate.execute("SELECT 1");
			return ResponseEntity.ok("Connect Success");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Connect Failed: " + e.getMessage());
		}
	}

	@PostMapping("/idDupleCheck")
	public Map<String, Object> idDupleCheck(@RequestBody AuthDto dto) {
		boolean result = authService.idDupleCheck(dto);

		Map<String, Object> res = new HashMap<>();
		res.put("result", result);

		return res;
	}

	@PostMapping("/nickDupleCheck")
	public Map<String, Object> nickDupleCheck(@RequestBody AuthDto dto) {
		boolean result = authService.nickDupleCheck(dto);

		Map<String, Object> res = new HashMap<>();
		res.put("result", result);

		return res;
	}

	@PostMapping("/signup")
	public Map<String, Object> signup(@RequestBody AuthDto dto) {
		String result = authService.signup(dto);

		Map<String, Object> res = new HashMap<>();
		res.put("result", result);

		return res;

	}

	@PostMapping("/login")
	public AuthDto Login(@RequestBody AuthDto dto) {
		AuthEntity authInfo = authService.login(dto);

		AuthDto authDto = new AuthDto();

		if(StringUtils.hasText(authInfo.getUserId())) {
			authDto.setUserId(authInfo.getUserId());
			authDto.setUserNick(authInfo.getUserNick());
			authDto.setUserNm(authInfo.getUserNm());
			authDto.setUserEmail(authInfo.getUserEmail());
			authDto.setUserPhone(authInfo.getUserPhone());
			authDto.setScheduleColor(authInfo.getScheduleColor());
			authDto.setUserToken(jwtUtil.generateToken(authInfo.getUserId()));

		}

		return authDto;

	}


	@PostMapping("/update")
	public void update(@RequestBody AuthDto dto) {
		authService.update(dto);

	}

}
