import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from '../../api/axiosInstance';

import styles from "../../css/Auth.module.css";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Login = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		userId: '',
		userPw: '',

	});

	const [isLoading, setIsLoading] = useState(false);
	const [serverStatus, setServerStatus] = useState<'checking' | 'connected' | 'error'>('checking');

	useEffect(() => {
		axios.get(`${SERVER_BASE_URL}/api/auth/duoConnect`)
			.then(() => setServerStatus('connected'))
			.catch(() => setServerStatus('error'));
	}, []);

	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.card}>

				{serverStatus === 'checking' && (
					<span className={styles.statusError}>서버 연결 중.</span>
				)}
				{serverStatus === 'connected' && (
					<span className={styles.statusError}>로그인하실 수 있습니다.</span>
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
						onChange={(e) => setUserId(e.target.value)}
						className={styles.inputField}
					/>
					<input
						type="password"
						name="userPw"
						placeholder="비밀번호"
						onChange={(e) => setUserPw(e.target.value)}
						className={styles.inputField}
					/>
				</div>

				<button className={styles.submitButton}>
					로그인
				</button>

				<button className={styles.signupLink}>
					아직 회원이 아니신가요? 회원가입
				</button>

			</div>

			<div className={styles.techStack}>
				<h3>현재 적용된 기술 스택</h3>
				<ul>
					<li>Backend: Java (Spring Boot)</li>
					<li>Frontend: React + TypeScript</li>
					<li>Database: PostgreSQL</li>
					<li>ORM: JPA (Hibernate)</li>
					<li>Routing: React Router v6 (Data API)</li>
					<li>Security: Spring Security (BCrypt)</li>
					<li><strong>Infrastructure: Docker, Render (PaaS)</strong></li>
					<li><strong>Database Hosting: Neon (Serverless PostgreSQL)</strong></li>
				</ul>
			</div>
		</div>
	);
};

export default Login;