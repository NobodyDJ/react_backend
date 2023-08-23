import { useEffect } from "react";
import request from "@/utils/request";
import { Button, Form, Input } from "antd";
import "./index.less";
export default function Login() {
	const onFinish = () => {
		console.log("values");
	};
	return (
		<div className="login">
			<div className="login-wrapper">
				<div className="title">系统登录</div>
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: "请输入您的用户名" }]}
					>
						<Input placeholder="请输入用户名"/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[{ required: true, message: "请输入您的密码" }]}
					>
						<Input.Password placeholder="请输入密码"/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" block htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
