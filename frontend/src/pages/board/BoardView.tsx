import {useNavigate, useSearchParams} from "react-router-dom";
import {ArrowLeft, Send, MessageCircle} from "lucide-react";
import {useAuthStore} from "../../store/useAuthStore.ts";

import styles from "../../css/Board.module.css";
import {useEffect, useState} from "react";
import axios from "../../api/axiosInstance.ts";
import {formatDateTime} from "../../util/commonUtil.ts";
import * as React from "react";

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

interface commentDto {
	commentId: number;
	boardId: number;
	commentCntn: string;
	commentWriteId: string;
	commentWriteNm: string;
	commentCrtnDtm: string;
}

const BoardView = () => {
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const type = searchParams.get("type") ?? "free";
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

	const [commentList, setCommentList] = useState<commentDto[]>([])

	const [commentForm, setCommentForm] = useState<commentDto>({
		commentId: 0,
		boardId: 0,
		commentCntn: '',
		commentWriteId: '',
		commentWriteNm: '',
		commentCrtnDtm: '',
	});

	useEffect(() => {
		const fetchBoardData = async () => {
			try {
				const postData = { reqBoardId: boardId };
				const res = await axios.post(`${SERVER_BASE_URL}/api/board/view`, postData);

				setBoardForm(res.data);
				handleCommentList();

			} catch (error) {
				console.error(error);
			}
		}
		fetchBoardData();
	}, [boardId]);

	const handleCommentList = async () => {
		try {
			const postData = { reqBoardId: boardId };
			const res = await axios.post(`${SERVER_BASE_URL}/api/board/commentList`, postData);

			setCommentList(res.data);

		} catch (error) {
			console.error(error);
		}
	}

	const handleDelete = async () => {
		if(window.confirm('게시글을 삭제하시겠습니까?')) {
			try {
				const postData = { reqBoardId: boardId };
				await axios.post(`${SERVER_BASE_URL}/api/board/delete`, postData);
				navigate(-1);
			} catch (error) {
				console.error(error);
			}
		}
	}

	const handleCommentSubmit = async () => {
		try {
			const postData = {
				reqBoardId: boardId,
				reqUserId: user?.userId,
				reqCommentCntn: commentForm?.commentCntn,
				reqCmd: 'write',
			};

			await axios.post(`${SERVER_BASE_URL}/api/board/commentSave`, postData);

			setCommentForm({
				...commentForm,
				commentCntn: ''
			});

			handleCommentList();

		} catch (error) {
			console.error(error);
		}
	}

	const handleCommentDelete = async (commentId: number) => {
		if(window.confirm('댓글을 삭제하시겠습니까?')) {
			try {
				const postData = {
					reqCommentId: commentId
				};

				await axios.post(`${SERVER_BASE_URL}/api/board/commentDelete`, postData);

				handleCommentList();

			} catch (error) {
				console.error(error);
			}
		}
	}

	const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCommentForm({
			...commentForm,
			[e.target.name] : e.target.value,
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.titleWrapper}>
					<button className={styles.iconBtn} onClick={() => navigate(-1)}>
						<ArrowLeft size={22} />
					</button>
					<div className={styles.categoryBadge}>
						{type === 'group' ? '모임 게시판' : type === 'suggest' ? '건의 게시판' : '자유 게시판'}
					</div>
				</div>
				{user?.userId === boardForm.boardWriteId &&
					<div className={styles.actionGroup}>
						<button className={styles.textBtn}
								onClick={() => navigate(`/boardForm?cmd=modify&type=${type}&groupId=${boardForm.groupId}&&boardId=${boardId}`)}>수정</button>
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
						<span className={styles.dateText}>
                      {boardForm.boardCrtnDtm ? formatDateTime(boardForm.boardCrtnDtm) : ''}
                   </span>
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.viewBody}>{boardForm.boardCntn}</div>

				<div className={styles.commentSection}>
					<div className={styles.commentHeader}>
						<MessageCircle size={18} className={styles.commentIcon} />
						<span>댓글 {commentList.length}</span>
					</div>

					<div className={styles.commentInputWrapper}>
						<textarea className={styles.commentInput}
						          name='commentCntn'
						          value={commentForm?.commentCntn}
								  placeholder="댓글을 남겨보세요."
								  onChange={handleChange}/>
						<div className={styles.commentInputBottom}>
							<button className={styles.commentSubmitBtn}
									onClick={handleCommentSubmit}
									disabled={!commentForm?.commentCntn.trim()}>
								<Send size={14} />
								등록
							</button>
						</div>
					</div>

					<div className={styles.commentList}>
						{commentList?.map((comment) => (
							<div key={comment.commentId} className={styles.commentItem}>
								<div className={styles.commentItemHeader}>
									<div className={styles.commentAuthorInfo}>
										<div className={styles.commentAvatar}>
											{comment.commentWriteNm.charAt(0)}
										</div>
										<span className={styles.commentAuthorName}>
											{comment.commentWriteNm}
										</span>
										<span className={styles.commentDate}>
											{formatDateTime(comment.commentCrtnDtm)}
										</span>
									</div>
									{user?.userId === comment.commentWriteId && (
										<button className={styles.commentDeleteBtn}
												onClick={() => handleCommentDelete(comment.commentId)}>
											삭제
										</button>
									)}
								</div>
								<div className={styles.commentContent}>
									{comment.commentCntn}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoardView;