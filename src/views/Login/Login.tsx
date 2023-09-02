import { useEffect } from "react";
import request from "@/utils/request";
import { Button, Form, Input, message } from "antd";
import "./index.less";
import { Login } from '@/types/api.ts'
import api from '../../api'
import storage from "@/utils/storage";
export default function LoginFC() {
	const onFinish = async (values:Login.params) => {
		const data = await api.login(values);
		storage.set('token', data);
		message.success('登陆成功');
		const params = new URLSearchParams(location.search);
		location.href = params.get('callback') || '/';
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
						name="userName"
						rules={[{ required: true, message: "请输入您的用户名" }]}
					>
						<Input placeholder="请输入用户名"/>
					</Form.Item>

					<Form.Item
						name="userPwd"
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
