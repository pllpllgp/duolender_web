import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.ts";

import styles from "../css/Layout.module.css";

function SideLayout() {
	const [open, setOpen] = useState(false);
	const [dev] = useState(false);
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
		setOpen(false);
		navigate("/scheduleMain");
	};

	const handleGroup = () => {
		setOpen(false);
		navigate("/groupMain");
	};

	const handleBoard = (type: string) => {
		setOpen(false);
		navigate(`/boardList?type=${type}`);
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
							<li onClick={handleSchedule}>캘린더</li>
							<li onClick={handleGroup}>모임찾기</li>
							{dev &&
							<li className={styles.menuParent}>
								<div>
									게시판
								</div>
									<ul className={styles.subMenu}>
										<li onClick={() => handleBoard("group")}>모임 게시판</li>
										<li onClick={() => handleBoard("free")}>자유 게시판</li>
										<li onClick={() => handleBoard("suggest")}>건의 게시판</li>
									</ul>
							</li>
							}
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
				<button className={styles.toggleBtn} onClick={() => setOpen(true)}>☰</button>

				<Outlet/>
			</main>
		</div>
	);
};

export default SideLayout;