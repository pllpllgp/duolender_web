package com.example.duolender_back.group.controller;

import com.example.duolender_back.group.dto.GroupDetailDto;
import com.example.duolender_back.group.dto.GroupDto;
import com.example.duolender_back.group.dto.GroupMemberDto;
import com.example.duolender_back.group.dto.ReqGroupDto;
import com.example.duolender_back.group.entity.GroupEntity;
import com.example.duolender_back.group.entity.UserGroupLinkEntity;
import com.example.duolender_back.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
	public List<GroupDto> groupSearch(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		return groupService.groupSearch(dto);
	}

	@PostMapping("/myGroupSearch")
	public List<GroupDto> myGroupSearch(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		return groupService.myGroupSearch(dto);
	}

	@PostMapping("/detail")
	public GroupDetailDto groupDetail(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		return groupService.groupDetail(dto);
	}

	@PostMapping("/register")
	public Map<String, Object> groupRegister(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		boolean result = groupService.groupRegister(dto);

		Map<String, Object> res = new HashMap<>();
		if(result) {
			res.put("result", true);
		} else {
			res.put("result", false);
		}

		return res;
	}

	@PostMapping("/joinReq")
	public void joinReq(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		groupService.joinReq(dto);
	}

	@PostMapping("/leaveReq")
	public void leaveReq(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		groupService.leaveReq(dto);
	}

	@PostMapping("/updateColor")
	public void updateColor(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		groupService.updateColor(dto);
	}

	@PostMapping("/memberList")
	public List<GroupMemberDto> memberList(@RequestBody ReqGroupDto dto, @AuthenticationPrincipal UserDetails userDetails) {
		dto.setUserId(userDetails.getUsername());
		return groupService.memberList(dto);
	}

	@PostMapping("/approveMember")
	public void approveMember(@RequestBody ReqGroupDto dto) {
		groupService.approveMember(dto);
	}
}
