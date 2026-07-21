import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";

import styles from "../css/Layout.module.css";

function SideLayout() {
	const [isOpen, setIsOpen] = useState(false);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = () => {
		const isConfirm = confirm("로그아웃 하시겠습니까?");

		if(isConfirm) {
			logout();
			navigate("/login");

		}
	};

	const handleSchedule = () => {
		setIsOpen(false);
		navigate("/scheduleMain");
	};

	const handleGroup = () => {
		setIsOpen(false);
		navigate("/groupMain");
	};

	const handleBoard = () => {
		setIsOpen(false);
		navigate("/boardList");
	}

	const handleMyPage = () => {
		setIsOpen(false);
		navigate("/myMain");
	};

	return (
		<div className={styles.wrapper}>
			<aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
				<div className={styles.sidebarContent}>
					<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
					<nav className={styles.menu}>
						<ul>
							<li onClick={handleSchedule}>캘린더</li>
							<li onClick={handleGroup}>모임찾기</li>
							<!--<li onClick={handleBoard}>게시판</li>-->
							<li onClick={handleMyPage}>마이페이지</li>
						</ul>

						<div className={styles.logoutWrapper}
							 onClick={handleLogout}>
							<button className={styles.logoutBtn}>로그아웃</button>
						</div>
					</nav>
				</div>
			</aside>

			<main className={styles.mainContent}>
				<button className={styles.toggleBtn} onClick={() => setIsOpen(true)}>☰</button>

				<Outlet/>
			</main>
		</div>
	);
};

export default SideLayout;