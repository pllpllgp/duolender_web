import {useSearchParams, useNavigate} from "react-router-dom";
import {PenLine, ChevronDown, LayoutList, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
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
	const [totalPage, setTotalPage] = useState(0);

	const [searchParams, setSearchParams] = useSearchParams();
	const type = searchParams.get("type") ?? "free";
	const currentPage = Number(searchParams.get("page") ?? 1);
	const current = boardType.find((b) => b.key === type) ?? boardType[1];
	const navigate = useNavigate();

	const pageGroupSize = 5;
	let startPage = Math.max(1, currentPage - Math.floor(pageGroupSize / 2));
	let endPage = startPage + pageGroupSize - 1;

	if (endPage > totalPage) {
		endPage = totalPage;
		startPage = Math.max(1, endPage - pageGroupSize + 1);
	}

	const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

	useEffect(() => {
		handleSearchGroup();
	}, [type, currentPage]);

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
				reqPage: currentPage,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/board/boardList`, postData);
			setBoardList(res.data.list);
			setTotalPage(res.data.totalPage)

		} catch (error) {

		}
	}

	const handleWrite = () => {
		navigate(`/boardForm?type=${type}`);
	}

	const handleView = () => {
		navigate('/boardView');
	}

	const goPage = (page: number) => {
		setSearchParams(prev => {
			const next = new URLSearchParams(prev);
			next.set("page", String(page));
			return next;
		})
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
							<ChevronDown size={14} className={styles.filterIcon}/>
						</div>
					)}
				</div>
				<button className={styles.primaryBtn} onClick={handleWrite}>
					<PenLine size={16}/>
					글쓰기
				</button>
			</div>

			<div className={styles.boardCard}>
				{boardList.length > 0 ? (
					<>
						<ul className={styles.postList}>
							{boardList.map((board, index) => (
								<li key={board.boardId}
								    className={styles.postItem}
								    onClick={handleView}>
									<div className={styles.postInfo}>
										<span className={styles.postCategory}>{totalPage - (currentPage - 1) * 10 - index}</span>
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
					</>
				) : (
					<div className={styles.emptyState}>
						<h3 className={styles.emptyTitle}>등록된 게시글이 없습니다</h3>
						<button className={styles.outlineBtn} onClick={handleWrite}>
							게시글 작성하기
						</button>
					</div>
				)}
			</div>

			{totalPage > 0 && (
				<div className={styles.pagination}>
					<button
						className={styles.pageIconBtn}
						onClick={() => goPage(1)}
						disabled={currentPage === 1}
					>
						<ChevronsLeft size={16}/>
					</button>
					<button
						className={styles.pageIconBtn}
						onClick={() => goPage(currentPage-1)}
						disabled={currentPage === 1}
					>
						<ChevronLeft size={16}/>
					</button>

					<div className={styles.pageNumbers}>
						{pages.map(page => (
							<button key={page}
							        className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
							        onClick={() => goPage(page)}
							>
								{page}
							</button>
						))}
					</div>

					<button
						className={styles.pageIconBtn}
						onClick={() => goPage(currentPage+1)}
						disabled={currentPage === totalPage}
					>
						<ChevronRight size={16}/>
					</button>
					<button
						className={styles.pageIconBtn}
						onClick={() => goPage(totalPage)}
						disabled={currentPage === totalPage}
					>
						<ChevronsRight size={16}/>
					</button>
				</div>
			)}
		</div>
	);
};

export default BoardList;