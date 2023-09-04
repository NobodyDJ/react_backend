import React, { HtmlHTMLAttributes, useEffect } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
	} = theme.useToken();
	useEffect(() => {
		// 实现一个水印无法被删除的效果，关键是一个MutationObserver对象是一个监听DOM变化的元素
		const targetNode = document.getElementById('content') as HTMLDivElement
		const observer = new MutationObserver(function (mutationList, observer) {
			// 监听到DOM元素发生变化后，首先断开监听，防止出现死循环
			observer.disconnect()
			for (let mutation of mutationList) {
				if (mutation.type === 'childList') {
					const span = document.createElement('span');
					span.innerText = 'Hello React'
					targetNode.appendChild(span);
					// 重新监听
					observer.observe(targetNode, config)
				}
			}
		})
		const config = {
			childList: true, // 观察目标子节点的变化，是否有添加或者删除
			attributes: true, // 观察属性变动
			subtree: true, // 观察后代节点，默认为 false
		}
		console.log('targetNode', targetNode)
		observer.observe(targetNode, config)
	}, [])

	return (
		<Watermark content="terrence">
			<Layout>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<div className="demo-logo-vertical" />
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['4']}
						items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
							(icon, index) => ({
								key: String(index + 1),
								icon: React.createElement(icon),
								label: `nav ${index + 1}`,
							}),
						)}
					/>
				</Sider>
				<Layout>
					<NavHeader />
					<Content style={{ margin: '24px 16px 0' }}>
						<div id="content" style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
							<span>content</span>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		</Watermark>
  );
};

export default App;
