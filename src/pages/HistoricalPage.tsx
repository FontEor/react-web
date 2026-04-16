import ReactECharts from 'echarts-for-react';
import { historicalData } from '../data/populationData';
import { useEffect, useState } from 'react';

export default function HistoricalPage() {
  const [displayData, setDisplayData] = useState({
    years: [1949],
    births: [historicalData[0].birth],
    deaths: [historicalData[0].death],
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < historicalData.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setDisplayData({
          years: historicalData.slice(0, newIndex + 1).map(d => d.year),
          births: historicalData.slice(0, newIndex + 1).map(d => d.birth),
          deaths: historicalData.slice(0, newIndex + 1).map(d => d.death),
        });
      }
    }, 80);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const option = {
    title: {
      text: '中国历年出生与死亡人口对比 (1949-2024)',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const year = params[0].axisValue;
        const birth = params[0].value;
        const death = params[1]?.value || 0;
        return `年份: ${year}<br/>出生人口: ${birth}万人<br/>死亡人口: ${death}万人`;
      },
    },
    legend: {
      data: ['出生人口', '死亡人口'],
      top: 40,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: displayData.years,
      axisLabel: {
        interval: 10,
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: '人口（万人）',
      min: 0,
      max: 3500,
    },
    series: [
      {
        name: '出生人口',
        type: 'line',
        data: displayData.births,
        smooth: true,
        itemStyle: {
          color: '#5470c6',
        },
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: 'rgba(84, 112, 198, 0.3)',
        },
      },
      {
        name: '死亡人口',
        type: 'line',
        data: displayData.deaths,
        smooth: true,
        itemStyle: {
          color: '#ee6666',
        },
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: 'rgba(238, 102, 102, 0.3)',
        },
      },
    ],
    animation: true,
    animationDuration: 100,
    animationEasing: 'linear',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          中国历年出生与死亡人口对比 (1949-2024)
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <ReactECharts
            option={option}
            style={{ height: '500px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
        <div className="mt-4 text-center text-gray-600">
          <p className="text-sm md:text-base">
            数据来源：国家统计局。图表动态展示历史人口变化趋势。
          </p>
          <p className="text-sm mt-2">
            当前显示年份: {displayData.years[displayData.years.length - 1]}
          </p>
        </div>
      </div>
    </div>
  );
}