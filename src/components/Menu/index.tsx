import { Menu } from "antd";
import {
	DesktopOutlined,
	SettingOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store";
const SideMenu = () => {
	const navigate = useNavigate();
	const { collapsed } = useStore();
	const items = [
		{
			label: "工作台",
			key: "/welcome",
			icon: <DesktopOutlined rev={undefined} />,
		},
		{
			label: "系统管理",
			key: "2",
			icon: <SettingOutlined rev={undefined} />,
			children: [
				{
					label: "用户管理",
					key: "/userList",
					icon: <TeamOutlined rev={undefined} />,
				},
				{
					label: '部门管理',
					key: '/deptList',
					icon: <TeamOutlined rev={undefined} />
				},
				{
					label: '菜单管理',
					key: '/menuList',
					icon: <TeamOutlined rev={undefined} />
				}
			],
		},
	];
	const style1 = {
		opacity: 0,
	};
	const style2 = {
		opacity: 1,
	};
	const handleClickLogo = () => {
		navigate("/welcome");
	};
	const handleMenuItemClick = (e: any) => {
		console.log("123", e);
		navigate(e.key);
	};
	return (
		<div>
			<div className={styles.logo} onClick={handleClickLogo}>
				<img src="/imgs/logo.png" className={styles.img} />
				<div className={styles.title} style={collapsed ? style1 : style2}>
					{collapsed ? "" : <span>慕慕货运</span>}
				</div>
			</div>
			<Menu
				defaultSelectedKeys={["/welcome"]}
				mode="inline"
				theme="dark"
				items={items}
				style={{
					width: collapsed ? "80px" : "auto",
				}}
				onClick={(e) => handleMenuItemClick(e)}
			/>
		</div>
	);
};

export default SideMenu;
