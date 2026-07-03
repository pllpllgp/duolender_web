package com.example.duolender_back.schedule.service;

import com.example.duolender_back.schedule.dto.SchScheduleDto;
import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.example.duolender_back.schedule.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	public List<ScheduleDto> ScheduleList(SchScheduleDto dto) {
		List<ScheduleDto> scheduleDtoList = scheduleRepository.findScheduleList(dto.getUserId(), dto.getSchScheduleDate());
		return scheduleDtoList;
	}

	public boolean scheduleRegister(ScheduleDto dto) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String toDate = now.format(formatter);

		ScheduleEntity entity = new ScheduleEntity();
		entity.setScheduleNm(dto.getScheduleNm());
		entity.setScheduleGroupId(dto.getScheduleGroupId());
		entity.setScheduleDtm(dto.getScheduleDtm());
		entity.setScheduleMemo(dto.getScheduleMemo());
		entity.setScheduleCrtnId(dto.getScheduleCrtnId());
		entity.setScheduleCrtnDtm(toDate);

		scheduleRepository.save(entity);

		return true;
	}

	public ScheduleDto ScheduleView(SchScheduleDto dto) {
		ScheduleEntity scheduleEntity = scheduleRepository.findScheduleView(dto.getSchScheduleId());

		ScheduleDto scheduleDto = new ScheduleDto();
		scheduleDto.setScheduleId(scheduleEntity.getScheduleId());
		scheduleDto.setScheduleNm(scheduleEntity.getScheduleNm());
		scheduleDto.setScheduleMemo(scheduleEntity.getScheduleMemo());
		scheduleDto.setScheduleDtm(scheduleEntity.getScheduleDtm());
		scheduleDto.setScheduleGroupId(scheduleEntity.getScheduleGroupId());

		return scheduleDto;
	}

}
