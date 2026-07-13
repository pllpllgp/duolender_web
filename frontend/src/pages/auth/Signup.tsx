import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from '../../api/axiosInstance';
import * as React from "react";

import styles from "../../css/Auth.module.css";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Signup = () => {
	const navigate = useNavigate();
	const [signupForm, setSignupForm] = useState({
		userId: '',
		userPw: '',
		userPwConfirm: '',
	});

	const [idDupleCheck, setIdDupleCheck] = useState(false);
	const [idDupleMessage, setIdDupleMessage] = useState('');

	const pwConfirmMessage = !signupForm.userPwConfirm
		? ''
		: signupForm.userPw === signupForm.userPwConfirm
			? '비밀번호가 일치합니다.'
			: '비밀번호가 일치하지 않습니다.';

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		setSignupForm({
			...signupForm,
			[e.target.name]: e.target.value,
		})

		if (e.target.name === 'userId') {
			setIdDupleCheck(false);
			setIdDupleMessage('');
		}
	}

	const handleIdDupleCheck = async (state: any) => {
		try {
			const postData = {
				userId: signupForm.userId,
				dupleState: state,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/auth/idDupleCheck`, postData);

			setIdDupleCheck(res.data.result);
			if (res.data.result) {
				setIdDupleMessage('사용 가능한 아이디 입니다.');
			} else {
				setIdDupleMessage('이미 사용중인 아이디 입니다.');
			}

		} catch (error) {
			console.log('아이디 중복 확인 에러 발생: ', error);
		}

	};

	const handleSignup = async () => {
		try {
			if (Object.values(signupForm).some((value) => value.trim() === '')) {
				alert('모든 항목을 입력해주세요.');
				return;

			} else if(signupForm.userPw !== signupForm.userPwConfirm) {
				alert('비밀번호가 일치하지 않습니다.');
				return;

			}


			const postData= {
				userId: signupForm.userId,
				userPw: signupForm.userPw,
				userPwConfirm: signupForm.userPwConfirm,
				userIdDupleCheck: idDupleCheck,
			}

			const res = await axios.post(`${SERVER_BASE_URL}/api/auth/signup`, postData);

			if(res.data.result === 'notPwValid') {
				alert('비밀번호는 영문, 숫자, 특수문자 포함 8~20자로 설정바랍니다.');

			} else if(res.data.result === 'duplId'){
				alert('중복된 ID 입니다. 다른 ID를 사용해주세요.');

			} else {
				navigate('/login');

			}


		} catch (error) {
			console.log('회원가입 에러 발생: ', error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1 className={styles.title}>DuoLender</h1>
				<p className={styles.subtitle}>새로운 계정 만들기</p>

				<div className={styles.inputGroup}>
					<div className={styles.inputRow}>
						<input type="text"
						       name="userId"
						       placeholder="아이디"
						       className={styles.inputField}
						       onChange={handleChange}
						/>
						<button
							className={styles.inlineButton}
							onClick={() => handleIdDupleCheck('id')}
						>
							중복 확인
						</button>
					</div>
					<span className={idDupleCheck === true ? styles.statusSuccess : styles.statusError}>
					{idDupleMessage}
					</span>

					<input type="password"
					       name="userPw"
					       placeholder="비밀번호"
					       className={styles.inputField}
					       onChange={handleChange}
					/>
					<span className={styles.helperText}>
					* 영문, 숫자, 특수문자 포함 8~20자로 입력해주세요.
					</span>

					<input type="password"
					       name="userPwConfirm"
					       placeholder="비밀번호 확인"
					       className={styles.inputField}
					       onChange={handleChange}
					/>
					{pwConfirmMessage && (
						<span
							className={pwConfirmMessage.includes('일치합니다') ? styles.statusSuccess : styles.statusError}>
							{pwConfirmMessage}
						</span>
					)}
				</div>

				<button className={styles.submitButton}
				        onClick={(handleSignup)}
				>
					가입하기
				</button>

				<button className={styles.signupLink}
				        onClick={() => navigate('/login')}
				>
					이미 계정이 있으신가요? 로그인
				</button>
			</div>
		</div>
	);
};

export default Signup;