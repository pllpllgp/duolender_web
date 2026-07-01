import {useState} from 'react';

import styles from '../../css/Schedule.module.css';

const ScheduleMain = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayOfMonth = new Date(year, month, 1).getDay();

	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

	const prefixDays = Array.from({ length: firstDayOfMonth }, () => null);
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	const handlePrevMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};

	return (
		<div className={styles.calendarContainer}>
			<div className={styles.header}>
				<button onClick={handlePrevMonth} className={styles.navButton}>
					&lt;
				</button>
				<h2 className={styles.monthTitle}>{month + 1}월</h2>
				<button onClick={handleNextMonth} className={styles.navButton}>
					&gt;
				</button>
			</div>

			<div className={styles.calendarGrid}>
				<div className={styles.dayOfWeekContainer}>
					{daysOfWeek.map((day, index) => (
						<div
							key={day}
							className={`${styles.dayOfWeek} ${
								index === 0 ? styles.sunday : index === 6 ? styles.saturday : ''
							}`}
						>
							{day}
						</div>
					))}
				</div>

				<div className={styles.daysGrid}>
					{prefixDays.map((_, index) => (
						<div key={`empty-${index}`} className={styles.cellWrapper}></div>
					))}

					{days.map((day, index) => {
						const dayOfWeek = (firstDayOfMonth + index) % 7;
						return (
							<div key={day} className={styles.cellWrapper}>
								<div
									className={`${styles.dayCell} ${
										dayOfWeek === 0 ? styles.sunday : dayOfWeek === 6 ? styles.saturday : ''
									}`}
								>
									{day}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default ScheduleMain;