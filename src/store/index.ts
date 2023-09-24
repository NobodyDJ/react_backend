// 全局状态管理工具
import { User } from "@/types/api";
import resso from "resso";
import { create } from "zustand";

export const store = resso({
	token: "",
	userInfo: {
		userEmail: "",
		userName: "",
	},
	updateUserInfo(userInfo: User.UserItem) {
		store.userInfo = userInfo;
	},
});

export const useStore = create<{
	token: string;
	userInfo: User.UserItem
	collapsed: boolean;
	updateToken: (token: string) => void;
	updateUserInfo: (userInfo: User.UserItem) => void;
	updateCollapsed: () => void;
}>((set) => ({
	token: "",
	userInfo: {
		_id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: [],
    state: 0,
    mobile: 0,
    job: '',
    role: 0,
    roleList: [],
    createId: 0,
    deptName: '',
    userImg: ''
	},
	collapsed: false,
	updateToken: (token: string) => set({ token }),
	updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
	updateCollapsed: () =>
		set((state) => {
			return {
				collapsed: !state.collapsed,
			};
		}),
}));
