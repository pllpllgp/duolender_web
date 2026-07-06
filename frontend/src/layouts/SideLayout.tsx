import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";

import styles from "../css/Layout.module.css";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SideLayout() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.wrapper}>
			<aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
				<div className={styles.sidebarContent}>
					<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
					<nav className={styles.menu}>
						<ul>
							<li>캘린더</li>
							<li>그룹</li>
							<li>마이페이지</li>
						</ul>

						<div className={styles.logoutWrapper}>
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
	)
}

export default SideLayout;