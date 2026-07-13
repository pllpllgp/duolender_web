import {useEffect, useState, useRef} from 'react';
import {Camera, UserCircle, Plus, Minus, Users, ChevronDown} from 'lucide-react';
import {useAuthStore} from "../../store/useAuthStore.ts";
import * as React from "react";
import axios from "../../api/axiosInstance.ts";
import styles from '../../css/My.module.css';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface groupDto {
	groupId: number;
	groupNm: string;
	groupMemo: string;
	groupMemCnt: number;
	groupJoinState: string;
	groupAdminGrade: string;
	scheduleColor: string;
}

const colorList = [
	'#ef4444',
	'#f97316',
	'#eab308',
	'#22c55e',
	'#3b82f6',
	'#6366f1',
	'#a855f7',
	'#6b7280'
];

const MyMain = () => {
	const user = useAuthStore((state) => state.user);
	const [profileSection, setProfileSection] = useState<boolean>(false);
	const [groupSection, setGroupSection] = useState<boolean>(false);

	const [managedGroupSection, setManagedGroupSection] = useState<boolean>(false);
	const [joinedGroupSection, setJoinedGroupSection] = useState<boolean>(false);

	const [groupList, setGroupList] = useState<groupDto[]>([]);

	const [nickEditing, setNickEditing] = useState(false);
	const [nickDupleCheck, setNickDupleCheck] = useState(false);
	const [msg, setMsg] = useState("");

	const [modifyForm, setModifyForm] = useState({
		userNick: user?.userNick,
	});

	const [selectColorGroupId, setSelectColorGroupId] = useState<number | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const toggleSection = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
		setter((prev) => !prev);
	};

	const handleSearchGroup = async () => {
		try {
			const postData = { userId: user?.userId }
			const res = await axios.post(`${SERVER_BASE_URL}/api/group/myGroupSearch`, postData);
			setGroupList(res.data);
		} catch (error) {
			console.error('그룹 찾기 검색 실패:', error);
		}
	};

	const handleNickCancle = () => {
		setNickEditing(false);
		setMsg('');
		setNickDupleCheck(false);

		setModifyForm({
			...modifyForm,
			userNick: user?.userNick
		})

	}

	const handleNickDupleCheck = async () => {
		try {
			const postData = {
				userNick: modifyForm.userNick,
			}
			const res = await axios.post(`${SERVER_BASE_URL}/api/auth/nickDupleCheck`, postData);

			if (res.data.result) {
				setNickDupleCheck(true);
				setMsg("사용 가능한 닉네임입니다.");
			} else {
				setNickDupleCheck(false);
				setMsg("이미 사용 중인 닉네임입니다.");
			}
		} catch (error) {
			setMsg("닉네임 중복 확인에 실패했습니다.");
		}
	};

	const handleNickUpdate = async () => {
		try {
			const postData = {
				userId: user?.userId,
				userNick:modifyForm.userNick,
			}

			await axios.post(`${SERVER_BASE_URL}/api/auth/update`, postData);
			setNickEditing(false);
			setMsg("");
		} catch (error) {
			setMsg("수정에 실패했습니다.");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setModifyForm({
			...modifyForm,
			[e.target.name]: e.target.value,
		})

		if (e.target.name === 'userNick') {
			setNickDupleCheck(false);
			setMsg('');
		}
	}

	const handleColorChange = async (groupId: number, color: string) => {
		try {
			const postData = {
				userId: user?.userId,
				groupId: groupId,
				reqScheduleColor: color
			};

			await axios.post(`${SERVER_BASE_URL}/api/group/updateColor`, postData);

			setGroupList(prevList =>
				prevList.map(g => g.groupId === groupId ? { ...g, scheduleColor: color } : g)
			);

			setSelectColorGroupId(null);

		} catch (error) {
			console.error('그룹 색상 변경 실패:', error);
		}
	};

	useEffect(() => {
		handleSearchGroup();
	}, []);

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setSelectColorGroupId(null);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, []);

	const managerGroups = groupList.filter(g => g.groupAdminGrade === 'A');
	const joinedGroups = groupList.filter(g => g.groupJoinState === 'M');

	return (
		<div className={styles.container}>
			<h1 className={styles.pageTitle}>마이페이지</h1>
			<div className={styles.divider} />

			<div className={styles.contentWrapper}>
				<div className={styles.section}>
					<div className={styles.sectionHeader}
					     onClick={() => toggleSection(setProfileSection)}>
						<h2>개인 정보</h2>
						{profileSection ? <Minus size={20} /> : <Plus size={20} />}
					</div>
					{profileSection && (
						<div className={styles.infoList}>
							<div className={styles.infoRow}>
								<div className={styles.iconBox}><Camera size={20} /></div>
								<div className={styles.infoLabel}>프로필 사진</div>
								<div className={styles.avatar}>용근</div>
							</div>
							<div className={styles.infoRow}>
								<div className={styles.iconBox}><UserCircle size={20} /></div>
								<div className={styles.infoLabel}>닉네임</div>
								{nickEditing ? (
									<div className={styles.editWrapper}>
										<div className={styles.editArea}>
											<input className={styles.input}
											       name="userNick"
											       value={modifyForm.userNick}
											       onChange={handleChange} />
											{nickDupleCheck ? (
												<button className={`${styles.btn} ${styles.btnPrimary}`}
												        onClick={handleNickUpdate}>수정</button>
											) : (
												<button className={styles.btn}
												        onClick={handleNickDupleCheck}>중복확인</button>
											)}
											<button className={`${styles.btn} ${styles.btnDanger}`}
											        onClick={handleNickCancle}>취소</button>
										</div>
										{msg && <p className={`${styles.msg} ${nickDupleCheck ? styles.success : styles.error}`}>{msg}</p>}
									</div>
								) : (
									<>
										<div className={styles.infoValue}>{user?.userNick}</div>
										<button className={styles.btn} onClick={() => setNickEditing(true)}>변경</button>
									</>
								)}
							</div>
						</div>
					)}
				</div>

				<div className={styles.section}>
					<div className={styles.sectionHeader} onClick={() => toggleSection(setGroupSection)}>
						<h2>그룹 관리</h2>
						{groupSection ? <Minus size={20} /> : <Plus size={20} />}
					</div>
					{groupSection && (
						<div className={styles.subSectionWrapper}>
							<div className={styles.subSection}>
								<div className={styles.subSectionHeader} onClick={() => toggleSection(setManagedGroupSection)}>
									<h3>관리 그룹</h3>
									{managedGroupSection ? <Minus size={18} /> : <Plus size={18} />}
								</div>
								{managedGroupSection && (
									<div className={styles.infoList}>
										{managerGroups.length > 0 ? managerGroups.map((list) => (
											<div className={styles.infoRow} key={list.groupId}>
												<div className={styles.iconBox} style={{color: list.scheduleColor || '#6b7280'}}><Users size={20}/></div>
												<div className={styles.infoLabel}>{list.groupNm}</div>
												<div className={styles.infoValue}>관리자</div>
												<div className={styles.colorContainer}
												     ref={selectColorGroupId === list.groupId ? dropdownRef : null}>
													<button className={styles.colorDropdownBtn}
													        onClick={() => setSelectColorGroupId(selectColorGroupId === list.groupId ? null : list.groupId)}>
                                           <span className={styles.selectedColorCircle}
                                                 style={{backgroundColor: list.scheduleColor || '#6b7280'}} />
														<ChevronDown size={14} />
													</button>
													{selectColorGroupId === list.groupId && (
														<div className={styles.colorPalette}>
															{colorList.map(color => (
																<button key={color}
																        className={`${styles.colorCircleBtn} ${list.scheduleColor === color ? styles.activeColor : ''}`}
																        style={{ backgroundColor: color }}
																        onClick={() => handleColorChange(list.groupId, color)} />
															))}
														</div>
													)}
												</div>
											</div>
										)) : (
											<div className={styles.infoRow}><div>관리 중인 그룹이 없습니다.</div></div>
										)}
									</div>
								)}
							</div>

							<div className={styles.subSection}>
								<div className={styles.subSectionHeader} onClick={() => toggleSection(setJoinedGroupSection)}>
									<h3>참여 그룹</h3>
									{joinedGroupSection ? <Minus size={18} /> : <Plus size={18} />}
								</div>
								{joinedGroupSection && (
									<div className={styles.infoList}>
										{joinedGroups.length > 0 ? joinedGroups.map((list) => (
											<div className={styles.infoRow} key={list.groupId}>
												<div className={styles.iconBox} style={{ color: list.scheduleColor || '#6b7280' }}><Users size={20}/></div>
												<div className={styles.infoLabel}>{list.groupNm}</div>
												<div className={styles.infoValue}>참여중</div>
												<div className={styles.colorContainer}
												     ref={selectColorGroupId === list.groupId ? dropdownRef : null}>
													<button className={styles.colorDropdownBtn}
													        onClick={() => setSelectColorGroupId(selectColorGroupId === list.groupId ? null : list.groupId)}>
														<span className={styles.selectedColorCircle} style={{ backgroundColor: list.scheduleColor || '#6b7280' }} />
														<ChevronDown size={14} />
													</button>
													{selectColorGroupId === list.groupId && (
														<div className={styles.colorPalette}>
															{colorList.map(color => (
																<button key={color}
																        className={`${styles.colorCircleBtn} ${list.scheduleColor === color ? styles.activeColor : ''}`}
																        style={{ backgroundColor: color }}
																        onClick={() => handleColorChange(list.groupId, color)} />
															))}
														</div>
													)}
												</div>
											</div>
										)) : (
											<div className={styles.infoRow}><div>참여 중인 그룹이 없습니다.</div></div>
										)}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MyMain;