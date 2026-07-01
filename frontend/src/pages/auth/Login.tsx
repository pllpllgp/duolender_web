import {useState} from "react";
import styles from "../../css/Auth.module.css";

const Login = () => {
	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.card}>

				<span className={styles.statusError}>서버 연결 실패</span>

				<h1 className={styles.title}>DuoLender</h1>
				<p className={styles.subtitle}>우리들의 그룹 일정 관리</p>

				<div className={styles.inputGroup}>
					<input
						type="text"
						placeholder="아이디"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className={styles.inputField}
					/>
					<input
						type="password"
						placeholder="비밀번호"
						value={userPw}
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