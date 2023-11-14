/**
 * 工具封装函数
 */

import { MenuType } from "@/types/api";

// 格式化金额
export const formatMoney = (num?: number | string) => {
	if(!num) return 0.00
	const a = parseFloat(num.toString());
	return a.toLocaleString("zh-CN", { style: "currency", currency: "CNY" });
};

// 格式化数字
export const formatNum = (num?: number | string) => {
	if(!num) return 0
	const a = num.toString();
	if (a.indexOf(".") > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	return a.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
	let curDate = new Date();
	if (date) curDate = date;
	// String.replaceAll()方法太新了
	if (rule === "yyyy-MM-dd")
		return curDate.toLocaleDateString().split("/").join("-");
	if (rule === "HH:mm:sss")
		return curDate.toLocaleTimeString().split("/").join("-");
	return curDate.toLocaleString().split("/").join("-");
};

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
	let curDate = new Date()
  if (date instanceof Date) curDate = date
  else if (date) curDate = new Date(date)

	let fmt = rule || "yyyy-MM-dd HH:mm:ss";
	fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString());
	type OType = {
		[key: string]: number;
	};
	const O: OType = {
		"M+": curDate.getMonth() + 1,
		"d+": curDate.getDate(),
		"H+": curDate.getHours(),
		"m+": curDate.getMinutes(),
		"s+": curDate.getSeconds(),
	};
	for (const k in O) {
		const val = O[k].toString();
		fmt = fmt.replace(
			new RegExp(`(${k})`),
			O[k] > 9 ? O[k].toString() : "0" + O[k].toString()
		);
		// fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
	}
	return fmt;
};

// 用户状态转换
export const formatState = (state?: number) => {
  if (state === 1) return '在职'
  if (state === 2) return '试用期'
  if (state === 3) return '离职'
}

// 筛选出当前所有的页面路径
export const getMenuPath = (list: MenuType.MenuItem[]):string[] => {
	return list.reduce((result: string[], item:MenuType.MenuItem) => {
		return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '')
	},[])
}
// 递归获取所有路由对象
export const searchRoute:any = (path: string, routes: any = []) => {
	for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      return searchRoute(path, item.children)
    }
  }
  return ''
}

/**
 * 手机号加密
 * @example
 * 17611000011 => 176****0011
 */
export const formatMobile = (mobile?: number) => {
  if (!mobile) return '-'
  const phone = mobile.toString()
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}
