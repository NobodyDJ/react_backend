import { Button, Result } from "antd";
import { useNavigate } from "react-router";

function NoAccess() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
	};
	return (
		<Result
			status="403"
			title="403"
			subTitle="抱歉，您没有权限访问改页面"
			extra={
				<Button type="primary" onClick={handleClick}>
					回到首页
				</Button>
			}
		></Result>
	);
}

export default NoAccess;
