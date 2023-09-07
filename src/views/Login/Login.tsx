import { useEffect, useState } from "react";
import request from "@/utils/request";
import { Button, Form, Input, App } from "antd";
import "./index.less";
import { Login } from '@/types/api.ts'
import { Result } from '../../types/api'
import api from '../../api'
import storage from "@/utils/storage";
export default function LoginFC() {
	// 函数hook的用法必须置顶
	const { message, notification, modal } = App.useApp();
	const [loading, setLoading] = useState(false)
	const onFinish = async (values: Login.params) => {
		try {
			setLoading(true)
			const data: any = await api.login(values);
			storage.set('token', data);
			message.success('登陆成功');
			const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
		} catch (error) {
			message.error('登陆失败');
		}
		setLoading(false)
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
						<Input allowClear={ true } placeholder="请输入用户名"/>
					</Form.Item>

					<Form.Item
						name="userPwd"
						rules={[{ required: true, message: "请输入您的密码" }]}
					>
						<Input.Password allowClear={ true } placeholder="请输入密码"/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" block htmlType="submit" loading={ loading }>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
