import React, { useEffect } from "react";
import { Layout, theme, Watermark } from "antd";
import { Outlet } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import Menu from "@/components/Menu";
import styles from "./index.module.less";
import api from "@/api";
import { useStore } from "@/store";
import { router } from "@/router/index"
import { IAuthLoader } from "@/router/AuthLoader"
import { useLocation, useRouteLoaderData,Navigate } from "react-router-dom";
import { searchRoute } from "@/utils/index"
const { Content, Sider } = Layout;

const App: React.FC = () => {
	// const {
	//   token: { colorBgContainer },
	// } = theme.useToken();
	// useEffect(() => {
	// 	// 实现一个水印无法被删除的效果，关键是一个MutationObserver对象是一个监听DOM变化的元素
	// 	const targetNode = document.getElementById('content') as HTMLDivElement
	// 	const observer = new MutationObserver(function (mutationList, observer) {
	// 		// 监听到DOM元素发生变化后，首先断开监听，防止出现死循环
	// 		observer.disconnect()
	// 		for (let mutation of mutationList) {
	// 			if (mutation.type === 'childList') {
	// 				const span = document.createElement('span');
	// 				span.innerText = 'Hello React'
	// 				targetNode.appendChild(span);
	// 				// 重新监听
	// 				observer.observe(targetNode, config)
	// 			}
	// 		}
	// 	})
	// 	const config = {
	// 		childList: true, // 观察目标子节点的变化，是否有添加或者删除
	// 		attributes: true, // 观察属性变动
	// 		subtree: true, // 观察后代节点，默认为 false
	// 	}
	// 	console.log('targetNode', targetNode)
	// 	observer.observe(targetNode, config)
	// }, [])
	const { collapsed, updateUserInfo } = useStore();
	const { pathname } = useLocation()
	const getUserInfo = async () => {
		const data = await api.getUserInfo();
		updateUserInfo(data);
	};
	useEffect(() => {
		getUserInfo();
	}, []);
	// 路由重新加载，就会执行，重新获取路由数据
	console.log(router);
	const route: any = searchRoute(pathname, router)
	console.log(route)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    // 权限判断
    const data = useRouteLoaderData('layout') as IAuthLoader
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }
	return (
		<Watermark content="terrence">
			<Layout>
				<Sider collapsed={collapsed}>
					<Menu />
				</Sider>
				<Layout>
					<NavHeader />
					<div className={styles.wrapper}>
						{/* 路由对应的页面，相当于vue.js中的router-view */}
						<Outlet></Outlet>
					</div>
					<NavFooter />
				</Layout>
			</Layout>
		</Watermark>
	);
};

export default App;
