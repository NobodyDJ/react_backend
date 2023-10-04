import { Modal, Input, Select, Form, Upload, App } from "antd";
import storage from "@/utils/storage";
import type { RcFile } from "antd/es/upload/interface";
import { useState, useImperativeHandle } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { IAction, IModalProp } from "@/types/modal";
import { User } from "@/types/api";
import api from "@/api";

const CreateUser = (props: IModalProp) => {
	const [form] = Form.useForm();
	const { message } = App.useApp();
	const [img, setImg] = useState("");
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [action, setAction] = useState<IAction>("create");
	// 打开对话框
	// 当前的ref，想要暴露的函数
	useImperativeHandle(props.mRef, () => {
		return {
			open,
		};
	});

	// 调用弹框显示方法
	const open = (type: IAction, data?: User.UserItem) => {
		setAction(type);
		setVisible(true);
	};
	const handleSubmit = async () => {
		const valid = await form.validateFields();
		if (valid) {
			const params = {
				...form.getFieldsValue(),
				userImg: img,
			};
			if (action === "create") {
				const data = await api.userCreate(params);
				message.success("创建成功");
				handleCancel();
				props.update();
			}
		} else {
		}
	};
	const handleCancel = () => {
		setVisible(false);
	};
	// 文件上传之前的校验
	const beforeUpload = (file: RcFile) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("只能上传png或jpeg格式的图片");
			return false;
		}
		const isLt500K = file.size / 1024 / 1024 < 0.5;
		if (!isLt500K) {
			message.error("图片不能超过500K");
		}
		return isJpgOrPng && isLt500K;
	};
	// 当上传的文件发生变化
	const handleChange = (param: any) => {
		const { file } = param;
		if (file.status === "done") {
			setLoading(false);
			const { code, data, msg } = file.response;
			if (code === 0) {
				setImg(data.file);
			} else {
				message.error(msg);
			}
		} else if (file.status === "error") {
			message.error("服务器异常，请稍后重试");
		}
	};
	return (
		<Modal
			title="创建用户"
			okText="确定"
			cancelText="取消"
			width={800}
			open={visible}
			onOk={handleSubmit}
			onCancel={handleCancel}
		>
			<Form form={form} labelCol={{ span: 4 }} labelAlign="right">
				<Form.Item
					label="用户名称"
					name="userName"
					rules={[{ required: true, message: "请输入用户名称" }]}
				>
					<Input placeholder="请输入用户名称"></Input>
				</Form.Item>
				<Form.Item
					label="用户邮箱"
					name="userEmail"
					rules={[{ required: true, message: "请输入用户邮箱" }]}
				>
					<Input placeholder="请输入用户邮箱"></Input>
				</Form.Item>
				<Form.Item label="手机号" name="mobile">
					<Input type="number" placeholder="请输入手机号"></Input>
				</Form.Item>
				<Form.Item
					label="部门"
					name="deptId"
					// rules={[{ required: true, message: "请输入部门" }]}
				>
					<Input placeholder="请输入部门"></Input>
				</Form.Item>
				<Form.Item label="岗位" name="Job">
					<Input placeholder="请输入岗位"></Input>
				</Form.Item>
				<Form.Item label="状态" name="state">
					<Select>
						<Select.Option value={1}>在职</Select.Option>
						<Select.Option value={2}>离职</Select.Option>
						<Select.Option value={3}>试用期</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="角色" name="roleList">
					<Input placeholder="请输入角色"></Input>
				</Form.Item>
				<Form.Item label="用户头像">
					<Upload
						listType="picture-circle"
						showUploadList={false}
						headers={{
							Authorization: "Bearer " + storage.get("token"),
							icode: "816D11B82E5C0923",
						}}
						action="/api/users/upload"
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{img ? (
							<img src={img} style={{ width: "100%" }} />
						) : (
							<div>
								{loading ? (
									<LoadingOutlined rev={undefined} />
								) : (
									<PlusOutlined rev={undefined} />
								)}
								<div style={{ marginTop: 5 }}>上传头像</div>
							</div>
						)}
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateUser;
