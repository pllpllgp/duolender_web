package com.example.duolender_back.auth.controller;

import com.example.duolender_back.auth.dto.AuthDto;
import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
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

	@GetMapping("/duoConnect")
	public ResponseEntity<String> DuoConnect() {
		try {
			jdbcTemplate.execute("SELECT 1");
			return ResponseEntity.ok("Connect Success");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Connect Failed: " + e.getMessage());
		}
	}

	@PostMapping("/signup")
	public Map<String, Object> Singup(@RequestBody AuthDto dto) {
		boolean result = authService.signup(dto);

		Map<String, Object> res = new HashMap<>();
		if(result) {
			res.put("result", true);
		} else {
			res.put("result", false);
		}

		return res;

	}

	@PostMapping("/login")
	public Map<String, Object> Login(@RequestBody AuthDto dto) {
		AuthEntity result = authService.login(dto);

		Map<String, Object> res = new HashMap<>();

		return res;

	}

}
