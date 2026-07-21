import {useNavigate} from "react-router-dom";
import {ArrowLeft, Check, ChevronDown} from "lucide-react";
import {useState} from "react";

import styles from "../../css/Board.module.css";

const boardOptions = [
	{value: "group", label: "모임 게시판"},
	{value: "free", label: "자유 게시판"},
	{value: "suggest", label: "건의 게시판"},
];

const groupOptions = [
	{value: "1", label: "주말 등산 모임"},
	{value: "2", label: "리액트 스터디"},
	{value: "3", label: "직장인 배드민턴"},
];

const BoardForm = () => {
	const navigate = useNavigate();
	const [boardType, setBoardType] = useState("free");
	const [groupId, setGroupId] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
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
						<div className={styles.selectWrapper}>
							<select
								className={styles.selectBox}
								value={boardType}
								onChange={(e) => setBoardType(e.target.value)}
							>
								{boardOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
							<ChevronDown size={14} className={styles.selectIcon} />
						</div>

						{boardType === "group" && (
							<div className={styles.selectWrapper}>
								<select
									className={styles.selectBox}
									value={groupId}
									onChange={(e) => setGroupId(e.target.value)}
								>
									<option value="" disabled>모임을 선택해주세요</option>
									{groupOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
								<ChevronDown size={14} className={styles.selectIcon} />
							</div>
						)}
					</div>

					<input
						type="text"
						className={styles.inputTitle}
						placeholder="제목을 입력하세요"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						autoFocus
					/>
					<div className={styles.divider}></div>
					<textarea
						className={styles.inputContent}
						placeholder="이곳에 내용을 작성해주세요..."
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
				</form>
			</div>
		</div>
	);
};

export default BoardForm;