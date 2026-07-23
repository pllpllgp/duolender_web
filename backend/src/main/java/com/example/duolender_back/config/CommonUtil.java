package com.example.duolender_back.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommonUtil {

	//오늘 날짜 구하기
	public static String toDate() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String toDate = now.format(formatter);

		return toDate;
	}

}
