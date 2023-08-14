// 此文件主要用于控制何时展示loading样式
// 关键点在于当有多个接口请求时只需要加载一次loading样式
// 当所有接口加载完毕的时候，再关闭loading样式

import "./loading.less";

// 判断接口的请求次数
let count = 0;

export const showLoading = () => {
	if (count === 0) {
		const loading = document.getElementById("loading");
		loading?.style.setProperty("display", "flex");
	}
	count++;
};

export const hideLoading = () => {
	count--;
	if (count === 0) {
		const loading = document.getElementById("loading");
		loading?.style.setProperty("display", "none");
	}
};
