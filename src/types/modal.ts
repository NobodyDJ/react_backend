// 首先要约束两种，一种是对话框行为的约束主要又三种创建，编辑，删除
// 其次要约束调用组件的参数
// 这块很重要，对传入的接口操作类型进行限制
import { MutableRefObject } from "react";
import { User } from "./api";
export type IAction = "create" | "edit" | "delete";

export interface IModalProp<T = User.UserItem> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>
  update: () => void
}

export interface IDetailProp {
  mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>
}

