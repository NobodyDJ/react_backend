import { Modal, Input, Select, Form, Upload, App, TreeSelect } from "antd";
import storage from "@/utils/storage";
import type { RcFile } from "antd/es/upload/interface";
import { useState, useImperativeHandle, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { IAction, IModalProp } from "@/types/modal";
import { User, Dept, Role } from "@/types/api";
import api from "@/api";

const CreateUser = (props: IModalProp) => {
	const [form] = Form.useForm();
	const { message } = App.useApp();
	const [img, setImg] = useState("");
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [action, setAction] = useState<IAction>("create");
	const [deptList, setDeptList] = useState<Dept.DeptItem[]>([]);
	const [roleList, setRoleList] = useState<Role.RoleItem[]>([]);
	// 打开对话框
	// 当前的ref，想要暴露的函数
	useImperativeHandle(props.mRef, () => {
		return {
			open,
		};
	});
	useEffect(() => {
		getDeptList();
		getRoleList();
	}, []);
	// 获取部门列表
	const getDeptList = async () => {
		const list = await api.getDeptList();
		setDeptList(list);
	};

	// 获取角色列表
	const getRoleList = async () => {
		const list = await api.getRoleAllList();
		setRoleList(list);
	};
	// 调用弹框显示方法
	const open = (type: IAction, data?: User.UserItem) => {
		form.resetFields();
		setAction(type);
		setVisible(true);
		if (type === "edit" && data) {
			form.setFieldsValue(data);
			setImg(data.userImg);
		}
	};
	const handleSubmit = async () => {
		const valid = await form.validateFields();
		if (valid) {
			const params = {
				...form.getFieldsValue(),
				userImg: img,
			};
			if (action === "create") {
				await api.userCreate(params);
				message.success("创建成功");
			} else {
				await api.userEdit(params);
				message.success("修改成功");
			}
			handleCancel();
			props.update();
		}
	};
	const handleCancel = () => {
		setVisible(false);
		setImg("");
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
				<Form.Item label="用户ID" name="userId" hidden>
					<Input placeholder="请输入用户ID" />
				</Form.Item>
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
					rules={[
						{ required: true, message: "请输入用户邮箱" },
						{ type: "email", message: "请输入正确的邮箱" },
						{
							pattern: /^\w+@mars.com$/,
							message: "邮箱必须以@mars.com结尾",
						},
					]}
				>
					<Input placeholder="请输入用户邮箱"></Input>
				</Form.Item>
				<Form.Item
					label="手机号"
					name="mobile"
					rules={[
						{ len: 11, message: "请输入11位手机号" },
						{ pattern: /1[1-9]\d{9}/, message: "请输入1开头的11位手机号" },
					]}
				>
					<Input type="number" placeholder="请输入手机号"></Input>
				</Form.Item>
				<Form.Item
					label="部门"
					name="deptId"
					rules={[
						{
							required: true,
							message: "请选择部门",
						},
					]}
				>
					<TreeSelect
						placeholder="请选择部门"
						allowClear
						treeDefaultExpandAll
						showCheckedStrategy={TreeSelect.SHOW_ALL}
						fieldNames={{ label: "deptName", value: "_id" }}
						treeData={deptList}
					/>
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
				<Form.Item label="系统角色" name="roleList">
					<Select placeholder="请选择角色">
						{roleList.map((item) => {
							return (
								<Select.Option value={item._id} key={item._id}>
									{item.roleName}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label="用户头像">
					<Upload
						listType="picture-circle"
						showUploadList={false}
						headers={{
							Authorization: "Bearer " + storage.get("token"),
							icode: "C48F7F904580838A",
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
