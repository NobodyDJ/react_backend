// 首先要约束两种，一种是对话框行为的约束主要又三种创建，编辑，删除
// 其次要约束调用组件的参数
import { MutableRefObject } from "react";
import { User } from "./api";
export type IAction = "create" | "edit" | "delete";

export interface IModalProp {
	mRef: MutableRefObject<
		| {
				open: (type: IAction, data?: User.UserItem) => void;
		  }
		| undefined
	>;
	update: Function;
}
