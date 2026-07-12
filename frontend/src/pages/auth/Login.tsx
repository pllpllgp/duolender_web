import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from '../../api/axiosInstance';
import * as React from "react";
import {useAuthStore} from "../../store/useAuthStore.ts";

import styles from "../../css/Auth.module.css";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Login = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		userId: '',
		userPw: '',

	});

	const [serverStatus, setServerStatus] = useState<'checking' | 'connected' | 'error'>('checking');

	useEffect(() => {
		axios.get(`${SERVER_BASE_URL}/api/auth/duoConnect`)
			.then(() => setServerStatus('connected'))
			.catch(() => setServerStatus('error'));
	}, []);

	const login = useAuthStore((state) => state.login);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async ()=> {
		try {
			const res = await axios.post(`${SERVER_BASE_URL}/api/auth/login`, loginData);

			if(res.data.userId) {
				login({
					userId: res.data.userId,
					userNick: res.data.userNick,
				}, res.data.userToken);

				navigate('/scheduleMain');

			} else {
				alert('아이디 또는 비밀번호가 일치하지 않습니다.');
			}

		} catch (error) {
			console.log('로그인 중 에러 발생: ', error);
			alert('통신 중 에러 발생');

		}
	}

	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>

			{serverStatus === 'checking' && (
				<div className={styles.overlay}>
					<div className={styles.loadingBox}>
						서버 연결 중입니다...
					</div>
				</div>
			)}
			{serverStatus === 'error' && (
				<span className={styles.statusError}>서버에 연결할 수 없습니다.</span>
			)}

				<h1 className={styles.title}>DuoLender</h1>
				<p className={styles.subtitle}>우리들의 그룹 일정 관리</p>

				<div className={styles.inputGroup}>
					<input
						type="text"
						name="userId"
						placeholder="아이디"
						onChange={handleChange}
						className={styles.inputField}
					/>
					<input
						type="password"
						name="userPw"
						placeholder="비밀번호"
						onChange={handleChange}
						onKeyDown={handleSearchKeyDown}
						className={styles.inputField}
					/>
				</div>

				<button
					className={styles.submitButton}
					onClick={handleSubmit}
				>
					로그인
				</button>

				<button className={styles.signupLink}
						onClick={() => navigate('/signup')}>
					아직 회원이 아니신가요? 회원가입
				</button>

			</div>

			<div className={styles.techStack}>
				<h3>현재 적용된 기술 스택</h3>
				<ul>
					<li>Backend: Java (Spring Boot)</li>
					<li>Frontend: React + TypeScript</li>
					<li>Database: PostgreSQL</li>
					<li>ORM: JPA (Hibernate) + QueryDSL</li>
					<li>Routing: React Router v7 (Data API)</li>
					<li>State Management: Zustand</li>
					<li>Build Tool: Vite</li>
					<li>Security: Spring Security (Argon2), JWT</li>
					<li><strong>Infrastructure: Docker, Render (PaaS)</strong></li>
					<li><strong>Database Hosting: Neon (Serverless PostgreSQL)</strong></li>
				</ul>
			</div>
		</div>
	);
};

export default Login;