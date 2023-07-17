import { useState, useEffect } from "react";
export function useWindowSize() {
	const [size, setSize] = useState({
		// 整个屏幕的宽高
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	});
	const handleResize = () => {
		setSize({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		});
	};
	useEffect(() => {
		// 注意凡是监听全局全局变量的改变的一定要卸载
		// 防止内存泄漏
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return [size];
}
