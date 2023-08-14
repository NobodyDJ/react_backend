import { useEffect } from "react";
import request from "@/utils/request";
import { Button } from "antd";
export default function Welcome() {
	useEffect(() => {
		request.post("/users/login", {});
	}, []);
	const handleClick = () => {
		request.get("/users/login", {});
	};
	return (
		<div className="welcome">
			<p>Welcome</p>
			<Button onClick={handleClick}>点击</Button>
		</div>
	);
}
