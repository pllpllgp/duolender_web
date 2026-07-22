import {useSearchParams, useNavigate} from "react-router-dom";
import {PenLine, ChevronDown, LayoutList} from "lucide-react";
import {useEffect, useState} from "react";
import {useAuthStore} from "../../store/useAuthStore.ts";

import styles from "../../css/Board.module.css";
import axios from "../../api/axiosInstance.ts";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const boardType = [
	{key: "group", label: "모임 게시판"},
	{key: "free", label: "자유 게시판"},
	{key: "suggest", label: "건의 게시판"},
];

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
	boardNum: number;
	boardId: number;
	boardNm: string;
	boardWriteNm: string;
	boardCrtnDtm: string;
	groupId: number;
}

const BoardList = () => {
	const user = useAuthStore((state) => state.user);

	const [groupList, setGroupList] = useState<groupDto[]>([]);
	const [boardList, setBoardList] = useState<boardDto[]>([]);
	const [selectGroupId, setSelectGroupId] = useState<number>();

	const [searchParams] = useSearchParams();
	const type = searchParams.get("type") ?? "free";
	const current = boardType.find((b) => b.key === type) ?? boardType[1];
	const navigate = useNavigate();

	useEffect(() => {
		handleSearchGroup();
	}, [type]);

	const handleSearchGroup = async () => {
		try {
			const postData = {
				userId: user?.userId,
			}
			const res = await axios.post(`${SERVER_BASE_URL}/api/group/myGroupSearch`, postData);
			setGroupList(res.data);

			if (res.data.length > 0) {
				const groupId = res.data[0].groupId;
				setSelectGroupId(groupId);
				handleBoardList(groupId);
			}

		} catch (error) {
			console.error(error);

		}
	}

	const handleBoardList = async (groupId: number) => {
		try {
			let reqGroupId = 0;
			if(type === 'group') {
				reqGroupId = groupId;
			}

			const postData = {
				reqBoardType: type,
				reqGroupId: reqGroupId,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/board/boardList`, postData);
			setBoardList(res.data);

		} catch (error) {

		}
	}

	const handleWrite = () => {
		navigate('/boardForm');
	}

	const handleView = () => {
		navigate('/boardView');
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleBadge}></div>
					<h1 className={styles.title}>{current.label}</h1>

					{current.key === "group" && (
						<div className={styles.listFilterWrapper}>
							<select
								className={styles.filterSelect}
								value={selectGroupId}
								onChange={(e) => setSelectGroupId(Number(e.target.value))}
							>
								{groupList.length > 0 ? groupList.map((list) => (
									<option key={list.groupId} value={list.groupId}>
										{list.groupNm}
									</option>
								)) : (
									<option>참여 중인 모임이 없습니다.</option>
								)}
							</select>
							<ChevronDown size={14} className={styles.filterIcon} />
						</div>
					)}
				</div>
				<button className={styles.primaryBtn} onClick={handleWrite}>
					<PenLine size={16} />
					글쓰기
				</button>
			</div>

			<div className={styles.boardCard}>
				{boardList.length > 0 ? (
					<ul className={styles.postList}>
						{boardList.map((board) => (
							<li key={board.boardId}
							    className={styles.postItem}
							    onClick={handleView}>
								<div className={styles.postInfo}>
									<span className={styles.postCategory}>{board.boardNum}</span>
									<h3 className={styles.postTitle}>{board.boardNm}</h3>
								</div>
								<div className={styles.postMeta}>
									<span className={styles.postAuthor}>{board.boardWriteNm}</span>
									<span className={styles.metaDot}>·</span>
									<span className={styles.postDate}>{board.boardCrtnDtm}</span>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div className={styles.emptyState}>
						<h3 className={styles.emptyTitle}>등록된 게시글이 없습니다</h3>
						<button className={styles.outlineBtn} onClick={handleWrite}>
							게시글 작성하기
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default BoardList;