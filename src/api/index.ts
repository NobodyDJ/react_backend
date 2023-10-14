/**
 * API 接口管理
 */

import {
	Login,
	User,
	Dept,
	Role,
	MenuType,
	OrderType,
	ResultData,
} from "../types/api";
import request from "@/utils/request";

// 登录
export default {
	// 登录
	login(params: Login.params) {
		return request.post<string>("/users/login", params);
	},
	// 获取用户信息
	getUserInfo() {
		return request.get<User.UserItem>("/users/getUserInfo");
	},
	// 获取折线图数据
	getLineData() {
		return request.get<OrderType.LineData>("/order/dashboard/getLineData");
	},
	// 获取饼图1数据
	getPieCityData() {
		return request.get<OrderType.PieData[]>("/order/dashboard/getPieCityData");
	},

	// 获取饼图2数据
	getPieAgeData() {
		return request.get<OrderType.PieData[]>("/order/dashboard/getPieCityData");
	},

	// 获取雷达图数据
	getRadarData() {
		return request.get<OrderType.RadarData>("/order/dashboard/getRadarData");
	},

	// 获取统计数据
	getReportData() {
		return request.get<OrderType.ReportData>("/order/dashboard/getReportData");
	},

	// 获取用户列表
	getUserList(params?: User.Params) {
		return request.get<ResultData<User.UserItem>>("/users/list", params);
	},

	// 获取全量用户列表
	getAllUserList(params?: User.Params) {
		return request.get<User.UserItem[]>("/users/all/list", params);
	},

	// 用户添加
	userCreate(params: User.CreateParams) {
		return request.post("/users/create", params);
	},
	// 用户编辑
	userEdit(params: User.CreateParams) {
		return request.post("/users/edit", params);
	},
	// 用户删除
	userDel(params: { userIds: number[] }) {
		return request.post("/users/delete", params);
	},
	// 获取用户权限列表
	getPermissionList() {
		return request.get<{ buttonList: string[]; menuList: MenuType.MenuItem[] }>(
			"/users/getPermissionList"
		);
	},

	/* 菜单管理 */

	// 菜单列表
	getMenuList(params: MenuType.Params = {}) {
		return request.get<MenuType.MenuItem[]>("/menu/list", params);
	},
	// 创建菜单
	createMenu(params: MenuType.CreateParams) {
		return request.post("/menu/create", params);
	},
	// 修改菜单
	editMenu(params: MenuType.EditParams) {
		return request.post("/menu/edit", params);
	},
	// 删除菜单
	delMenuById(params: MenuType.DelParams) {
		return request.post("/menu/delete", params);
	},

	/* 部门管理 */
	// 获取部门列表
	getDeptList(params?: Dept.Params) {
		return request.get<Dept.DeptItem[]>("/dept/list", params);
	},
	// 创建部门
	createDept(params: Dept.CreateParams) {
		return request.post("/dept/create", params);
	},
	// 修改部门
	editDept(params: Dept.EditParams) {
		return request.post("/dept/edit", params);
	},
	// 删除部门
	delDeptById(params: Dept.DelParams) {
		return request.post("/dept/delete", params);
	},

	/* 角色管理 */
	// 获取所有角色
	getRoleAllList() {
		return request.get<Role.RoleItem[]>("/roles/allList", {});
	},
	// 获取角色列表
	getRoleList(params: Role.Params) {
		return request.get<ResultData<Role.RoleItem>>("/roles/list", params);
	},
	// 创建角色
	createRole(params: Role.CreateParams) {
		return request.post("/roles/create", params);
	},
	// 修改角色
	editRole(params: Role.EditParams) {
		return request.post("/roles/edit", params);
	},
	// 删除角色
	delRoleById(params: { _id: string }) {
		return request.post("/roles/delete", params);
	},
	// 更新权限
	updatePermission(params: Role.CreatePermission) {
		return request.post("/roles/update/permission", params);
	},

	/* 订单管理 */
	// 获取订单列表
	getVehicleList() {
		return request.get<OrderType.DictItem[]>("/order/vehicleList");
	},
	getCityList() {
		return request.get<OrderType.DictItem[]>("/order/cityList");
	},
	getOrderList(params: OrderType.OrderSearchParams) {
		return request.get<OrderType.OrderData<OrderType.OrderItem>>(
			"/order/list",
			params
		);
	},
	// 创建订单
	createOrder(params: OrderType.OrderItem) {
		return request.post("/order/create", params);
	},
	// 更新订单轨迹
	updateOrderInfo(params: OrderType.OrderRoute) {
		return request.post("/order/edit", params);
	},
	// 查询订单详情
	getOrderDetail(orderId: string) {
		return request.get<OrderType.OrderItem>(`/order/detail/${orderId}`);
	},
	// 删除订单
	deleteOrder(params: { _id: string }) {
		return request.post("/order/delete", params);
	},
	// 查询订单聚合
	getOrderCluster(cityId: number) {
		return request.get<Array<{ lng: string; lat: string }>>(
			`/order/cluster/${cityId}`
		);
	},
	// 查询司机列表
	getDriverList(params: { driverName: string; accountStatus: number }) {
		return request.get<OrderType.OrderData<OrderType.DriverItem>>(
			`/order/driver/list`,
			params
		);
	},
	// 文件流导出
	// orderExport(data: OrderType.OrderSearchParams) {
	//   request.downloadFile('/order/orderExport', data)
	// }
};
