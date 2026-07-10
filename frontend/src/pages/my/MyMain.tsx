import {useEffect, useState} from 'react';
import {Camera, UserCircle, Plus, Minus, Users} from 'lucide-react';
import {useAuthStore} from "../../store/useAuthStore.ts";
import * as React from "react";
import axios from "../../api/axiosInstance.ts";

import styles from '../../css/My.module.css';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface groupDto {
	groupId: number;
	groupNm: string;
	groupMemo: string;
	userNick: string;
	groupMemCnt: number;
	groupJoinState: string;
}

const MyMain = () => {
	const user = useAuthStore((state) => state.user);
	const [profileSection, setProfileSection] = useState<boolean>(false);
	const [groupSection, setGroupSection] = useState<boolean>(false);
	const [groupList, setGroupList] = useState<groupDto[]>([]);

	const toggleSection = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
		setter((prev) => !prev);
	};

	const handleSearchGroup = async () => {
		try {
			const postData = {
				userId: user?.userId,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/group/myGroupSearch`, postData);
			setGroupList(res.data);

		} catch (error) {
			console.error('그룹 찾기 검색 실패:', error);
		}
	};

	useEffect(() => {
		handleSearchGroup();
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.pageTitle}>마이페이지</h1>
			<div className={styles.divider} />

			<div className={styles.contentWrapper}>
				<div className={styles.section}>
					<div className={styles.sectionHeader}
					     onClick={() => toggleSection(setProfileSection)}>
						<h2>개인 정보</h2>
						{profileSection === true ? <Minus size={20} /> : <Plus size={20} />}
					</div>
					{profileSection === true && (
						<div className={styles.infoList}>
							<div className={styles.infoRow}>
								<div className={styles.iconBox}><Camera size={20} /></div>
								<div className={styles.infoLabel}>프로필 사진</div>
								<div className={styles.avatar}>용근</div>
							</div>
							<div className={styles.infoRow}>
								<div className={styles.iconBox}><UserCircle size={20} /></div>
								<div className={styles.infoLabel}>닉네임</div>
								<div className={styles.infoValue}>조용근</div>
							</div>
						</div>
					)}
				</div>

				<div className={styles.section}>
					<div className={styles.sectionHeader}
					     onClick={() => toggleSection(setGroupSection)}>
						<h2>그룹 관리</h2>
						{groupSection === true ? <Minus size={20} /> : <Plus size={20} />}
					</div>

					{groupSection === true && (
						<div className={styles.infoList}>
							{groupList.length > 0 ? (
								groupList.map((list) => (
									<div className={styles.infoRow} key={list.groupId}>
										<div className={styles.iconBox}><Users size={20}/></div>
										<div className={styles.infoLabel}>{list.groupNm}</div>
										<div className={styles.infoValue}>참여중</div>
									</div>
								))
							) : (
								<div className={styles.infoRow}>
									<div className={styles.infoValue}>참여 중인 그룹이 없습니다.</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MyMain;