import {useEffect, useState} from 'react';

import styles from '../../css/Schedule.module.css';
import {useNavigate} from "react-router-dom";
import axios from '../../api/axiosInstance';
import {useAuthStore} from "../../store/useAuthStore.ts";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface scheduleMonthDto {
	scheduleId: number,
	scheduleDtm: String,
	scheduleNm: String,
	scheduleColor: String,
}

const ScheduleMain = () => {
	const user = useAuthStore((state) => state.user);

	const navigate = useNavigate();

	const [scheduleMonthList, setScheduleMonthList] = useState<scheduleMonthDto[]>([]);

	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<number | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth()+1;

	const lastDate = new Date(year, month, 0).getDate();
	const firstDay = new Date(year, month-1, 1).getDay();

	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

	useEffect(() => {
		const fetchScheduleList = async() => {
			try {
				let schMonth;
				if(month < 10) {
					schMonth = year+'0'+month;
				} else {
					schMonth = year+''+month;
				}

				const postData = {
					userId: user?.userId,
					schScheduleDate: schMonth,
				}

				const res = await axios.post(`${SERVER_BASE_URL}/api/schedule/list`, postData);

				res.data.forEach((item: scheduleMonthDto) => {
					console.log(item.scheduleDtm, item.scheduleNm);
				});

				setScheduleMonthList(res.data);

			} catch (error) {
				console.error("게시글 로딩 실패:", error);
			}
		}

		fetchScheduleList();

	}, [year, month]);

	const handleMonthMove = (moveYear: number, moveMonth: number, moveDate: number) => {
		setCurrentDate(new Date(moveYear, moveMonth, moveDate));

	}

	const handleDateClick = (day: number) => {
		setSelectedDate(day);
		setSelectedSchedule(null);
		setIsPopupOpen(true);
	};

	return (
		<div className={styles.calendarContainer}>
			<div className={styles.header}>
				<button onClick={() => handleMonthMove(year, month-2, 1)}
						className={styles.navButton}>&lt;
				</button>
				<h2 className={styles.monthTitle}>{year}년 {month}월</h2>
				<button onClick={() => handleMonthMove(year, month, 1)}
						className={styles.navButton}>&gt;
				</button>
			</div>

			<div className={styles.calendarGrid}>
				<div className={styles.dayOfWeekContainer}>
					{daysOfWeek.map((day, index) => (
						<div key={day}
						     className={`${styles.dayOfWeek} ${index === 0 ? styles.sunday : index === 6 ? styles.saturday : ''}`}>
							{day}
						</div>
					))}
				</div>

				<div className={styles.daysGrid}>
					{Array.from({ length: firstDay }).map((_, i) => (
						<div key={`empty-${i}`} className={styles.cellWrapper}></div>
					))}

					{Array.from({ length: lastDate }).map((_, i) => {
						const day = i + 1;
						const daySchedules = scheduleMonthList.filter(s => s.scheduleDtm.slice(-2) == day);
						const visibleSchedules = daySchedules.slice(0, 2);
						const hiddenCount = daySchedules.length - visibleSchedules.length;
						return (
							<div key={day}
							     className={styles.cellWrapper}
							     onClick={() => handleDateClick(day)}
							     style={{ cursor: 'pointer' }}>
								<div className={`${styles.dayCell} ${((firstDay + i) % 7) === 0 ? styles.sunday : ((firstDay + i) % 7) === 6 ? styles.saturday : ''}`}>
									{day}
								</div>
								{visibleSchedules.map(s => (
									<div key={s.scheduleId}
									     className={styles.scheduleItem}>
										{s.scheduleNm}
									</div>
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
							{scheduleMonthList.filter(s => s.scheduleDtm == selectedDate).map(s => (
								<div key={s.scheduleId} className={styles.scheduleCard} onClick={() => setSelectedSchedule(s)}>
									{s.scheduleNm}
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