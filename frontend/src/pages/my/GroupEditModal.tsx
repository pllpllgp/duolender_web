import * as React from "react";
import { X } from 'lucide-react';
import styles from '../../css/My.module.css';

interface editGroupFormDto {
	groupId: number;
	groupNm: string;
	groupMemo: string;
	groupSecretYn: string;
}

interface GroupEditModalProps {
	open: boolean;
	form: editGroupFormDto;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onClose: () => void;
	onSave: () => void;
}

const GroupEditModal = ({open, form, onChange, onClose, onSave}: GroupEditModalProps) => {
	if(!open) {
		return null;
	}

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
				<div className={styles.modalHeader}>
					<h2>그룹 수정</h2>
					<button className={styles.modalCloseBtn} onClick={onClose}>
						<X size={24}/>
					</button>
				</div>
				<div className={styles.modalBody}>
					<div className={styles.formGroup}>
						<label>그룹 이름</label>
						<input type="text" name="groupNm" value={form.groupNm} placeholder="그룹 이름을 입력하세요"
						       onChange={onChange}/>
					</div>
					<div className={styles.formGroup}>
						<label>그룹 설명</label>
						<textarea name="groupMemo" value={form.groupMemo} placeholder="어떤 그룹인지 설명해주세요" rows={4}
						          onChange={onChange}/>
					</div>
					<div className={styles.formGroup}>
						<label>공개 설정</label>
						<div className={styles.radioGroup}>
							<label className={styles.radioLabel}>
								<input type="radio" name="groupSecretYn" value="N"
								       checked={form.groupSecretYn === 'N'}
								       onChange={onChange}/>
								공개
							</label>
							<label className={styles.radioLabel}>
								<input type="radio" name="groupSecretYn" value="Y"
								       checked={form.groupSecretYn === 'Y'}
								       onChange={onChange}/>
								비공개
							</label>
						</div>
					</div>
					<div className={styles.modalFooter}>
						<button className={styles.cancelBtn} onClick={onClose}>취소</button>
						<button className={styles.submitBtn} onClick={onSave}>수정하기</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupEditModal;
