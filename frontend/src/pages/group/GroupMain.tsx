import {useEffect, useState} from 'react';
import { Search, Plus, Users, X } from 'lucide-react';
import * as React from "react";
import axios from "../../api/axiosInstance";

import styles from '../../css/Group.module.css'
import {useAuthStore} from "../../store/useAuthStore.ts";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface groupDto {
	groupId: number;
	groupNm: string;
	groupMemo: string;
	userNick: string;
	groupMemCnt: number;
	groupJoinState: string;
	groupSecretYn: string;
}

const GroupMain = () => {
	const user = useAuthStore((state) => state.user);

	const [groupPopup, setGroupPopup] = useState<'insert' | 'view' | ''>('');
	const [reqGroupNm, setReqGroupNm] = useState("");
	const [groupList, setGroupList] = useState<groupDto[]>([]);
	const [groupForm, setGroupForm] = useState<groupDto>({
		groupId: 0,
		groupNm: '',
		groupMemo: '',
		userNick: '',
		groupMemCnt: 0,
		groupJoinState: '',
		groupSecretYn: 'N',
	});

	const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setGroupForm( {
			...groupForm,
			[e.target.name]: e.target.value
		});
	};

	const handleGroupRegister = async () => {
		try {
			const postData = {
				userId: user?.userId,
				reqGroupNm: groupForm.groupNm,
				reqGroupMemo: groupForm.groupMemo,
				reqGroupSecretYn: groupForm.groupSecretYn,
			}

			await axios.post(`${SERVER_BASE_URL}/api/group/register`, postData);
			setGroupPopup('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReqGroupNm(e.target.value);
	}

	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchGroup('N');
		}
	};

	const handleSearchGroup = async (secretYn: string) => {
		try {
			let searchGroupNm;

			if(secretYn === 'N') {
				searchGroupNm = reqGroupNm;
			} else {
				searchGroupNm= '';
			}

			const postData = {
				userId: user?.userId,
				reqGroupNm: searchGroupNm,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/group/search`, postData);
			setGroupList(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		handleSearchGroup('Y');
	}, []);

	const handleGroupDetail = async (groupId: number) => {
		try {
			setGroupPopup('view');
			const postData = {
				userId: user?.userId,
				groupId: groupId,
			}
			const res = await axios.post(`${SERVER_BASE_URL}/api/group/detail`, postData);
			setGroupForm(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleGroupReq = async () => {
		try {
			const postData = {
				userId: user?.userId,
				groupId: groupForm.groupId,
				reqGroupJoinState: groupForm?.groupJoinState,
			}
			await axios.post(`${SERVER_BASE_URL}/api/group/joinReq`, postData);
			setGroupPopup('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<h1 className={styles.title}>그룹 찾기</h1>
					<p className={styles.subtitle}>새로운 사람들과 함께 일정을 공유하고 목표를 달성해보세요.</p>
				</div>

				<button className={styles.createBtn} onClick={() => setGroupPopup('insert')}>
					<Plus size={20}/> 그룹 만들기
				</button>
			</div>

			<div className={styles.searchWrapper}>
				<Search className={styles.searchIcon} size={20}
				        onClick={() => handleSearchGroup('N')}/>
				<input type="text"
				       className={styles.searchInput}
				       placeholder="관심있는 그룹을 검색해보세요."
				       onChange={handleSearchChange}
				       onKeyDown={handleSearchKeyDown}
				/>
			</div>

			<div className={styles.grid}>
				{groupList.map((list) => (
					<div className={styles.card} key={list.groupId}>
						<div className={styles.cardHeader}>
							<h3 className={styles.cardTitle}>{list.groupNm}</h3>
						</div>
						<p className={styles.cardDesc}>{list.groupMemo}</p>
						<div className={styles.cardFooter}>
							<div className={styles.members}>
								<Users size={16}/>
								<span>{list.groupMemCnt}</span>
							</div>
							<button className={styles.joinBtn}
							        onClick={() => handleGroupDetail(list.groupId)}>
								상세보기
							</button>
						</div>
					</div>
				))}
			</div>

			{groupPopup === 'insert' ? (
				<div className={styles.modalOverlay} onClick={() => setGroupPopup('')}>
					<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
						<div className={styles.modalHeader}>
							<h2>새 그룹 만들기</h2>
							<button className={styles.closeBtn} onClick={() => setGroupPopup('')}>
								<X size={24}/>
							</button>
						</div>
						<div className={styles.modalBody}>
							<div className={styles.formGroup}>
								<label>그룹 이름</label>
								<input type="text" name="groupNm" placeholder="그룹 이름을 입력하세요"
								       onChange={handleRegisterChange}/>
							</div>
							<div className={styles.formGroup}>
								<label>그룹 설명</label>
								<textarea name="groupMemo" placeholder="어떤 그룹인지 설명해주세요" rows={4}
								          onChange={handleRegisterChange}/>
							</div>
							<div className={styles.formGroup}>
								<label>공개 설정</label>
								<div className={styles.radioGroup}>
									<label className={styles.radioLabel}>
										<input type="radio" name="groupSecretYn" value="N"
										       checked={groupForm.groupSecretYn === 'N'}
										       onChange={handleRegisterChange}/>
										공개
									</label>
									<label className={styles.radioLabel}>
										<input type="radio" name="groupSecretYn" value="Y"
										       checked={groupForm.groupSecretYn === 'Y'}
										       onChange={handleRegisterChange}/>
										비공개
									</label>
								</div>
							</div>
						</div>
						<div className={styles.modalFooter}>
							<button className={styles.cancelBtn} onClick={() => setGroupPopup('')}>취소</button>
							<button className={styles.submitBtn} onClick={handleGroupRegister}>생성하기</button>
						</div>
					</div>
				</div>
			) : groupPopup === 'view' ? (
				<div className={styles.modalOverlay} onClick={() => setGroupPopup('')}>
					<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
						<div className={styles.modalHeader}>
							<h2>그룹 정보</h2>
							<button className={styles.closeBtn} onClick={() => setGroupPopup('')}>
								<X size={24}/>
							</button>
						</div>
						<div className={styles.modalBody}>
							<div className={styles.infoGroup}>
								<span className={styles.infoLabel}>그룹 이름</span>
								<div className={styles.infoValue}>{groupForm?.groupNm}</div>
							</div>
							<div className={styles.infoGroup}>
								<span className={styles.infoLabel}>그룹 장</span>
								<div className={styles.infoValue}>{groupForm?.userNick}</div>
							</div>
							<div className={styles.infoGroup}>
								<span className={styles.infoLabel}>그룹 메모</span>
								<div className={styles.infoBox}>{groupForm?.groupMemo}</div>
							</div>
						</div>
						<div className={styles.modalFooter}>
							<button className={styles.cancelBtn} onClick={() => setGroupPopup('')}>닫기</button>
							<button className={styles.submitBtn} onClick={handleGroupReq}>
								{groupForm?.groupJoinState === 'W' ? '가입신청취소' : '가입신청'}
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default GroupMain;