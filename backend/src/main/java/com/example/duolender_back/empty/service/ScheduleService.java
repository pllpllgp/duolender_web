package com.example.duolender_back.empty.service;

import com.example.duolender_back.empty.dto.ScheduleDto;
import com.example.duolender_back.empty.entity.ScheduleEntity;
import com.example.duolender_back.empty.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	public boolean scheduleRegister(ScheduleDto dto) {
		ScheduleEntity entity = new ScheduleEntity();
		entity.setScheduleId(dto.getScheduleId());
		entity.setScheduleNm(dto.getScheduleNm());
		entity.setScheduleGroupId(dto.getScheduleGroupId());
		entity.setScheduleMemo(dto.getScheduleMemo());
		entity.setScheduleCrtnId(dto.getScheduleCrtnId());

		scheduleRepository.save(entity);

		return true;
	}

}
