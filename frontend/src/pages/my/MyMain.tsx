import {useEffect, useState, useRef} from 'react';
import {UserCircle, Plus, Minus, Users, ChevronDown} from 'lucide-react';
import {useAuthStore} from "../../store/useAuthStore.ts";
import * as React from "react";
import axios from "../../api/axiosInstance.ts";
import styles from '../../css/My.module.css';
import MemberManageModal from './MemberManageModal';
import GroupEditModal from './GroupEditModal';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface groupDto {
	groupId: number;
	groupNm: string;
	groupMemo: string;
	groupMemCnt: number;
	groupJoinState: string;
	groupAdminGrade: string;
	scheduleColor: string;
	groupSecretYn?: string;
}

interface groupMemberDto {
	userId: string;
	userNick: string;
	groupId: number,
	groupAdminGrade: string;
	groupJoinState: string;
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
	const updateUser = useAuthStore((state) => state.updateUser);
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

	const [priColor, setPriColor] = useState("");
	const dropdownPriRef = useRef<HTMLDivElement | null>(null);

	const [selectColorGroupId, setSelectColorGroupId] = useState<number | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const [popupOpen, setPopupOpen] = useState<boolean>(false);
	const [modalGroupNm, setModalGroupNm] = useState<string>("");
	const [joinMembers, setJoinMembers] = useState<groupMemberDto[]>([]);
	const [reqMembers, setReqMembers] = useState<groupMemberDto[]>([]);

	const [editPopupOpen, setEditPopupOpen] = useState<boolean>(false);
	const [editGroupForm, setEditGroupForm] = useState({
		groupId: 0,
		groupNm: '',
		groupMemo: '',
		groupSecretYn: 'N'
	});

	const toggleSection = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
		setter((prev) => !prev);
	};

	const handleSearchGroup = async () => {
		try {
			const postData = { userId: user?.userId }
			const res = await axios.post(`${SERVER_BASE_URL}/api/group/myGroupSearch`, postData);
			setGroupList(res.data);
		} catch (error) {
			console.error(error);
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
				reqUpdate: 'NICK',
			}

			await axios.post(`${SERVER_BASE_URL}/api/auth/update`, postData);
			updateUser({userNick: modifyForm.userNick});
			setNickEditing(false);
			setMsg("");
		} catch (error) {
			setMsg("수정에 실패했습니다.");
		}
	};

	const handlePriColorChange = async (color: string) => {
		try {
			const postData = {
				userId: user?.userId,
				scheduleColor: color,
				reqUpdate: 'COLOR',
			};

			await axios.post(`${SERVER_BASE_URL}/api/auth/update`, postData);

			updateUser({scheduleColor: color});
			setPriColor("");

		} catch (error) {
			console.error(error);
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
			console.error(error);
		}
	};

	const handleFetchMemberList = async (groupId: number) => {
		try {
			const postData = {
				groupId: groupId,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/group/memberList`, postData);

			const members: groupMemberDto[] = res.data;
			setJoinMembers(members.filter(m => m.groupJoinState === 'Y'));
			setReqMembers(members.filter(m => m.groupJoinState === 'W'));

		} catch (error) {
			console.error(error);
		}
	};

	const handleManageMembers = (groupId: number, groupNm: string) => {
		setModalGroupNm(groupNm);
		handleFetchMemberList(groupId);
		setPopupOpen(true);
	};

	const handleAcceptMember = async (groupId: number, userId: string, reqYn: string) => {
		try {
			const postData = {
				groupId: groupId,
				userId: userId,
				reqYn: reqYn,
			}

			await axios.post(`${SERVER_BASE_URL}/api/group/approveMember`, postData);

			handleFetchMemberList(groupId);
			handleSearchGroup();

		} catch (error) {
			console.error(error);
		}
	};

	const handleLeaveGroup = async (groupId: number) => {
		if (window.confirm('그룹을 나가시겠습니까?')) {
			try {
				const postData = {
					userId: user?.userId,
					groupId: groupId,
				};

				await axios.post(`${SERVER_BASE_URL}/api/group/leaveReq`, postData);

				handleSearchGroup();

			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleEditGroupOpen = async (groupId: number) => {
		try {
			const postData = {
				userId: user?.userId,
				groupId: groupId,
			}
			const res = await axios.post(`${SERVER_BASE_URL}/api/group/detail`, postData);
			setEditGroupForm({
				groupId: res.data.groupId,
				groupNm: res.data.groupNm,
				groupMemo: res.data.groupMemo,
				groupSecretYn: res.data.groupSecretYn || 'N'
			});
			setEditPopupOpen(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditGroupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setEditGroupForm({
			...editGroupForm,
			[e.target.name]: e.target.value
		});
	};

	const handleEditGroupSave = async () => {
		try {
			const postData = {
				userId: user?.userId,
				groupId: editGroupForm.groupId,
				reqGroupNm: editGroupForm.groupNm,
				reqGroupMemo: editGroupForm.groupMemo,
				reqGroupSecretYn: editGroupForm.groupSecretYn,
			}
			await axios.post(`${SERVER_BASE_URL}/api/group/update`, postData);
			setEditPopupOpen(false);
			handleSearchGroup();
		} catch (error) {
			console.error(error);
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

			if (dropdownPriRef.current && !dropdownPriRef.current.contains(e.target as Node)) {
				setPriColor("");
			}

		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, []);

	const managerGroups = groupList.filter(g => g.groupAdminGrade === 'A');
	const joinGroups = groupList.filter(g => g.groupAdminGrade === 'M');

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
								<div className={styles.iconBox}><UserCircle size={20}/></div>
								<div className={styles.infoLabel}>닉네임</div>
								{nickEditing ? (
									<div className={styles.editWrapper}>
										<div className={styles.editArea}>
											<input className={styles.input}
											       name="userNick"
											       value={modifyForm.userNick}
											       onChange={handleChange}/>
											{nickDupleCheck ? (
												<button className={`${styles.btn} ${styles.btnPrimary}`}
												        onClick={handleNickUpdate}>수정</button>
											) : (
												<button className={styles.btn}
												        onClick={handleNickDupleCheck}>중복확인</button>
											)}
											<button className={`${styles.btn} ${styles.btnDanger}`}
											        onClick={handleNickCancle}>취소
											</button>
										</div>
										{msg &&
											<p className={`${styles.msg} ${nickDupleCheck ? styles.success : styles.error}`}>{msg}</p>}
									</div>
								) : (
									<>
										<div className={styles.infoValue}>{user?.userNick}</div>
										<button className={styles.btn} onClick={() => setNickEditing(true)}>변경</button>
									</>
								)}
							</div>
							<div className={styles.infoRow}>
								<div className={styles.iconBox}
								     style={{color: user?.scheduleColor || '#6b7280'}}><Users size={20}/></div>
								<div className={styles.infoLabel}>스케쥴 색상</div>
								<div className={styles.colorContainer}
								     ref={priColor === "SHOW" ? dropdownPriRef : null}>
									<button className={styles.colorDropdownBtn}
									        onClick={() => setPriColor(priColor === "SHOW" ? "" : "SHOW")}>
                               <span className={styles.selectedColorCircle}
                                     style={{backgroundColor: user?.scheduleColor}}/>
										<ChevronDown size={14}/>
									</button>
									{priColor === "SHOW" && (
										<div className={styles.colorPalette}>
											{colorList.map(color => (
												<button key={color}
												        className={`${styles.colorCircleBtn} ${user?.scheduleColor === color ? styles.activeColor : ''}`}
												        style={{backgroundColor: color}}
												        onClick={() => handlePriColorChange(color)}/>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className={styles.section}>
					<div className={styles.sectionHeader} onClick={() => toggleSection(setGroupSection)}>
						<h2>그룹 관리</h2>
						{groupSection ? <Minus size={20}/> : <Plus size={20}/>}
					</div>
					{groupSection && (
						<div className={styles.subSectionWrapper}>
							<div className={styles.subSection}>
								<div className={styles.subSectionHeader}
								     onClick={() => toggleSection(setManagedGroupSection)}>
									<h3>관리 그룹</h3>
									{managedGroupSection ? <Minus size={18}/> : <Plus size={18}/>}
								</div>
								{managedGroupSection && (
									<div className={styles.infoList}>
										{managerGroups.length > 0 ? managerGroups.map((list) => (
											<div className={styles.infoRow} key={list.groupId}>
												<div className={styles.iconBox}
												     style={{color: list.scheduleColor}}><Users size={20}/>
												</div>
												<div className={styles.infoLabel}>{list.groupNm}</div>
												<div className={styles.infoValue}>관리자</div>
												<div className={styles.actionWrapper}>
													<button className={`${styles.btn} ${styles.btnManage}`}
													        onClick={() => handleManageMembers(list.groupId, list.groupNm)}>그룹원 관리</button>
													<button className={`${styles.btn} ${styles.btnManage}`}
													        onClick={() => handleEditGroupOpen(list.groupId)}>그룹 수정</button>
													<div className={styles.colorContainer}
													     ref={selectColorGroupId === list.groupId ? dropdownRef : null}>
														<button className={styles.colorDropdownBtn}
														        onClick={() => setSelectColorGroupId(selectColorGroupId === list.groupId ? null : list.groupId)}>
                                              <span className={styles.selectedColorCircle}
                                                    style={{backgroundColor: list.scheduleColor}} />
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
											</div>
										)) : (
											<div className={styles.infoRow}><div>관리 중인 그룹이 없습니다.</div></div>
										)}
									</div>
								)}
							</div>

							<div className={styles.subSection}>
								<div className={styles.subSectionHeader}
								     onClick={() => toggleSection(setJoinedGroupSection)}>
									<h3>참여 그룹</h3>
									{joinedGroupSection ? <Minus size={18} /> : <Plus size={18} />}
								</div>
								{joinedGroupSection && (
									<div className={styles.infoList}>
										{joinGroups.length > 0 ? joinGroups.map((list) => (
											<div className={styles.infoRow} key={list.groupId}>
												<div className={styles.iconBox} style={{color: list.scheduleColor}}><Users size={20}/></div>
												<div className={styles.infoLabel}>{list.groupNm}</div>
												<div className={styles.infoValue}>참여중</div>
												<div className={styles.actionWrapper}>
													<button className={`${styles.btn} ${styles.btnLeave}`}
													        onClick={() => handleLeaveGroup(list.groupId)}>그룹 나가기</button>
													<div className={styles.colorContainer}
													     ref={selectColorGroupId === list.groupId ? dropdownRef : null}>
														<button className={styles.colorDropdownBtn}
														        onClick={() => setSelectColorGroupId(selectColorGroupId === list.groupId ? null : list.groupId)}>
                                              <span className={styles.selectedColorCircle}
                                                    style={{backgroundColor: list.scheduleColor}} />
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

			<MemberManageModal
				open={popupOpen}
				groupNm={modalGroupNm}
				joinMembers={joinMembers}
				reqMembers={reqMembers}
				onClose={() => setPopupOpen(false)}
				onAcceptMember={handleAcceptMember}
			/>

			<GroupEditModal
				open={editPopupOpen}
				form={editGroupForm}
				onChange={handleEditGroupChange}
				onClose={() => setEditPopupOpen(false)}
				onSave={handleEditGroupSave}
			/>
		</div>
	);
};

export default MyMain;