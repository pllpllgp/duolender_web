package com.example.duolender_back.group.repository;

import com.example.duolender_back.group.entity.GroupEntity;

import java.util.List;

public interface GroupRepositoryCustom {
	List<GroupEntity> findGroupList(String groupNm);
}
