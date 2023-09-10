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
			key: "1",
			icon: <DesktopOutlined />,
		},
		{
			label: "系统管理",
			key: "2",
			icon: <SettingOutlined />,
			children: [
				{
					label: "用户管理",
					key: "3",
					icon: <TeamOutlined />,
				},
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
	return (
		<div>
			<div className={styles.logo} onClick={handleClickLogo}>
				<img src="/imgs/logo.png" className={styles.img} />
				<div className={styles.title} style={collapsed ? style1 : style2}>
					{collapsed ? "" : <span>慕慕货运</span>}
				</div>
			</div>
			<Menu
				defaultSelectedKeys={["1"]}
				mode="inline"
				theme="dark"
				items={items}
				style={{
					width: collapsed ? "80px" : "auto",
				}}
			/>
		</div>
	);
};

export default SideMenu;
