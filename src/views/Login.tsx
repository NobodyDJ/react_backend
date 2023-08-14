import request from "@/utils/request";
import { useEffect } from "react";
export default function Login() {
	useEffect(() => {
		request
			.get<string>("/user", {
				id: 12345,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return <div className="welcome">Login</div>;
}
