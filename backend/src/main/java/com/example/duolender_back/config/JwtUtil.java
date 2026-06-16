package com.example.duolender_back.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
	@Value("${jwt.secret}")
	private String secretKey;

	private SecretKey getKey() {
		return Keys.hmacShaKeyFor(secretKey.getBytes());
	}

	//토큰 만들기
	public String generateToken(String id) {
		return Jwts.builder()
				.subject(id)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + 1000*60*60)) //1시간
				.signWith(getKey())
				.compact();
	}

	//토큰에서 ID 추출
	public String extractId(String token) {
		return Jwts.parser()
				.verifyWith(getKey())
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}

	//토큰 유효성 검사
	public boolean validateToken(String token) {
		try {
			Jwts.parser()
				.verifyWith(getKey())
				.build()
				.parseSignedClaims(token);

			return true;

		} catch (Exception e) {
			return false;
		}
	}
}
