import {useState} from 'react';

import styles from '../../css/Schedule.module.css';
import {useNavigate} from "react-router-dom";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ScheduleMain = () => {
	const navigate = useNavigate();
	const [schduleData, setSchduleData] = useState({
		scheduleId: '',
		scheduleNm: '',
		scheduleGroupId: '',
		scheduleColor: '',
		scheduleDtm: '',

	});

	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<number | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayOfMonth = new Date(year, month, 1).getDay();

	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

	const schedules = [
		{ id: 1, day: 23, title: '북한이탈주민의날', detail: '상세 정보 1번' },
		{ id: 2, day: 23, title: '테스트 일정', detail: '상세 정보 2번' },
		{ id: 3, day: 23, title: '테스트 일정', detail: '상세 정보 2번' },
		{ id: 4, day: 23, title: '테스트 일정', detail: '상세 정보 2번' },
		{ id: 5, day: 23, title: '테스트 일정', detail: '상세 정보 2번' },
		{ id: 6, day: 23, title: '테스트 일정', detail: '상세 정보 2번' },
		{ id: 7, day: 23, title: '테스트 일정', detail: '상세 정보 2번' },
		{ id: 8, day: 23, title: '테스트 일정', detail: '상세 정보 2번' },
	];

	const handleDateClick = (day: number) => {
		setSelectedDate(day);
		setSelectedSchedule(null);
		setIsPopupOpen(true);
	};

	return (
		<div className={styles.calendarContainer}>
			<div className={styles.header}>
				<button
					onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
					className={styles.navButton}>&lt;
				</button>
				<h2 className={styles.monthTitle}>{month + 1}월</h2>
				<button
					onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
					className={styles.navButton}>&gt;
				</button>
			</div>

			<div className={styles.calendarGrid}>
				<div className={styles.dayOfWeekContainer}>
					{daysOfWeek.map((day, index) => (
						<div key={day} className={`${styles.dayOfWeek} ${index === 0 ? styles.sunday : index === 6 ? styles.saturday : ''}`}>
							{day}
						</div>
					))}
				</div>

				<div className={styles.daysGrid}>
					{Array.from({ length: firstDayOfMonth }).map((_, i) => (
						<div key={`empty-${i}`} className={styles.cellWrapper}></div>
					))}

					{Array.from({ length: daysInMonth }).map((_, i) => {
						const day = i + 1;
						const daySchedules = schedules.filter(s => s.day === day);
						const visibleSchedules = daySchedules.slice(0, 2);
						const hiddenCount = daySchedules.length - visibleSchedules.length;
						return (
							<div key={day} className={styles.cellWrapper} onClick={() => handleDateClick(day)} style={{ cursor: 'pointer' }}>
								<div className={`${styles.dayCell} ${((firstDayOfMonth + i) % 7) === 0 ? styles.sunday : ((firstDayOfMonth + i) % 7) === 6 ? styles.saturday : ''}`}>{day}</div>
								{visibleSchedules.map(s => (
									<div key={s.id} className={styles.scheduleItem}>{s.title}</div>
								))}
								{hiddenCount > 0 && (
									<div className={styles.moreIndicator}>...</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{isPopupOpen && (
				<div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}>
					<div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
						<div className={styles.leftPanel}>
							<h3>{month + 1}월 {selectedDate}일</h3>
							{schedules.filter(s => s.day === selectedDate).map(s => (
								<div key={s.id} className={styles.scheduleCard} onClick={() => setSelectedSchedule(s)}>
									{s.title}
								</div>
							))}
							<div className={styles.addBtn}>{month + 1}월 {selectedDate}일에 추가 +</div>
						</div>
						<div className={styles.rightPanel}>
							{selectedSchedule ? (
								<div>
									<h2>{selectedSchedule.title}</h2>
									<p>{selectedSchedule.detail}</p>
								</div>
							) : (
								<p>일정을 선택해 주세요</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ScheduleMain;