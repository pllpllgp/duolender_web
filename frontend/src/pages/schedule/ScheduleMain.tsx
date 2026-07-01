import {useState} from 'react';

import styles from '../../css/Schedule.module.css';

const ScheduleMain = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayOfMonth = new Date(year, month, 1).getDay();

	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

	// 예시 데이터: { day: 23, title: 'test' }
	const schedules = [
		{ day: 23, title: 'test' }
	];

	const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
	const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

	return (
		<div className={styles.calendarContainer}>
			<div className={styles.header}>
				<button onClick={handlePrevMonth} className={styles.navButton}>&lt;</button>
				<h2 className={styles.monthTitle}>{month + 1}월</h2>
				<button onClick={handleNextMonth} className={styles.navButton}>&gt;</button>
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
						const dayOfWeek = (firstDayOfMonth + i) % 7;
						const schedule = schedules.find(s => s.day === day);

						return (
							<div key={day} className={styles.cellWrapper}>
								<div className={`${styles.dayCell} ${dayOfWeek === 0 ? styles.sunday : dayOfWeek === 6 ? styles.saturday : ''}`}>
									{day}
								</div>
								{schedule && (
									<div className={styles.scheduleItem}>{schedule.title}</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default ScheduleMain;