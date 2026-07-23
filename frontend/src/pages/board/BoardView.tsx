import {useNavigate, useSearchParams} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {useAuthStore} from "../../store/useAuthStore.ts";

import styles from "../../css/Board.module.css";
import {useEffect, useState} from "react";
import axios from "../../api/axiosInstance.ts";
import {formatDateTime} from "../../util/commonUtil.ts";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

interface boardDto {
	boardId: number;
	boardNm: string;
	boardCntn: string;
	boardWriteId: string;
	boardWriteNm: string;
	boardCrtnDtm: string;
	groupId: number;
}

const BoardView = () => {
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const boardId = searchParams.get("boardId") ?? 0;

	const [boardForm, setBoardForm] = useState<boardDto>({
		boardId: 0,
		boardNm: '',
		boardCntn: '',
		boardWriteId: '',
		boardWriteNm: '',
		boardCrtnDtm: '',
		groupId: 0,
	});

	useEffect(() => {
		const boardView = async () => {
			const postData = {
				reqBoardId: boardId,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/board/view`, postData);

			setBoardForm(res.data);

		}

		boardView();
	}, []);

	const handleModify = async () => {

	}

	const handleDelete = async () => {
		if(window.confirm('게시글을 삭제하시겠습니까?')) {
			const postData = {
				reqBoardId: boardId,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/board/delete`, postData);
			navigate(-1);

		}

	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.titleWrapper}>
					<button className={styles.iconBtn} onClick={() => navigate(-1)}>
						<ArrowLeft size={22} />
					</button>
					<div className={styles.categoryBadge}>건의 게시판</div>
				</div>
				{user?.userId === boardForm.boardWriteId &&
					<div className={styles.actionGroup}>
						<button className={styles.textBtn}
						        onClick={handleModify}>수정</button>
						<button className={styles.textBtnDanger}
						        onClick={handleDelete}>삭제</button>
					</div>
				}
			</div>

			<div className={styles.boardCard}>
				<div className={styles.viewHeader}>
					<h2 className={styles.viewTitle}>{boardForm.boardNm}</h2>
					<div className={styles.viewMeta}>
						<div className={styles.authorInfo}>
							<span className={styles.authorName}>{boardForm.boardWriteNm}</span>
						</div>
						<span className={styles.metaDot}>·</span>
						<span className={styles.dateText}>{formatDateTime(boardForm.boardCrtnDtm)}</span>
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.viewBody}>{boardForm.boardCntn}</div>
			</div>
		</div>
	);
};

export default BoardView;