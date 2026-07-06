import {useEffect, useState} from 'react';
import { Search, Plus, Users, Lock, Unlock, X } from 'lucide-react';
import * as React from "react";
import axios from "../../api/axiosInstance";

import styles from '../../css/Group.module.css'
import {useAuthStore} from "../../store/useAuthStore.ts";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface groupDto {
	groupId: number;
	groupNm: string;
	groupMemo: string;
}

const GroupMain = () => {
	const user = useAuthStore((state) => state.user);

	const [activeTab, setActiveTab] = useState<'searchGroup' | 'myGroup'>('searchGroup');
	const [groupPopup, setGroupPopup] = useState<'insert' | 'join' | ''>('');
	const [reqGroupNm, setReqGroupNm] = useState("");
	const [groupList, setGroupList] = useState<groupDto[]>([]);

	const handleTabChange = (tab) => {
		setActiveTab(tab);

		if(tab === 'searchGroup') {
			setGroupList([]);
		} else {
			handleSearchGroup(tab);
		}
	}

	const handleInsert = () => {
		setGroupPopup('insert');
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReqGroupNm(e.target.value);
	}

	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchGroup('searchGroup');
		}
	};

	const handleSearchGroup = async (tab) => {
		try {
			const postData = {
				userId: user?.userId,
				reqGroupNm: reqGroupNm,
				reqActiveTab: tab,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/group/search`, postData);
			setGroupList(res.data);

		} catch (error) {
			console.error('그룹 찾기 검색 실패:', error);
		}

	}

	const handleJoinDis = () => {
		if(activeTab === 'searchGroup') {
			setGroupPopup('join');
		}
	}

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div>
					<h1 className={styles.title}></h1>
					<div className={styles.tabs}>
						<button
							onClick={() => handleTabChange('searchGroup')}
							className={`${styles.tabBtn} ${activeTab === 'searchGroup' ? styles.activeTab : ''}`}
						>
							그룹 찾기
						</button>
						<button
							onClick={() => handleTabChange('myGroup')}
							className={`${styles.tabBtn} ${activeTab === 'myGroup' ? styles.activeTab : ''}`}
						>
							내 그룹
						</button>
					</div>
				</div>

				<button className={styles.createBtn}
				        onClick={handleInsert}>
					<Plus size={20}/>
					그룹 만들기
				</button>
			</div>

			{activeTab === 'searchGroup' && (
				<div className={styles.searchWrapper}>
					<Search className={styles.searchIcon} size={20}
					        onClick={() => handleSearchGroup('searchGroup')}/>
					<input type="text"
					       className={styles.searchInput}
					       placeholder="관심있는 그룹 이름이나 태그를 검색해보세요."
					       onChange={handleChange}
					       onKeyDown={handleSearchKeyDown}
					/>
				</div>
			)}

			<div className={styles.grid}>
				{groupList.map((g) => (
					<div className={styles.card}
					     key={g.groupId}>
						<div className={styles.cardHeader}>
							<h3 className={styles.cardTitle}>{g.groupNm}</h3>
						</div>

						<p className={styles.cardDesc}>
							{g.groupMemo}
						</p>

						<div className={styles.cardFooter}>
							<div className={styles.members}>
								<Users size={16}/>
								<span>3명</span>
							</div>
							<button className={styles.joinBtn}
									onClick={handleJoinDis}>
								{activeTab === 'searchGroup' ? '가입하기' : '탈퇴하기'}
							</button>
						</div>
					</div>
				))}
			</div>

			{groupPopup === 'insert' ? (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h2>새 그룹 만들기</h2>
							<button className={styles.closeBtn}
							        onClick={() => setGroupPopup('')}>
								<X size={24}/>
							</button>
						</div>

						<div className={styles.modalBody}>
							<div className={styles.formGroup}>
								<label>그룹 이름</label>
								<input type="text" placeholder="그룹 이름을 입력하세요"/>
							</div>

							<div className={styles.formGroup}>
								<label>그룹 설명</label>
								<textarea placeholder="어떤 그룹인지 설명해주세요" rows={4}/>
							</div>
						</div>

						<div className={styles.modalFooter}>
							<button className={styles.cancelBtn} onClick={() => setGroupPopup('')}>취소</button>
							<button className={styles.submitBtn}>생성하기</button>
						</div>
					</div>
				</div>

			) : groupPopup === 'join' ? (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h2>그룹 정보</h2>
							<button className={styles.closeBtn} onClick={() => setGroupPopup('')}>
								<X size={24}/>
							</button>
						</div>

						<div className={styles.modalBody}>
							<div className={styles.infoGroup}>
								<span className={styles.infoLabel}>그룹 이름</span>
								<div className={styles.infoValue}>테스트</div>
							</div>

							<div className={styles.infoGroup}>
								<span className={styles.infoLabel}>그룹원 수</span>
								<div className={styles.infoValue}>
									<Users size={18}/>3명
								</div>
							</div>

							<div className={styles.infoGroup}>
								<span className={styles.infoLabel}>그룹 메모</span>
								<div className={styles.infoBox}>내용적어주세요</div>
							</div>
						</div>

						<div className={styles.modalFooter}>
							<button className={styles.cancelBtn} onClick={() => setGroupPopup('')}>닫기</button>
							<button className={styles.submitBtn}>가입하기</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default GroupMain;