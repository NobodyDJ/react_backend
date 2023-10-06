import { PageParams, User } from "@/types/api";
import { Button, Table, Form, Input, Select, Space, App } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState, useRef } from "react";
import api from "@/api";
import { formatDate } from "@/utils";
import CreateUser from "./CreateUser";
import { IAction } from "@/types/modal";
export default function UserList() {
	// 表单实例化
	const { message,modal } = App.useApp();
	const [form] = Form.useForm();
	const [data, setData] = useState<User.UserItem[]>([]);
	const [total, setTotal] = useState(0);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	});
	// 组件对象获取
	const userRef = useRef<{
		open: (type: IAction, data?: User.UserItem) => void;
	}>();
	// 批量删除的userId
	const [userIds, setUserIds] = useState<number[]>([])
	useEffect(() => {
		getUserList({
			pageNum: pagination.current,
			pageSize: pagination.pageSize,
		});
	}, [pagination.current, pagination.pageSize]);
	const getUserList = async (params: PageParams) => {
		const values = form.getFieldsValue();
		const data = await api.getUserList({
			...values,
			pageNum: params.pageNum,
			pageSize: params.pageSize || pagination.pageSize,
		});
		const list = data.list
		const total = data.page.total
		// 模拟假数据
		// const list = Array.from({ length: 50 })
		// 	.fill({})
		// 	.map((item: any) => {
		// 		item = { ...data.list[0] };
		// 		item.userId = Math.random();
		// 		return item;
		// 	});
		setData(list);
		setTotal(total);
		setPagination({
			current: data.page.pageNum,
			pageSize: data.page.pageSize,
		});
	};

	const columns: ColumnsType<User.UserItem> = [
		{
			title: "用户ID",
			dataIndex: "userId",
			key: "userId",
		},
		{
			title: "用户名称",
			dataIndex: "userName",
			key: "userName",
		},
		{
			title: "用户邮箱",
			dataIndex: "userEmail",
			key: "userEmail",
		},
		{
			title: "用户角色",
			dataIndex: "role",
			key: "role",
			render(role: number) {
				return {
					0: "超级管理员",
					1: "管理员",
					2: "体验管理员",
					3: "普通用户",
				}[role];
			},
		},
		{
			title: "用户状态",
			dataIndex: "state",
			key: "state",
			render(state: number) {
				return {
					1: "在职",
					2: "离职",
					3: "试用期",
				}[state];
			},
		},
		{
			title: "注册时间",
			dataIndex: "createTime",
			key: "createTime",
			render(createTime: string) {
				return formatDate(createTime);
			},
		},
		{
			title: "操作",
			dataIndex: "address",
			key: "address",
			render(text,record) {
				return (
					<Space>
						<Button type="text" onClick={()=>handleEdit(record)}>编辑</Button>
						<Button type="text" danger onClick={()=>handleDel(record.userId)}>
							删除
						</Button>
					</Space>
				);
			},
		},
	];
	// 搜索
	const handleSearch = () => {
		getUserList({
			pageNum: 1,
		});
	};

	// 重置表单
	const handleReset = () => {
		form.resetFields();
	};
	// 新增
	const handleCreate = () => {
		userRef.current?.open("create");
	};
	const handleEdit = (record: User.UserItem) => {
		userRef.current?.open("edit", record);
	}
	// 单个删除
	const handleDel = (userId: number) => {
		console.log('modal', modal)
		modal.confirm({
			title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      }
		})
	}
	// 批量删除
	const handlePatchConfirm = () => {
		if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
	}
	// 公共删除调用接口
	const handleUserDelSubmit = async (ids: number[]) => {
		try {
      await api.userDel({
        userIds: ids
      })
      message.success('删除成功')
      setUserIds([])
      getUserList({
        pageNum: 1,
      })
    } catch (error) {}
	}
	return (
		<div className="user-list">
			<Form
				className="search-form"
				form={form}
				layout="inline"
				initialValues={{ state: 0 }}
			>
				<Form.Item name="userId" label="用户ID">
					<Input placeholder="请输入用户ID" />
				</Form.Item>
				<Form.Item name="userName" label="用户名称">
					<Input placeholder="请输入用户名称" />
				</Form.Item>
				<Form.Item name="state" label="状态">
					<Select style={{ width: 120 }}>
						<Select.Option value={0}>所有</Select.Option>
						<Select.Option value={1}>在职</Select.Option>
						<Select.Option value={2}>离职</Select.Option>
						<Select.Option value={3}>试用期</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Space>
						<Button type="primary" onClick={handleSearch}>
							搜索
						</Button>
						<Button type="default" onClick={handleReset}>
							重置
						</Button>
					</Space>
				</Form.Item>
			</Form>
			<div className="base-table">
				<div className="header-wrapper">
					<div className="title">用户列表</div>
					<div className="action">
						<Button type="primary" onClick={handleCreate}>
							新增
						</Button>
						<Button type="primary" danger onClick={handlePatchConfirm}>
							批量删除
						</Button>
					</div>
				</div>
				<Table
					bordered
					rowKey="userId"
					rowSelection={{
						type: "checkbox",
						selectedRowKeys: userIds,
						onChange(selectedRowKeys) {
							setUserIds(selectedRowKeys as number[])
						},
					}}
					dataSource={data}
					columns={columns}
					pagination={{
						position: ["bottomRight"],
						current: pagination.current,
						pageSize: pagination.pageSize,
						total,
						showQuickJumper: true,
						showSizeChanger: true,
						showTotal: function (total) {
							return `总共：${total}条`;
						},
						onChange: (page, pageSize) => {
							setPagination({
								current: page,
								pageSize,
							});
						},
					}}
				/>
			</div>
			<CreateUser
				mRef={userRef}
				update={() => {
					getUserList({
						pageNum: 1,
					});
				}}
			/>
		</div>
	);
}
