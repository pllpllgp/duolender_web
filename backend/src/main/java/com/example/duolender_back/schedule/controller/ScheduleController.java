package com.example.duolender_back.schedule.controller;

import com.example.duolender_back.schedule.dto.ReqScheduleDto;
import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

	@Autowired
	private ScheduleService scheduleService;

	@PostMapping("/list")
	public List<ScheduleDto> scheduleList(@RequestBody ReqScheduleDto dto) {
		return scheduleService.ScheduleList(dto);
	}

	@PostMapping("/save")
	public Map<String, Object> scheduleSave(@RequestBody ReqScheduleDto dto) {
		boolean result = false;
		if(dto.getReqScheduleStatus().equals("insert")) {
			result = scheduleService.scheduleRegister(dto);
		} else {
			result = scheduleService.scheduleModify(dto);
		}

		Map<String, Object> res = new HashMap<>();
		if(result) {
			res.put("result", true);
		} else {
			res.put("result", false);
		}

		return res;

	}

	@PostMapping("/view")
	public ScheduleDto scheduleView(@RequestBody ReqScheduleDto dto) {
		return scheduleService.ScheduleView(dto);
	}
}
