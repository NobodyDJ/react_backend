import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import {
	DesktopOutlined,
} from "@ant-design/icons";
import { useLocation,useNavigate, useRouteLoaderData } from "react-router-dom";
import { useStore } from "@/store";
import { MenuType as IMenu } from '@/types/api'
import type { MenuProps, MenuTheme } from 'antd/es/menu'
import * as Icons from '@ant-design/icons'
const SideMenu = () => {
	const navigate = useNavigate();
	const { collapsed } = useStore();
	const data: any = useRouteLoaderData('layout')
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const [ menuList, setMenuList ]= useState<MenuItem[]>([])
	type MenuItem = Required<MenuProps>['items'][number]
	const { pathname } = useLocation()
	function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
		children?: MenuItem[],
		type?: 'group',
  ): MenuItem {
    return {
      label,
      key,
      icon,
			children,
			type
    } as MenuItem
  }
  function createIcon(name?: string) {
    if (!name) return <></>
    const customerIcons: { [key: string]: any } = Icons
    const icon = customerIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }
  // 递归生成菜单
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
			if (item.menuType === 1 && item.children) {
        if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        treeList.push(
          getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
        )
			} else {
				treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
			}
    })
    return treeList
  }
  // 初始化，获取接口菜单列表数据
	useEffect(() => {
		const treeMenuList = getTreeMenu(data.menuList)
		setMenuList(treeMenuList)
		setSelectedKeys([pathname])
  }, [])

	const style1 = {
		opacity: 0,
	};
	const style2 = {
		opacity: 1,
	};
	const handleClickLogo = () => {
		navigate("/welcome");
	};
	const handleMenuItemClick = ({ key }: { key: string }) => {
		console.log(key)
		setSelectedKeys([key])
		navigate(key);
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
				mode="inline"
				theme="dark"
				items={menuList}
				style={{
					width: collapsed ? "80px" : "auto",
				}}
				selectedKeys={selectedKeys}
				onClick={handleMenuItemClick}
			/>
		</div>
	);
};

export default SideMenu;
