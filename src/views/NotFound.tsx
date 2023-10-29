import { Button, Result } from "antd";
import { useNavigate } from "react-router";

function NotFound() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/welcome");
	};
	return (
		<Result
			status="404"
			title="404"
			subTitle="抱歉，没有找到该页面"
			extra={
				<Button type="primary" onClick={handleClick}>
					回到首页
				</Button>
			}
		></Result>
	);
}

export default NotFound;
