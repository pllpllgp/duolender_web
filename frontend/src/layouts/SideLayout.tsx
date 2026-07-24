import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";

import styles from "../css/Layout.module.css";

function SideLayout() {
	const [open, setOpen] = useState(false);
	const [dev] = useState(true);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();
	const location = useLocation();

	const menuActive = (path: string) => location.pathname === path;
	const boardActive = (type: string) =>
		location.pathname === "/boardList" && new URLSearchParams(location.search).get("type") === type;

	const handleLogout = () => {
		const isConfirm = confirm("로그아웃 하시겠습니까?");

		if(isConfirm) {
			logout();
			navigate("/login");
		}
	};

	const handleSchedule = () => {
		setOpen(false);
		navigate("/scheduleMain");
	};

	const handleGroup = () => {
		setOpen(false);
		navigate("/groupMain");
	};

	const handleBoard = (type: string) => {
		setOpen(false);
		navigate(`/boardList?type=${type}&page=1`);
	};

	const handleMyPage = () => {
		setOpen(false);
		navigate("/myMain");
	};

	return (
		<div className={styles.wrapper}>
			<aside className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>
				<div className={styles.sidebarContent}>
					<button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
					<nav className={styles.menu}>
						<ul>
							<li className={menuActive("/scheduleMain") ? styles.activeMenuItem : undefined}
							    onClick={handleSchedule}>캘린더</li>
							<li className={menuActive("/groupMain") ? styles.activeMenuItem : undefined}
							    onClick={handleGroup}>모임찾기</li>
							{dev &&
								<li className={styles.menuParent}>
									<div className={`${styles.menuParentLabel} ${location.pathname === "/boardList" ? styles.activeMenu : ""}`}>
										게시판
									</div>
									<ul className={styles.subMenu}>
										<li className={boardActive("group") ? styles.activeMenuItem : undefined}
											onClick={() => handleBoard("group")}>모임 게시판</li>
										<li className={boardActive("free") ? styles.activeMenuItem : undefined}
											onClick={() => handleBoard("free")}>자유 게시판</li>
										<li className={boardActive("suggest") ? styles.activeMenuItem : undefined}
											onClick={() => handleBoard("suggest")}>건의 게시판</li>
									</ul>
								</li>
							}
							<li className={menuActive("/myMain") ? styles.activeMenuItem : undefined}
							    onClick={handleMyPage}>마이페이지</li>
						</ul>

						<div className={styles.logoutWrapper}
						     onClick={handleLogout}>
							<button className={styles.logoutBtn}>로그아웃</button>
						</div>
					</nav>
				</div>
			</aside>

			<main className={styles.mainContent}>
				<button className={styles.toggleBtn} onClick={() => setOpen(true)}>☰</button>

				<Outlet/>
			</main>
		</div>
	);
};

export default SideLayout;