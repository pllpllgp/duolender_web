import {useEffect, useState} from 'react';

import styles from '../../css/Schedule.module.css';
import {useNavigate} from "react-router-dom";
import axios from '../../api/axiosInstance';
import {useAuthStore} from "../../store/useAuthStore.ts";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface scheduleMonthDto {
	scheduleDtm: String,
	scheduleNm: String,
	scheduleColor: String,
}

interface scheduleDateDto {
	scheduleId: number,
	scheduleDtm: String,
	scheduleNm: String,
	scheduleColor: String,
}

const ScheduleMain = () => {
	const user = useAuthStore((state) => state.user);

	const navigate = useNavigate();

	//선택한 일자 세팅
	const [selectedDate, setSelectedDate] = useState<number | null>(null);

	//팝업 오픈
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	//팝업창 특정 스케쥴 세팅
	const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);


	const [isAdding, setIsAdding] = useState(false);
	const [formData, setFormData] = useState({ title: '', date: '', location: '', memo: '' });

	//년월일 세팅
	const [currentDate, setCurrentDate] = useState(new Date());
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth()+1;

	const lastDate = new Date(year, month, 0).getDate();
	const firstDay = new Date(year, month-1, 1).getDay();

	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

	//월별 스케쥴
	const [scheduleMonthList, setScheduleMonthList] = useState<scheduleMonthDto[]>([]);
	useEffect(() => {
		const fetchScheduleMonthList = async () => {
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
				setScheduleMonthList(res.data);

			} catch (error) {
				console.error("월별 스케쥴 로딩 실패:", error);
			}
		}

		fetchScheduleMonthList();

	}, [year, month]);


	//일별 스케쥴
	const [scheduleDateList, setScheduleDateList] = useState<scheduleDateDto[]>([]);

	const fetchScheduleDateList = async (day: number) => {
		try {
			let schDay;
			if(month < 10) {
				schDay = year+'0'+month;
			} else {
				schDay = year+''+month;
			}

			if(day < 10) {
				schDay = schDay+'0'+day;
			} else {
				schDay = schDay+''+day;
			}

			const postData = {
				userId: user?.userId,
				schScheduleDate: schDay,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/schedule/list`, postData)
			setScheduleDateList(res.data);

			res.data.forEach((item: scheduleDateDto) => {
				console.log(item.scheduleDtm, item.scheduleNm);
			});

		} catch (error) {
			console.error("일별 스케쥴 로딩 실패:", error);
		}
	}


	//특정 날짜 클릭 이벤트
	const handleDateClick = (day: number) => {
		setIsAdding(false);
		setSelectedDate(day);
		setSelectedSchedule(null);
		setIsPopupOpen(true);
		fetchScheduleDateList(day);
	};



	return (
		<div className={styles.calendarContainer}>
			<div className={styles.header}>
				<button onClick={() => setCurrentDate(new Date(year, month-2, 1))}
						className={styles.navButton}>&lt;
				</button>
				<h2 className={styles.monthTitle}>{year}년 {month}월</h2>
				<button onClick={() => setCurrentDate(new Date(year, month, 1))}
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
									<div className={styles.scheduleItem}>
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
				<div className={styles.popupOverlay}
				     onClick={() => setIsPopupOpen(false)}>
					<div className={styles.popupContent}
					     onClick={(e) => e.stopPropagation()}>
						<div className={styles.leftPanel}>
							<h3>{month}월 {selectedDate}일</h3>
							{scheduleDateList.filter(s => s.scheduleDtm.slice(-2) == selectedDate).map(s => (
								<div key={s.scheduleId}
								     className={styles.scheduleCard}
								     onClick={() => setSelectedSchedule(s)}>
									{s.scheduleNm}
								</div>
							))}
							<div className={styles.addBtn}
							     onClick={() => setIsAdding(true)}>
								일정 추가 +
							</div>
						</div>
						<div className={styles.rightPanel}>
							{isAdding ? (
								<div className={styles.inputForm} style={{ height: '100%' }}>
									{/* 상단 입력 필드들 */}
									<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
										<input className={styles.inputField} placeholder="제목" />
										<input className={styles.inputField} type="date" />
										<input className={styles.inputField} placeholder="장소" />
										<textarea className={`${styles.inputField} ${styles.textArea}`} placeholder="메모" />
									</div>

									{/* 좌측 버튼과 동일한 스타일의 저장 버튼 */}
									<button className={styles.saveButton}>저장</button>
								</div>
							) : (
								<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
									<p>일정을 선택해 주세요</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ScheduleMain;