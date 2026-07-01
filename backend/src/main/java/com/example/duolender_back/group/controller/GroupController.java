package com.example.duolender_back.group.controller;

import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.service.GroupService;
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
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {

	@Autowired
	private GroupService groupService;

	@PostMapping("/list")
	public List<GroupDto> groupList(@RequestBody GroupDto dto) {
		return groupService.groupList(dto);
	}

	@PostMapping("/detail")
	public List<GroupDto> groupDetail(@RequestBody GroupDto dto) {
		return groupService.groupList(dto);
	}

	@PostMapping("/register")
	public Map<String, Object> groupRegister(@RequestBody GroupDto dto) {
		boolean result = groupService.groupRegister(dto);

		Map<String, Object> res = new HashMap<>();
		if(result) {
			res.put("result", true);
		} else {
			res.put("result", false);
		}

		return res;

	}
}
