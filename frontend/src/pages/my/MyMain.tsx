import {useEffect, useState} from 'react';
import { User, Mail, Phone, Calendar, MapPin, Briefcase, Camera, Languages, UserCircle } from 'lucide-react';

import styles from '../../css/My.module.css';
import {useAuthStore} from "../../store/useAuthStore.ts";

const MyMain =() => {
	const user = useAuthStore((state) => state.user);

	const [activeTab, setActiveTab] = useState('profile');

	return (
		<div className={styles.container}>
			<h1 className={styles.pageTitle}>마이페이지</h1>

			<div className={styles.tabs}>
				<button
					onClick={() => setActiveTab('profile')}
					className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.activeTab : ''}`}
				>
					내 정보 관리
				</button>
				<button
					onClick={() => setActiveTab('group')}
					className={`${styles.tabBtn} ${activeTab === 'group' ? styles.activeTab : ''}`}
				>
					내 그룹 관리
				</button>
			</div>

			{activeTab === 'profile' ? (
				<div className={styles.contentWrapper}>
					<h2 className={styles.sectionTitle}>개인 정보</h2>
					<div className={styles.infoList}>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><Camera size={20} /></div>
							<div className={styles.infoLabel}>프로필 사진</div>
							<div className={styles.avatar}>용근</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><UserCircle size={20} /></div>
							<div className={styles.infoLabel}>이름</div>
							<div className={styles.infoValue}>조용근</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><User size={20} /></div>
							<div className={styles.infoLabel}>성별</div>
							<div className={styles.infoValue}>남성</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><Mail size={20} /></div>
							<div className={styles.infoLabel}>이메일</div>
							<div className={styles.infoValue}>pllpllgp@gmail.com</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><Phone size={20} /></div>
							<div className={styles.infoLabel}>휴대전화</div>
							<div className={styles.infoValue}>010-6543-3918</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><Calendar size={20} /></div>
							<div className={styles.infoLabel}>생년월일</div>
							<div className={styles.infoValue}>1991년 1월 19일</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><Languages size={20} /></div>
							<div className={styles.infoLabel}>언어</div>
							<div className={styles.infoValue}>한국어(대한민국)</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><MapPin size={20} /></div>
							<div className={styles.infoLabel}>집 주소</div>
							<div className={styles.infoValueEmpty}>설정되지 않음</div>
						</div>
						<div className={styles.infoRow}>
							<div className={styles.iconBox}><Briefcase size={20} /></div>
							<div className={styles.infoLabel}>직장 주소</div>
							<div className={styles.infoValueEmpty}>설정되지 않음</div>
						</div>
					</div>
				</div>
			) : (
				<div className={styles.contentWrapper}>
					<h2 className={styles.sectionTitle}>참여 중인 그룹</h2>
					<div className={styles.card}>
						<h3>Duolender 개발팀</h3>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyMain;