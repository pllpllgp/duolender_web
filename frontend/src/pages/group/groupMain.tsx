import {useEffect, useState} from 'react';
import { Search, Plus, Users, Lock, Unlock, X } from 'lucide-react';
import styles from '../../css/Group.module.css'
import * as React from "react";

const GroupMain = () => {
	const [activeTab, setActiveTab] = useState<'discover' | 'myGroups'>('discover');
	const [groupPopup, setGroupPopup] = useState<'insert' | 'join' | ''>('');
	const [reqGroupNm, setReqGroupNm] = useState("");

	const dummyGroups = [
		{ id: 1, name: '프론트엔드 스터디', desc: '리액트와 테일윈드를 마스터합시다.', members: 12, isPrivate: false },
		{ id: 2, name: '가족 일정 공유', desc: '우리 가족 행사 및 여행 일정', members: 4, isPrivate: true },
		{ id: 3, name: '주말 런닝 클럽', desc: '매주 토요일 아침 한강 러닝', members: 25, isPrivate: false },
	];

	const handleInsert = () => {
		setGroupPopup('insert');
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReqGroupNm(e.target.value);
	}

	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchGroup();
		}
	};

	const handleSearchGroup = () => {
		setGroupPopup('join');
	}

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div>
					<h1 className={styles.title}></h1>
					<div className={styles.tabs}>
						<button
							onClick={() => setActiveTab('discover')}
							className={`${styles.tabBtn} ${activeTab === 'discover' ? styles.activeTab : ''}`}
						>
							그룹 찾기
						</button>
						<button
							onClick={() => setActiveTab('myGroups')}
							className={`${styles.tabBtn} ${activeTab === 'myGroups' ? styles.activeTab : ''}`}
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

			{activeTab === 'discover' ? (
				<div className={styles.searchWrapper}>
					<Search className={styles.searchIcon} size={20}
							onClick={handleSearchGroup}/>
					<input type="text"
					       className={styles.searchInput}
					       placeholder="관심있는 그룹 이름이나 태그를 검색해보세요."
					       onChange={handleChange}
					       onKeyDown={handleSearchKeyDown}
					/>
				</div>
			) : activeTab === 'myGroups' ? (
				<div className={styles.grid}>
					{dummyGroups.map((group) => (
						<div key={group.id} className={styles.card}>
							<div className={styles.cardHeader}>
								<h3 className={styles.cardTitle}>{group.name}</h3>
								{group.isPrivate ? (
									<Lock size={18} className={styles.iconLocked}/>
								) : (
									<Unlock size={18} className={styles.iconUnlocked}/>
								)}
							</div>

							<p className={styles.cardDesc}>
								{group.desc}
							</p>

							<div className={styles.cardFooter}>
								<div className={styles.members}>
									<Users size={16}/>
									<span>{group.members}명</span>
								</div>
								<button className={styles.joinBtn}>
									탈퇴하기
								</button>
							</div>
						</div>
					))}
				</div>
			) : null}

			{groupPopup === 'insert' ? (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h2>새 그룹 만들기</h2>
							<button className={styles.closeBtn}
							        onClick={() => setGroupPopup('')}>
								<X size={24} />
							</button>
						</div>

						<div className={styles.modalBody}>
							<div className={styles.formGroup}>
								<label>그룹 이름</label>
								<input type="text" placeholder="그룹 이름을 입력하세요" />
							</div>

							<div className={styles.formGroup}>
								<label>그룹 설명</label>
								<textarea placeholder="어떤 그룹인지 설명해주세요" rows={4} />
							</div>

							<div className={styles.formGroup}>
								<label>공개 여부</label>
								<div className={styles.radioGroup}>
									<label className={styles.radioLabel}>
										<input type="radio" name="privacy" defaultChecked />
										<span>공개 그룹</span>
									</label>
									<label className={styles.radioLabel}>
										<input type="radio" name="privacy" />
										<span>비공개 그룹</span>
									</label>
								</div>
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