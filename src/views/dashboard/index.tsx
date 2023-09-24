import { Descriptions, Card, Button } from "antd";
import styles from "./index.module.less";
import { useStore } from "@/store";
import * as echarts from 'echarts';
import { useEffect } from "react";
import api from "@/api";
import { Dashboard } from "@/types/api";
import { formatState, formatNum, formatMoney } from '@/utils'
import { useState } from 'react'
import { useCharts } from '@/hook/useCharts'
export default function DashBoard() {
	const userInfo = useStore(state=>state.userInfo);
	const [report, setReport] = useState<Dashboard.ReportData>()
	const [lineChart, lineChartInstance] = useCharts()
	const [pieChartCity, pieChartCityInstance] = useCharts()
	const [pieChartAge, pieChartAgeInstance] = useCharts()
	const [radarChart, radarChartInstance] = useCharts()
	useEffect(() => {
    renderLineChart()
    renderPieChartCity()
    renderPieChartAge()
    renderRadarChart()
	}, [lineChartInstance, pieChartCityInstance, pieChartAgeInstance, radarChartInstance])

	  // 加载折线图数据
		const renderLineChart = async () => {
			if (!lineChartInstance) return
			const data = await api.getLineData()
			lineChartInstance?.setOption({
				// title: {
				//   text: '订单和流水走势图'
				// },
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['订单', '流水']
				},
				grid: {
					left: 50,
					right: 50,
					bottom: 20
				},
				xAxis: {
					data: data.label
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '订单',
						type: 'line',
						data: data.order
					},
					{
						name: '流水',
						type: 'line',
						data: data.money
					}
				]
			})
		}

		// 加载饼图1
		const renderPieChartCity = async () => {
			if (!pieChartCityInstance) return
			const data = await api.getPieCityData()
			pieChartCityInstance?.setOption({
				title: {
					text: '司机城市分布',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				series: [
					{
						name: '城市分布',
						type: 'pie',
						radius: '50%',
						data
					}
				]
			})
		}

		// 加载饼图2
		const renderPieChartAge = async () => {
			if (!pieChartAgeInstance) return
			const data = await api.getPieAgeData()
			pieChartAgeInstance?.setOption({
				title: {
					text: '司机年龄分布',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left'
				},
				series: [
					{
						name: '年龄分布',
						type: 'pie',
						radius: [50, 180],
						roseType: 'area',
						data
					}
				]
			})
		}

		// 加载雷达图
		const renderRadarChart = async () => {
			if (!radarChartInstance) return
			const data = await api.getRadarData()
			radarChartInstance?.setOption({
				// title: {
				//   text: '司机模型诊断',
				//   left: 'center'
				// },
				legend: {
					data: ['司机模型诊断']
				},
				radar: {
					indicator: data.indicator
				},
				series: [
					{
						name: '模型诊断',
						type: 'radar',
						data: data.data
					}
				]
			})
		}

	useEffect(() => {
		getReportData()
	}, [])
	const getReportData = async () => {
		const data = await api.getReportData()
		setReport(data)
	}
	return (
		<div className={styles.dashboard}>
			<div className={styles.userInfo}>
				<img
					src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
					alt=""
					className={styles.userImg}
				/>
				<Descriptions title={`欢迎${userInfo.userName}同学，每天都要开心！`}>
					<Descriptions.Item label='用户ID'>{userInfo.userId}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
				</Descriptions>
			</div>
			<div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>
      <div className={styles.chart}>
		<Card title='订单和流水走势图' extra={<Button type='primary' onClick={ ()=> renderLineChart()}>刷新</Button>}>
			<div ref={ lineChart } className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
				<Card title='司机分布' extra={<Button type='primary' onClick={() => { renderPieChartCity(); renderPieChartAge() }}>刷新</Button>}>
          <div className={styles.pieChart}>
				<div ref={pieChartCity} className={styles.itemPie}></div>
				<div ref={pieChartAge} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary' onClick={()=>renderRadarChart()}>刷新</Button>}>
			<div ref={radarChart} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
	);
}
