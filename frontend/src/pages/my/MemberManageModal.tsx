import { X } from 'lucide-react';
import styles from '../../css/My.module.css';

interface groupMemberDto {
	userId: string;
	userNick: string;
	groupId: number;
	groupAdminGrade: string;
	groupJoinState: string;
}

interface MemberManageModalProps {
	open: boolean;
	groupNm: string;
	joinMembers: groupMemberDto[];
	reqMembers: groupMemberDto[];
	onClose: () => void;
	onAcceptMember: (groupId: number, userId: string, reqYn: string) => void;
}

const MemberManageModal = ({open, groupNm, joinMembers, reqMembers, onClose, onAcceptMember}: MemberManageModalProps) => {
	if (!open) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<h2>{groupNm} 관리</h2>
					<button className={styles.modalCloseBtn} onClick={onClose}>
						<X size={20} />
					</button>
				</div>
				<div className={styles.modalBody}>
					<div className={styles.modalContentSection}>
						<h3>현재 모임원 ({joinMembers.length})</h3>
						<div className={styles.modalList}>
							{joinMembers.length > 0 ? joinMembers.map(member => (
								<div className={styles.modalRow} key={member.userId}>
									<div className={styles.modalItemLabel}>{member.userNick}</div>
									{member.groupAdminGrade === 'A' && (
										<div className={styles.modalItemLabel}>관리자</div>
									)}
									{member.groupAdminGrade === 'M' && (
										<button className={`${styles.btn} ${styles.btnModalDanger}`}
										        onClick={() => onAcceptMember(member.groupId, member.userId, 'N')}>추방</button>
									)}
								</div>
							)) : (
								<div className={styles.modalEmptyRow}>모임원이 없습니다.</div>
							)}
						</div>
					</div>
					<div className={styles.modalContentSection}>
						<h3>가입 신청 내역 ({reqMembers.length})</h3>
						<div className={styles.modalList}>
							{reqMembers.length > 0 ? reqMembers.map(member => (
								<div className={styles.modalRow} key={member.groupId}>
									<div className={styles.modalItemLabel}>{member.userNick}</div>
									<div className={styles.modalActionGroup}>
										<button className={`${styles.btn} ${styles.btnModalPrimary}`}
										        onClick={() => onAcceptMember(member.groupId, member.userId, 'Y')}>승인</button>
										<button className={`${styles.btn} ${styles.btnModalDanger}`}
										        onClick={() => onAcceptMember(member.groupId, member.userId, 'N')}>거절</button>
									</div>
								</div>
							)) : (
								<div className={styles.modalEmptyRow}>새로운 가입 신청이 없습니다.</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemberManageModal;
