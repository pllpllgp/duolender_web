package com.example.duolender_back.schedule.service;

import com.example.duolender_back.schedule.dto.ReqScheduleDto;
import com.example.duolender_back.schedule.dto.ScheduleDto;
import com.example.duolender_back.schedule.entity.ScheduleEntity;
import com.example.duolender_back.schedule.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	public List<ScheduleDto> ScheduleList(ReqScheduleDto dto) {
		List<ScheduleDto> scheduleDtoList = scheduleRepository.findScheduleList(dto.getUserId(), dto.getReqScheduleDate());
		return scheduleDtoList;
	}

	public boolean scheduleRegister(ReqScheduleDto dto) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String toDate = now.format(formatter);

		ScheduleEntity entity = new ScheduleEntity();
		entity.setScheduleNm(dto.getReqScheduleNm());
		entity.setScheduleGroupId(dto.getReqScheduleGroupId());
		entity.setScheduleDtm(dto.getReqScheduleDtm());
		entity.setScheduleMemo(dto.getReqScheduleMemo());
		entity.setScheduleType(dto.getReqScheduleType());
		entity.setScheduleCrtnId(dto.getUserId());
		entity.setScheduleCrtnDtm(toDate);
		entity.setSchedulePlace(dto.getReqSchedulePlace());
		entity.setScheduleType(dto.getReqScheduleType());

		scheduleRepository.save(entity);

		return true;
	}

	@Transactional
	public boolean scheduleModify(ReqScheduleDto dto) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String toDate = now.format(formatter);

		Optional<ScheduleEntity> scheduleOpt = scheduleRepository.findByScheduleId(dto.getReqScheduleId());

		if(scheduleOpt.isPresent()) {
			ScheduleEntity scheduleEntity = scheduleOpt.get();
			scheduleEntity.setScheduleNm(dto.getReqScheduleNm());
			scheduleEntity.setScheduleGroupId(dto.getReqScheduleGroupId());
			scheduleEntity.setScheduleDtm(dto.getReqScheduleDtm());
			scheduleEntity.setScheduleMemo(dto.getReqScheduleMemo());
			scheduleEntity.setScheduleDtm(dto.getReqScheduleDtm());
			scheduleEntity.setScheduleChngId(dto.getUserId());
			scheduleEntity.setScheduleChngDtm(toDate);
			scheduleEntity.setSchedulePlace(dto.getReqSchedulePlace());
			scheduleEntity.setScheduleType(dto.getReqScheduleType());
		}

		return true;
	}

	public ScheduleDto ScheduleView(ReqScheduleDto dto) {
		ScheduleEntity scheduleEntity = scheduleRepository.findScheduleView(dto.getReqScheduleId());

		ScheduleDto scheduleDto = new ScheduleDto();
		scheduleDto.setScheduleId(scheduleEntity.getScheduleId());
		scheduleDto.setScheduleNm(scheduleEntity.getScheduleNm());
		scheduleDto.setScheduleMemo(scheduleEntity.getScheduleMemo());
		scheduleDto.setScheduleDtm(scheduleEntity.getScheduleDtm());
		scheduleDto.setScheduleGroupId(scheduleEntity.getScheduleGroupId());
		scheduleDto.setSchedulePlace(scheduleEntity.getSchedulePlace());
		scheduleDto.setScheduleType(scheduleEntity.getScheduleType());

		return scheduleDto;
	}

}
