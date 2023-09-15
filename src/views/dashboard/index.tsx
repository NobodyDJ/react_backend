import { Descriptions } from "antd";
import styles from "./index.module.less";
import { useStore } from "@/store";
export default function DashBoard() {
	const { userInfo } = useStore();
	return (
		<div className={styles.dashboard}>
			<div className={styles.userInfo}>
				<img
					src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
					alt=""
					className={styles.userImg}
				/>
				<Descriptions title={`欢迎${userInfo.userName}同学，每天都要开心！`}>
					<Descriptions.Item label="用户ID">100001</Descriptions.Item>
					<Descriptions.Item label="邮箱">
						{userInfo.userEmail}
					</Descriptions.Item>
					<Descriptions.Item label="状态">在职</Descriptions.Item>
					<Descriptions.Item label="手机号">17600001111</Descriptions.Item>
					<Descriptions.Item label="岗位">前端工程师</Descriptions.Item>
					<Descriptions.Item label="部门">大前端</Descriptions.Item>
				</Descriptions>
			</div>
			<div className={styles.report}>
				<div className={styles.card}>
					<div className="title">司机数量</div>
					<div className={styles.data}>100个</div>
				</div>
				<div className={styles.card}>
					<div className="title">总流水</div>
					<div className={styles.data}>10000元</div>
				</div>
				<div className={styles.card}>
					<div className="title">总订单</div>
					<div className={styles.data}>2000单</div>
				</div>
				<div className={styles.card}>
					<div className="title">开通城市</div>
					<div className={styles.data}>50座</div>
				</div>
			</div>
		</div>
	);
}
