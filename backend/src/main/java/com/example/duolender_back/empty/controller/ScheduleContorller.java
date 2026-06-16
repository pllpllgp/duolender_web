package com.example.duolender_back.empty.controller;

import com.example.duolender_back.empty.dto.ScheduleDto;
import com.example.duolender_back.empty.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleContorller {

	@Autowired
	private ScheduleService scheduleService;

	@PostMapping("/register")
	public Map<String, Object> Singup(@RequestBody ScheduleDto dto) {
		boolean result = scheduleService.scheduleRegister(dto);

		Map<String, Object> res = new HashMap<>();
		if(result) {
			res.put("result", true);
		} else {
			res.put("result", false);
		}

		return res;

	}
}
