import {useNavigate} from "react-router-dom";
import {ArrowLeft, MoreVertical} from "lucide-react";

import styles from "../../css/Board.module.css";

const BoardView = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.titleWrapper}>
					<button className={styles.iconBtn} onClick={() => navigate(-1)}>
						<ArrowLeft size={22} />
					</button>
					<div className={styles.categoryBadge}>건의 게시판</div>
				</div>
				<div className={styles.actionGroup}>
					<button className={styles.textBtn}>수정</button>
					<button className={styles.textBtnDanger}>삭제</button>
				</div>
			</div>

			<div className={styles.boardCard}>
				<div className={styles.viewHeader}>
					<h2 className={styles.viewTitle}>새로운 모임 활동에 대한 건의사항이 있습니다.</h2>
					<div className={styles.viewMeta}>
						<div className={styles.authorInfo}>
							<div className={styles.avatar}>홍</div>
							<span className={styles.authorName}>홍길동</span>
						</div>
						<span className={styles.metaDot}>·</span>
						<span className={styles.dateText}>2026. 07. 21 15:30</span>
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.viewBody}>
					이번 모임에서 진행할 프로그램에 대해 몇 가지 제안을 드리고 싶습니다.<br /><br />
					첫째, 참석자 모두가 참여할 수 있는 아이스브레이킹 세션이 필요해 보입니다.<br />
					둘째, 장소 선정 시 대중교통 접근성을 조금 더 고려해주셨으면 합니다.<br /><br />
					다른 분들의 의견도 궁금합니다. 댓글로 남겨주시면 감사하겠습니다.
				</div>
			</div>
		</div>
	);
};

export default BoardView;