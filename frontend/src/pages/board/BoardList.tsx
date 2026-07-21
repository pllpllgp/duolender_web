import {useSearchParams, useNavigate} from "react-router-dom";
import {PenLine, ChevronDown, LayoutList} from "lucide-react";
import {useState} from "react";

import styles from "../../css/Board.module.css";

const boardType = [
	{key: "group", label: "모임 게시판"},
	{key: "free", label: "자유 게시판"},
	{key: "suggest", label: "건의 게시판"},
];

const joinedGroups = [
	{value: "all", label: "가입한 모임 전체"},
	{value: "1", label: "주말 등산 모임"},
	{value: "2", label: "리액트 스터디"},
	{value: "3", label: "직장인 배드민턴"},
];

const BoardList = () => {
	const [searchParams] = useSearchParams();
	const type = searchParams.get("type") ?? "free";
	const current = boardType.find((b) => b.key === type) ?? boardType[1];
	const navigate = useNavigate();

	const [selectedGroup, setSelectedGroup] = useState("all");

	const handleWrite = () => {
		navigate('/boardForm');
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
								value={selectedGroup}
								onChange={(e) => setSelectedGroup(e.target.value)}
							>
								{joinedGroups.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
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
				<div className={styles.emptyState}>
					<div className={styles.emptyCircle}>
						<LayoutList size={32} className={styles.emptyIcon} />
					</div>
					<h3 className={styles.emptyTitle}>등록된 이야기가 없습니다</h3>
					<p className={styles.emptyDesc}>새로운 소식을 가장 먼저 나누어 보세요.</p>
					<button className={styles.outlineBtn} onClick={handleWrite}>
						첫 게시글 작성하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default BoardList;