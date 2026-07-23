import {useNavigate, useSearchParams} from "react-router-dom";
import {ArrowLeft, Check, ChevronDown} from "lucide-react";
import {useEffect, useState} from "react";
import {useAuthStore} from "../../store/useAuthStore.ts";

import styles from "../../css/Board.module.css";
import axios from "../../api/axiosInstance.ts";
import * as React from "react";

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

interface boardDto {
	boardId: number;
	boardNm: string;
	boardCntn: string;
	boardWriteId: string;
	groupId: number;
}

const BoardForm = () => {
	const user = useAuthStore((state) => state.user);
	const [groupList, setGroupList] = useState<groupDto[]>([])
	const [boardForm, setBoardForm] = useState<boardDto>({
		boardId: 0,
		boardNm: '',
		boardCntn: '',
		boardWriteId: '',
		groupId: 0,
	})

	const [searchParam] = useSearchParams();
	const type = searchParam.get("type") ?? "free";
	const cmd = searchParam.get("cmd") ?? "write";
	const navigate = useNavigate();
	const [groupId, setGroupId] = useState<number>();

	useEffect(() => {
		if(type === 'group') {
			handleSearchGroup();
		}
	}, []);

	const handleSearchGroup = async () => {
		try {
			const postData = {
				userId: user?.userId,
			}
			const res = await axios.post(`${SERVER_BASE_URL}/api/group/myGroupSearch`, postData);
			setGroupList(res.data);
			if(res.data.length > 0) {
				setGroupId(res.data[0].groupId);
			}

		} catch (error) {
			console.error(error);
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setBoardForm({
			...boardForm,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async () => {
		const postData = {
			reqUserId: user?.userId,
			reqBoardNm: boardForm?.boardNm,
			reqBoardCntn: boardForm?.boardCntn,
			reqBoardType: type,
			reqCmd: cmd,
			reqGroupId: groupId === undefined ? 0 : groupId,
		}

		await axios.post(`${SERVER_BASE_URL}/api/board/save`, postData);

		navigate(-1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.titleWrapper}>
					<button className={styles.iconBtn} onClick={() => navigate(-1)}>
						<ArrowLeft size={22} />
					</button>
					<h1 className={styles.title}>새 글 쓰기</h1>
				</div>
				<button className={styles.primaryBtn} onClick={handleSubmit}>
					<Check size={16} />
					등록
				</button>
			</div>

			<div className={styles.boardCard}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.selectRow}>
						{type === "group" && (
							<div className={styles.selectWrapper}>
								<select
									className={styles.selectBox}
									value={groupId}
									onChange={(e) => setGroupId(Number(e.target.value))}
								>
									{groupList.map((group) => (
										<option key={group.groupId} value={group.groupId}>
											{group.groupNm}
										</option>
									))}
								</select>
								<ChevronDown size={14} className={styles.selectIcon} />
							</div>
						)}
					</div>

					<input
						type="text"
						name="boardNm"
						className={styles.inputTitle}
						placeholder="제목을 입력해주세요."
						onChange={handleChange}
						autoFocus
					/>
					<div className={styles.divider}></div>
					<textarea
						name="boardCntn"
						className={styles.inputContent}
						placeholder="내용을 입력해주세요."
						onChange={handleChange}
					></textarea>
				</form>
			</div>
		</div>
	);
};

export default BoardForm;