package com.example.duolender_back.schedule.service;

import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.example.duolender_back.schedule.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	public List<ScheduleDto> ScheduleList(ScheduleDto dto) {
		List<ScheduleEntity> ScheduleEntity = scheduleRepository.findScheduleList(dto.getUserId(), dto.getSchScheduleDate());

		List<ScheduleDto> scheduleDtoList = ScheduleEntity.stream()
				.map(entity -> {
					ScheduleDto scheduleDto = new ScheduleDto();
					scheduleDto.setScheduleNm(entity.getScheduleNm());
					scheduleDto.setScheduleDtm(entity.getScheduleDtm());
					scheduleDto.setScheduleMemo(entity.getScheduleMemo());

					return scheduleDto;
				})
				.collect(Collectors.toList());

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

}
