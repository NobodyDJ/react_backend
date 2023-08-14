import { useEffect } from "react";
import request from "@/utils/request";
import { Button } from "antd";
import storage from '@/utils/storage'
export default function Welcome() {
	useEffect(() => {
		request.post("/users/login", {}).then((res) => console.log(res)).catch((err)=>console.log(err));
	}, []);
	const handleClick = () => {
		request.get("/users/login", {}).then((res) => console.log(res)).catch((err)=>console.log(err));
	};
	const handleStorage = (type: number) => {
    if (type === 1) {
      storage.set('age', 30)
      storage.set('user', { name: 'jack', gender: '1' })
    }
    if (type === 2) {
      console.log(storage.get('age'))
      console.log(storage.get('user'))
    }
    if (type === 3) {
      console.log(storage.remove('age'))
    }
    if (type === 4) {
      storage.clear()
    }
  }
	return (
		<div className="welcome">
			<p>Welcome</p>
			<p>
        <Button onClick={handleClick}>点击事件</Button>
        <Button onClick={() => handleStorage(1)}>写入值</Button>
        <Button onClick={() => handleStorage(2)}>读取值</Button>
        <Button onClick={() => handleStorage(3)}>删除值</Button>
        <Button onClick={() => handleStorage(4)}>清空所有</Button>
      </p>
		</div>
	);
}
