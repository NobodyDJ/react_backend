import * as echarts from 'echarts';
import { useState, createRef, useEffect } from 'react';

export const useCharts = ():[React.LegacyRef<HTMLDivElement> , echarts.ECharts | undefined] => {
	const chartRef = createRef<HTMLDivElement>();
	const [chartInstance, setChartInstance] = useState<echarts.ECharts>()
	useEffect(() => {
		const chart = echarts.init(chartRef.current as HTMLElement);
		setChartInstance(chart);
	}, [])
	return [chartRef, chartInstance];
}
