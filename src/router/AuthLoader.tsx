import api from '@/api'
import { getMenuPath } from '@/utils/index'
import { MenuType } from '@/types/api'

export interface IAuthLoader {
  buttonList: string[]
  menuList: MenuType.MenuItem[]
  menuPathList: string[]
}

export default async function AuthLoader() {
	const data = await api.getPermissionList();
	console.log('data', data);
	const menuList = getMenuPath(data.menuList)
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList: menuList
  }
}
