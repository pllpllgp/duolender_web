package com.example.duolender_back.group.controller;

import com.example.duolender_back.group.dto.GroupDetailDto;
import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.ReqGroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
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

	@PostMapping("/search")
	public List<GroupDto> groupSearch(@RequestBody ReqGroupDto dto) {
		return groupService.groupSearch(dto);
	}

	@PostMapping("/detail")
	public GroupDetailDto groupDetail(@RequestBody ReqGroupDto dto) {
		return groupService.groupDetail(dto);
	}

	@PostMapping("/register")
	public Map<String, Object> groupRegister(@RequestBody ReqGroupDto dto) {
		boolean result = groupService.groupRegister(dto);

		Map<String, Object> res = new HashMap<>();
		if(result) {
			res.put("result", true);
		} else {
			res.put("result", false);
		}

		return res;
	}

	@PostMapping("/groupReq")
	public GroupDto groupReq(@RequestBody ReqGroupDto dto) {
		groupService.groupReq(dto);

		return null;
	}
}
