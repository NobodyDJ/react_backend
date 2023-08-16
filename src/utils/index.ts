/**
 * 工具封装函数
 */

// 格式化金额
export const formatMoney = (num: number | string) => {
	const a = parseFloat(num.toString());
	return a.toLocaleString("zh-CN", { style: "currency", currency: "CNY" });
};

// 格式化数字
export const formatNum = (num: number | string) => {
	const a = num.toString();
	if (a.indexOf(".") > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	return a.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};
