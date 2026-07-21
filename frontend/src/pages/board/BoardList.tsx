import {useSearchParams} from "react-router-dom";

const boardTitles: Record<string, string> = {
	group: "모임 게시판",
	free: "자유 게시판",
	suggest: "건의 게시판",
};

const BoardList = () => {
	const [searchParams] = useSearchParams();
	const type = searchParams.get("type") ?? "free";
	const title = boardTitles[type] ?? "게시판";

	return (
		<div>
			<h1>{title}</h1>
		</div>
	);
};

export default BoardList;