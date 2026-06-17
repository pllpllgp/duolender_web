package com.example.duolender_back.empty.service;

import com.example.duolender_back.empty.dto.ScheduleDto;
import com.example.duolender_back.empty.entity.ScheduleEntity;
import com.example.duolender_back.empty.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	public List<ScheduleDto> ScheduleList(ScheduleDto dto) {
		List<ScheduleEntity> ScheduleEntity = scheduleRepository.findScheduleList(dto.getUserId(), dto.getSchScheduleDate());
		System.out.println("ScheduleEntity:::::::"+ScheduleEntity.size());

		List<ScheduleDto> scheduleDtoList = ScheduleEntity.stream()
				.map(entity -> {
					ScheduleDto scheduleDto = new ScheduleDto();
					scheduleDto.setScheduleNm(entity.getScheduleNm());
					scheduleDto.setScheduleStartDtm(entity.getScheduleStartDtm());
					scheduleDto.setScheduleEndDtm(entity.getScheduleEndDtm());
					scheduleDto.setScheduleMemo(entity.getScheduleMemo());

					return scheduleDto;
				})
				.collect(Collectors.toList());

		return scheduleDtoList;
	}

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
